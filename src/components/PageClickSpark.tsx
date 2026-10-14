'use client';

import { useEffect, useRef } from 'react';
import ClickSpark, { type ClickSparkHandle } from './ClickSpark';

/**
 * Full-page ClickSpark for Astro islands.
 * The overlay is non-interactive; sparks are triggered from document clicks
 * via the imperative API so UI underneath stays clickable.
 */
const PageClickSpark = () => {
  const sparkRef = useRef<ClickSparkHandle>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastPress = { time: -1e9, x: 0, y: 0 };

    const sparkAt = (clientX: number, clientY: number) => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      sparkRef.current?.spark(clientX - rect.left, clientY - rect.top);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      lastPress = { time: performance.now(), x: event.clientX, y: event.clientY };
      sparkAt(event.clientX, event.clientY);
    };

    const handleClick = (event: MouseEvent) => {
      if ('pointerType' in event && (event as PointerEvent).pointerType === 'mouse') return;

      if (event.detail === 0) {
        const target = event.target instanceof Element ? event.target : document.body;
        const rect = target.getBoundingClientRect();
        sparkAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
        return;
      }

      const recent =
        performance.now() - lastPress.time < 700 &&
        Math.hypot(event.clientX - lastPress.x, event.clientY - lastPress.y) < 12;
      if (!recent) sparkAt(event.clientX, event.clientY);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      <ClickSpark
        ref={sparkRef}
        sparkColor={['#c26d82', '#e198aa']}
        sparkSize={12}
        sparkRadius={28}
        sparkCount={10}
        sparkWidth={2}
        duration={450}
        easing="ease-out"
        shape="line"
        glow={0.35}
        ring
        className="pointer-events-none h-full w-full"
      />
    </div>
  );
};

export default PageClickSpark;
