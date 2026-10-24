'use client';

import { Children, Fragment, isValidElement, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export interface ScrollStackItemProps {
  children?: ReactNode;
  itemClassName?: string;
  style?: CSSProperties;
}

export interface ScrollStackProps {
  children?: ReactNode;
  className?: string;
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: number | string;
  itemScale?: number;
  baseScale?: number;
  dimAmount?: number;
  blurAmount?: number;
  tiltAmount?: number;
  rotationAmount?: number;
  holdDistance?: number;
  /** Max cards kept visible in the stack; older ones fade out as newer ones enter. */
  maxVisible?: number;
  smoothScroll?: boolean;
  snap?: boolean;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

interface StackSettings {
  itemDistance: number;
  itemStackDistance: number;
  stackPosition: number | string;
  itemScale: number;
  baseScale: number;
  dimAmount: number;
  blurAmount: number;
  tiltAmount: number;
  rotationAmount: number;
  holdDistance: number;
  maxVisible: number;
  smoothScroll: boolean;
  snap: boolean;
  onStackComplete?: () => void;
}

const resolveOffset = (value: number | string, size: number) => {
  if (typeof value === 'number') return value;
  const text = String(value).trim();
  if (text.endsWith('%')) return (parseFloat(text) / 100) * size;
  return parseFloat(text) || 0;
};

const toLength = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

const scrollsInside = (node: Element | null, stop: Element, delta: number) => {
  for (let element: Element | null = node; element && element !== stop; element = element.parentElement) {
    if (element.scrollHeight <= element.clientHeight + 1) continue;
    const overflow = getComputedStyle(element).overflowY;
    if (overflow !== 'auto' && overflow !== 'scroll') continue;
    if (delta > 0 ? element.scrollTop + element.clientHeight < element.scrollHeight - 1 : element.scrollTop > 0) {
      return true;
    }
  }
  return false;
};

const CARD_SHADOW = [
  "0 0 0 1px rgb(77 49 20 / 0.06)",
  "0 16px 40px -20px rgb(77 49 20 / 0.28)",
].join(", ");

export const ScrollStackItem = ({
  children,
  itemClassName = "",
  style,
}: ScrollStackItemProps) => (
  <div
    className={`relative box-border flex w-full origin-top flex-col overflow-hidden will-change-transform ${itemClassName}`.trim()}
    style={{ boxShadow: CARD_SHADOW, ...style }}
  >
    {children}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] bg-theme-black opacity-[var(--scroll-stack-dim,0)]"
    />
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemStackDistance = 24,
  stackPosition = '15%',
  itemScale = 0.05,
  baseScale = 0.8,
  dimAmount = 0.2,
  blurAmount = 0,
  tiltAmount = 0,
  rotationAmount = 0,
  holdDistance = 200,
  maxVisible = 3,
  smoothScroll = true,
  snap = false,
  useWindowScroll = false,
  onStackComplete
}: ScrollStackProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<StackSettings | null>(null);
  const scheduleRef = useRef<(() => void) | null>(null);
  const items = Children.toArray(children);

  useLayoutEffect(() => {
    settingsRef.current = {
      itemDistance,
      itemStackDistance,
      stackPosition,
      itemScale,
      baseScale,
      dimAmount,
      blurAmount,
      tiltAmount,
      rotationAmount,
      holdDistance,
      maxVisible: Math.max(1, Math.floor(maxVisible)),
      smoothScroll,
      snap,
      onStackComplete
    };
    scheduleRef.current?.();
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    const end = endRef.current;
    if (!root || !inner || !end) return undefined;

    const windowed = useWindowScroll;
    const target = windowed ? window : root;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cache = new Map<string, string | number>();
    let frame = 0;
    let glide = 0;
    let rest = 0;
    let complete = false;
    let gliding = false;
    let pressed = false;
    let current = 0;
    let goal = 0;
    let written = 0;
    let last = 0;
    let points: number[] = [];
    let reach = 0;

    const readScroll = () => (windowed ? window.scrollY : root.scrollTop);
    const maxScroll = () =>
      windowed ? document.documentElement.scrollHeight - window.innerHeight : root.scrollHeight - root.clientHeight;
    const writeScroll = (value: number) => {
      written = value;
      target.scrollTo({ top: value, behavior: 'instant' });
    };

    const write = <T extends string | number>(key: string, value: T, apply: (value: T) => void) => {
      if (cache.get(key) === value) return false;
      cache.set(key, value);
      apply(value);
      return true;
    };

    const readSlots = () =>
      (Array.from(inner.children) as HTMLElement[]).filter(child => child.hasAttribute('data-stack-slot'));

    // Match every card to the tallest natural height (runs on resize, not every scroll frame).
    let equalizing = false;
    const equalizeHeights = () => {
      if (equalizing) return;
      const slots = readSlots();
      if (!slots.length) return;
      equalizing = true;
      const cards = slots.map(slot => slot.firstElementChild as HTMLElement | null);
      cards.forEach(card => {
        if (card) card.style.height = '';
      });
      const equalHeight = Math.max(0, ...cards.map(card => card?.offsetHeight ?? 0));
      cards.forEach(card => {
        if (!card) return;
        card.style.height = equalHeight > 0 ? `${equalHeight}px` : '';
      });
      cache.set('equalHeight', equalHeight);
      equalizing = false;
    };

    const update = () => {
      frame = 0;
      const settings = settingsRef.current;
      const slots = readSlots();
      if (!settings || !slots.length) return;

      const viewHeight = windowed ? window.innerHeight : root.clientHeight;
      const viewTop = windowed ? 0 : root.getBoundingClientRect().top + root.clientTop;
      const stackTop = resolveOffset(settings.stackPosition, viewHeight);
      const offset = settings.itemStackDistance;
      const heights = slots.map(slot => slot.offsetHeight);
      const tops = slots.map(slot => slot.getBoundingClientRect().top);
      const lastPin = stackTop + (slots.length - 1) * offset;
      const padTop = windowed ? 0 : stackTop;
      const endHeight =
        settings.holdDistance + (windowed ? 0 : Math.max(0, viewHeight - lastPin - heights[heights.length - 1]));

      let moved = write('padTop', padTop, value => {
        inner.style.paddingTop = `${value}px`;
      });
      moved =
        write('endHeight', endHeight, value => {
          end.style.height = `${value}px`;
        }) || moved;

      let flow = inner.getBoundingClientRect().top - viewTop + readScroll() + padTop;
      points = heights.map((height, i) => {
        const point = flow - stackTop - i * offset;
        flow += height + settings.itemDistance;
        return point;
      });
      reach = Math.max(40, (heights[0] + settings.itemDistance - offset) / 2);

      const visibleLimit = settings.maxVisible;
      const covers = slots.map(() => 0);
      let lastCover = 0;
      for (let j = 1; j < slots.length; j++) {
        // Measure cover against the collapsed stack pin (at most visibleLimit slots deep).
        const pinSlots = Math.min(j, visibleLimit);
        const pinBefore = viewTop + stackTop + (pinSlots - 1) * offset;
        const start = pinBefore + heights[Math.min(j - 1, heights.length - 1)];
        const span = Math.max(1, start - pinBefore - offset);
        const cover = Math.min(1, Math.max(0, (start - tops[j]) / span));
        covers[j] = cover;
        lastCover = cover;
      }

      // Fade card i out as card (i + visibleLimit) enters the stack.
      const fades = slots.map((_, i) => {
        const exitAt = i + visibleLimit;
        return exitAt < slots.length ? covers[exitAt] : 0;
      });

      const fadedBefore = slots.map((_, i) => {
        let sum = 0;
        for (let j = 0; j < i; j++) sum += fades[j];
        return sum;
      });

      const dimStep = Math.min(Math.max(settings.dimAmount, 0), 1);
      slots.forEach((slot, i) => {
        const card = slot.firstElementChild as HTMLElement | null;
        if (!card) return;

        const opacity = 1 - fades[i];
        const visualIndex = Math.max(0, i - fadedBefore[i]);
        // Depth only counts covers from cards still in the visible window.
        let depth = 0;
        for (let j = i + 1; j < slots.length; j++) {
          depth += covers[j] * (1 - fades[j]);
        }
        depth = Math.min(depth, visibleLimit - 1);

        const lean = Math.min(depth, 1);
        const scale = Math.max(Math.min(settings.baseScale, 1), 1 - depth * settings.itemScale);
        const tilt = -lean * settings.tiltAmount;
        const turn = lean * settings.rotationAmount * (i % 2 ? -1 : 1);
        const blur = depth * settings.blurAmount;
        const dim = 1 - Math.pow(1 - dimStep, depth);
        const transform =
          depth < 0.0005
            ? ''
            : `perspective(1200px) rotateX(${tilt.toFixed(2)}deg) rotate(${turn.toFixed(2)}deg) scale(${scale.toFixed(4)})`;

        write(`top${i}`, (stackTop + visualIndex * offset).toFixed(2), value => {
          slot.style.top = `${value}px`;
        });
        // Opacity on the card (not the sticky slot) so sticky positioning stays reliable.
        write(`opacity${i}`, opacity.toFixed(3), value => {
          card.style.opacity = value;
          card.style.pointerEvents = Number(value) < 0.05 ? 'none' : '';
          slot.setAttribute('aria-hidden', Number(value) < 0.05 ? 'true' : 'false');
        });
        write(`transform${i}`, transform, value => {
          card.style.transform = value;
        });
        write(`filter${i}`, blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : '', value => {
          card.style.filter = value;
        });
        write(`dim${i}`, dim.toFixed(3), value => {
          card.style.setProperty('--scroll-stack-dim', value);
        });
      });

      const done = slots.length > 1 && lastCover >= 0.999;
      if (done !== complete) {
        complete = done;
        if (done) settings.onStackComplete?.();
      }

      if (moved) schedule();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (Math.abs(readScroll() - written) > 2) {
        gliding = false;
        glide = 0;
        settleSoon();
        return;
      }
      current += (goal - current) * (1 - Math.pow(0.9, dt * 60));
      if (Math.abs(goal - current) < 0.5) current = goal;
      writeScroll(current);
      if (current === goal) {
        gliding = false;
        glide = 0;
        settleSoon();
        return;
      }
      glide = requestAnimationFrame(step);
    };

    const glideTo = (value: number) => {
      goal = Math.min(Math.max(value, 0), maxScroll());
      if (motion.matches) {
        writeScroll(goal);
        return;
      }
      if (gliding) return;
      gliding = true;
      current = readScroll();
      written = current;
      last = performance.now();
      glide = requestAnimationFrame(step);
    };

    const settle = () => {
      rest = 0;
      if (!settingsRef.current?.snap || gliding || pressed || !points.length) return;
      const now = readScroll();
      const nearest = points.reduce((best, point) => (Math.abs(point - now) < Math.abs(best - now) ? point : best));
      const gap = Math.abs(nearest - now);
      if (gap > 1 && gap < reach) glideTo(nearest);
    };

    const settleSoon = () => {
      window.clearTimeout(rest);
      rest = window.setTimeout(settle, 140);
    };

    const onScroll = () => {
      schedule();
      if (!gliding) settleSoon();
    };

    const onWheel = (input: Event) => {
      const event = input as WheelEvent;
      if (!settingsRef.current?.smoothScroll || motion.matches || event.defaultPrevented || event.ctrlKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const page = windowed ? window.innerHeight : root.clientHeight;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? page : 1);
      if (!delta || scrollsInside(event.target as Element | null, windowed ? document.body : root, delta)) return;
      const base = gliding ? goal : readScroll();
      if ((delta < 0 && base <= 0) || (delta > 0 && base >= maxScroll() - 0.5)) return;
      event.preventDefault();
      window.clearTimeout(rest);
      glideTo(base + delta);
    };

    const onPress = () => {
      pressed = true;
      window.clearTimeout(rest);
    };

    const onRelease = () => {
      if (!pressed) return;
      pressed = false;
      settleSoon();
    };

    const onResize = () => {
      if (equalizing) return;
      equalizeHeights();
      schedule();
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(root);
    observer.observe(inner);
    readSlots().forEach(slot => {
      const card = slot.firstElementChild;
      if (!card) return;
      // Watch images so lazy-loaded media can grow the shared card height.
      card.querySelectorAll('img').forEach(img => {
        if (!img.complete) img.addEventListener('load', onResize, { once: true });
      });
    });
    target.addEventListener('scroll', onScroll, { passive: true });
    target.addEventListener('wheel', onWheel, { passive: false });
    target.addEventListener('pointerdown', onPress, { passive: true });
    window.addEventListener('pointerup', onRelease, { passive: true });
    window.addEventListener('pointercancel', onRelease, { passive: true });
    window.addEventListener('resize', onResize);
    scheduleRef.current = schedule;
    equalizeHeights();
    update();

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(glide);
      window.clearTimeout(rest);
      observer.disconnect();
      target.removeEventListener('scroll', onScroll);
      target.removeEventListener('wheel', onWheel);
      target.removeEventListener('pointerdown', onPress);
      window.removeEventListener('pointerup', onRelease);
      window.removeEventListener('pointercancel', onRelease);
      window.removeEventListener('resize', onResize);
      scheduleRef.current = null;
    };
  }, [useWindowScroll]);

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${useWindowScroll ? '' : 'h-full overflow-x-hidden overflow-y-auto'} ${className}`.trim()}
    >
      <div ref={innerRef} className="relative w-full">
        {items.map((child, index) => {
          const gap = itemDistance - (items.length - index) * itemStackDistance;
          return (
            <Fragment key={isValidElement(child) ? (child.key ?? index) : index}>
              {index > 0 && (
                <div aria-hidden="true" style={{ height: Math.max(0, gap), marginTop: Math.min(0, gap) }} />
              )}
              <div
                data-stack-slot=""
                className="sticky"
                style={{
                  top: `calc(${toLength(stackPosition)} + ${index * itemStackDistance}px)`,
                  marginBottom: (items.length - 1 - index) * itemStackDistance,
                  zIndex: index + 1
                }}
              >
                {child}
              </div>
            </Fragment>
          );
        })}
        <div ref={endRef} aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;
