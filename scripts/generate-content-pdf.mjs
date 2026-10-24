/**
 * Captures desktop/mobile screenshots of TUKURA pages/sections and
 * builds a PDF with the current website copy.
 *
 * Usage: node scripts/generate-content-pdf.mjs
 */
import { chromium } from "playwright";
import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "docs");
const SHOT_DIR = join(OUT_DIR, "content-pdf-shots");
const PDF_PATH = join(OUT_DIR, "tukura-contenidos-web.pdf");
const BASE = process.env.TUKURA_BASE_URL || "http://127.0.0.1:59187";

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

/** @typedef {{ id: string; page: string; title: string; selector?: string; url: string; texts: string[] }} Section */

/** @type {Section[]} */
const SECTIONS = [
  {
    id: "home-hero",
    page: "Inicio",
    title: "Hero",
    url: "/",
    selector: "main#main-content > section:first-of-type",
    texts: [
      "Tu cuerpo te está pidiendo una",
      "pausa",
      "Un espacio seguro para bajar el ritmo, escucharte y recibir cuidado. Sin prisa, habitando tu cuerpo.",
      "CTA: Reserva tu momento",
    ],
  },
  {
    id: "home-servicios",
    page: "Inicio",
    title: "Nuestros servicios",
    url: "/#servicios",
    selector: "#servicios",
    texts: [
      "Kicker: Nuestros servicios",
      "Título: Dedícate un momento",
      "Subtítulo: Cada masaje se adapta a ti y a cómo llegas hoy.",
      "",
      "Masaje personalizado — 45€ · 60 min",
      "Hay días en los que sabes exactamente dónde se acumula la tensión: los hombros tras horas frente al ordenador, la espalda tras la jornada, las piernas tras entrenar. Trabajo esa zona para liberar tensión acumulada, favorecer la movilidad y devolverte ligereza. Te vas con el cuerpo más suelto y con una sensación de alivio.",
      "",
      "Ritual corporal holístico — 55€ · 75 min",
      "Un recorrido de cuerpo completo, de los pies a la cabeza. Un espacio para bajar el ritmo y dejar atrás el ruido externo, mientras notas cómo tu cuerpo va soltando tensión, hasta terminar en una profunda sensación de calma, tranquilidad y paz. Muchas personas se van flotando.",
      "",
      "Masaje vertebral — 45€ · 60 min",
      "Un masaje específico que recorre el eje vertebral, del sacro a la zona occipital, con un trabajo manual más profundo. Busco liberar tensiones, favorecer la descompresión de la columna y mejorar la sensación de movilidad y amplitud. Para sentir la espalda liberada de tensión.",
      "",
      "Conexión craneofacial — 45€ · 60 min",
      "Para cuando cuesta soltar: hombros elevados, nuca cargada, mandíbula apretada. Recorro la parte alta de la espalda, cervicales, cabeza y rostro para que dejes de darle vueltas a todo y llegues a una relajación profunda. Una forma de irte a otro mundo un rato: la mente más quieta y el cuerpo en calma.",
      "",
      "Kobido facial — 45€ · 60 min",
      "Una técnica japonesa sobre piel seca, con movimientos rápidos, rítmicos y precisos, percusiones y drenaje, en rostro, cuello, escote y cabeza. Relaja toda la cara, también la mandíbula, una de las zonas donde más tensión guardamos. El rostro es de las partes más sensibles del cuerpo, y por eso se nota tanto. Deja una sensación de rostro más ligero, despierto y revitalizado.",
      "",
      "Masaje prenatal — 45€ · 60 min",
      "Durante el embarazo la espalda se carga y las piernas pesan más. Una sesión con posiciones cómodas y un trabajo suave y adaptado, con atención a las zonas de mayor sobrecarga, para darte un descanso absoluto.",
    ],
  },
  {
    id: "home-about",
    page: "Inicio",
    title: "Quién soy (preview)",
    url: "/#quien-soy",
    selector: "section#quien-soy",
    texts: [
      "Kicker: quién soy",
      "Patri Guillén",
      "Educadora Social y Quiromasajista. La persona que da vida a TUKURA y te acompañará en cada sesión. Durante los últimos años he acompañado a personas y familias en momentos vitales complejos. En ese camino nació mi curiosidad por comprender cómo todo lo que vivimos y sentimos también se expresa a través del cuerpo.",
      "“Tu cuerpo también cuenta tu historia.”",
      "CTA: Leer más → /quien-soy",
    ],
  },
  {
    id: "home-story",
    page: "Inicio",
    title: "Nuestra historia (preview)",
    url: "/#historia",
    selector: "section#historia",
    texts: [
      "Kicker: nuestra historia",
      "Acompañar sin imponer · Cuidar sin invadir · Sostener sin juzgar",
      "TUKURA nace del deseo de crear espacios y momentos más amables y seguros. Lugares donde no tengamos que llegar con todo resuelto, donde podamos parar y descansar.",
      "Como las tortugas, llevamos nuestro hogar con nosotros: el cuerpo. Un lugar donde se expresa nuestra historia, donde sentimos y vivimos.",
      "CTA: Leer más → /historia",
    ],
  },
  {
    id: "home-espacio",
    page: "Inicio",
    title: "El espacio",
    url: "/#espacio",
    selector: "#espacio",
    texts: [
      "Kicker: el espacio",
      "Título: Aquí se respira la calma",
      "Desde que entras, todo te invita a bajar el ritmo. Una luz suave, colores claros, pequeños detalles naturales, un aroma que te recibe y una música que acompaña sin imponerse.",
      "Cada elemento está pensado para crear una atmósfera acogedora, cuidar tus sentidos y ayudarte a dejar fuera, por un momento, el ruido y las prisas del día a día.",
      "Aquí no tienes que hacer nada. Solo llegar, respirar y dejarte cuidar. Muchas personas me cuentan que la tranquilidad se siente desde el primer momento y que, al terminar, se van con el cuerpo más ligero. Algunas, incluso, flotando.",
      "Y, sobre todo, quiero que te sientas a gusto y con la confianza de expresar lo que necesitas. Puedes cambiar de postura, pedirme que ajuste la presión o que cambie la música. Si algo no te resulta cómodo, dímelo. Tu voz importa y quiero que sientas que tienes la libertad de compartir cómo estás en cada momento.",
    ],
  },
  {
    id: "home-productos",
    page: "Inicio",
    title: "Productos especiales",
    url: "/#productos",
    selector: "#productos",
    texts: [
      "Kicker: Productos especiales",
      "Título: Cuidados para ti o para regalar",
      "Además de las sesiones sueltas, en TUKURA puedes regalar un masaje o reservar un bono para acompañarte a lo largo del tiempo.",
      "",
      "— Tarjeta regalo —",
      "Ese regalo que sabes que le va a encantar",
      "Para esa persona que nunca encuentra un momento para sí, que lleva demasiadas cosas en la cabeza o que disfruta de un buen masaje. Un masaje es de esos regalos que no se quedan guardados en un cajón. Se disfrutan, se sienten y se recuerdan.",
      "Badges: Digital · Recoger en el centro",
      "En TUKURA puedes elegir uno de nuestros masajes o regalar el importe que prefieras, para que esa persona decida cuál le apetece más.",
      "¿Cómo puedes conseguirla?",
      "• Digital: te la envío por email o WhatsApp, lista para regalar.",
      "• Física: puedes recogerla en el centro y entregarla en persona.",
      "Las tarjetas regalo tienen una validez de 6 meses desde la fecha de compra.",
      "¿Ya estás pensando en alguien?",
      "CTA: Reserva tu tarjeta regalo",
      "",
      "— Bono de 5 sesiones —",
      "Para quien quiere cuidarse con continuidad. Un bono de 5 sesiones a un precio especial, para que vuelvas cuando lo necesites y mantengas el bienestar a lo largo del tiempo.",
      "Badges: 200€ · 5 sesiones",
      "El bono es personal y tiene una validez de 6 meses desde la fecha de compra. Puedes usarlo en cualquiera de nuestros masajes.",
      "CTA: Reserva tu bono",
    ],
  },
  {
    id: "home-faq",
    page: "Inicio",
    title: "FAQ",
    url: "/#faq",
    selector: "#faq",
    texts: [
      "Kicker: FAQ",
      "Título: ¿Tienes alguna duda?",
      "",
      "¿Necesito traer algo para mi sesión de quiromasaje?",
      "Solo ven con ropa cómoda. En el centro disponemos de todo lo necesario para tu sesión: toallas, aceites y un espacio acondicionado para que solo te preocupes de disfrutar.",
      "",
      "¿Puedo hacerme un masaje si estoy embarazada?",
      "¡Sí, pero con cariño extra! A partir del segundo trimestre podemos adaptar nuestras técnicas para mimar tu espalda y piernas cansadas. Eso sí, te pedimos que nos avises al reservar y, si tienes cualquier duda, que lo consultes antes con tu médico de confianza",
      "",
      "¿Duele el quiromasaje relajante?",
      "No debería doler. Adaptamos la presión a tu tolerancia y a lo que tu cuerpo necesita en cada momento. Si en algún punto sientes molestia, nos lo dices y ajustamos al instante.",
      "",
      "¿Cómo debo cuidarme después del masaje?",
      "Bebe agua, evita esfuerzos intensos el resto del día y date permiso para ir más despacio. Es normal sentir más sueño o emoción: el cuerpo está integrando la sesión.",
    ],
  },
  {
    id: "home-contacto",
    page: "Inicio",
    title: "Contacto",
    url: "/#contacto",
    selector: "#contacto",
    texts: [
      "Kicker: contacta con nosotros",
      "Título: Pide cita y regálate una pausa",
      "Formulario: ¿Qué necesitas? (masajes, Tarjeta regalo, Bono 5 sesiones, Información) · Objecciones · Nombre · Apellidos",
      "Teléfono: 641 984 714",
      "Instagram: @tukura_bienestar",
      "Dirección: C/ Madre de Dios, n° 7. Centro Apófisis. Jerez de la Frontera.",
    ],
  },
  {
    id: "quien-soy",
    page: "Quién soy",
    title: "Página completa",
    url: "/quien-soy/",
    selector: "main#main-content",
    texts: [
      "Kicker: quién soy",
      "Patri Guillén",
      "Educadora Social y Quiromasajista. La persona que da vida a TUKURA y te acompañará en cada sesión.",
      "Durante los últimos años he acompañado a personas y familias en momentos vitales complejos. En ese camino nació mi curiosidad por comprender cómo todo lo que vivimos y sentimos también se expresa a través del cuerpo.",
      "Por eso, para mí, cada masaje empieza escuchándote: cómo llegas, qué necesitas y qué te gustaría cuidar. A partir de ahí, adapto las técnicas, la presión y el ritmo a ti, respetando tus sensaciones y lo que tu cuerpo necesita en ese momento.",
      "Me gusta crear un espacio donde haya lugar para el silencio, la conversación, una risa o cualquier emoción que pueda surgir. Donde puedas sentirte a gusto, sin exigencias ni expectativas. Porque cada persona es diferente y cada sesión también lo es.",
      "Mi recorrido me permite acompañarte desde una mirada integral, cercana y respetuosa.",
      "“Tu cuerpo también cuenta tu historia.”",
      "Parte de mi formación: Educación Social · Quiromasaje · Masaje vertebral y sistema nervioso autónomo · Kobido · Facilitadora Kundalini Energía Vital.",
      "Y sigo aprendiendo, porque cuidar también es una forma de crecer.",
    ],
  },
  {
    id: "historia",
    page: "Nuestra historia",
    title: "Página completa",
    url: "/historia/",
    selector: "main#main-content",
    texts: [
      "Kicker: nuestra historia",
      "Título: Tu cuerpo es tu hogar",
      "TUKURA nace del deseo de crear espacios y momentos más amables y seguros. Lugares donde no tengamos que llegar con todo resuelto, donde podamos parar y descansar.",
      "Su nombre surge de un juego entre kura-kura, que significa «tortuga» en indonesio, y curar, entendido desde su sentido más amable: cuidar. Ese cuidado que nos recuerda a la infancia, al cariño y a aquel «sana, sana, culito de rana».",
      "La tortuga lleva su casa a cuestas y avanza a su propio ritmo, con serenidad y paciencia. Simboliza la sabiduría, la longevidad y el respeto por los propios tiempos. Nos recuerda que cada persona tiene su camino y que no necesitamos correr para seguir avanzando.",
      "Como las tortugas, llevamos nuestro hogar con nosotros: el cuerpo. Un lugar donde se expresa nuestra historia, donde sentimos y vivimos. Un hogar que nos acompaña en cada etapa de la vida y que merece ser habitado y honrado.",
      "Tu cuerpo es tu hogar. ¡Habítalo!",
      "Nuestra forma de cuidar: Acompañar sin imponer · Cuidar sin invadir · Sostener sin juzgar",
    ],
  },
  {
    id: "masaje-personalizado",
    page: "Detalle de masaje",
    title: "Masaje personalizado (ejemplo)",
    url: "/masajes/personalizado/",
    selector: "main#main-content",
    texts: [
      "Kicker: escucha a tu cuerpo",
      "Título: Masaje personalizado",
      "45€ · 60 min",
      "Detalle: Hay días en los que sabes exactamente dónde se acumula la tensión… Trabajo esa zona… Te vas con el cuerpo más suelto y con una sensación de alivio.",
      "Formulario de reserva incluido en la página.",
    ],
  },
  {
    id: "legales",
    page: "Textos legales",
    title: "Aviso legal · Privacidad · Cookies",
    url: "/",
    selector: "footer",
    texts: [
      "Titular legal: Patricia Guillén Castro (TUKURA)",
      "NIF: [Completar NIF]",
      "Domicilio: C/ Madre de Dios, n° 7. Centro Apófisis. Jerez de la Frontera.",
      "Email: info@tukura.es · Teléfono: 641 984 714",
      "Web: https://tukura.es",
      "",
      "Documentos disponibles desde el pie: Privacidad, Aviso legal, Cookies.",
      "Banner de consentimiento: vanilla-cookieconsent (necesarias + funcionales / Google Maps).",
      "Última actualización de textos: 20 de octubre de 2026",
    ],
  },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function dismissCookies(page) {
  try {
    const btn = page.locator("#cc-main button").filter({ hasText: /Solo necesarias|Rechazar|necesarias/i }).first();
    if (await btn.isVisible({ timeout: 2500 })) {
      await btn.click({ timeout: 2000 });
      await wait(400);
    }
  } catch {
    /* no banner */
  }
}

async function captureSection(browser, section, viewport, label) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const url = new URL(section.url, BASE).toString();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await dismissCookies(page);
  await wait(600);

  // Hash navigation after load
  if (section.url.includes("#")) {
    const hash = section.url.split("#")[1];
    await page.evaluate((h) => {
      const el = document.getElementById(h);
      if (el) el.scrollIntoView({ block: "start" });
    }, hash);
    await wait(500);
  }

  const outPath = join(SHOT_DIR, `${section.id}-${label}.png`);
  let shot = false;

  if (section.selector) {
    const loc = page.locator(section.selector).first();
    try {
      if (await loc.count()) {
        await loc.scrollIntoViewIfNeeded();
        await wait(300);
        await loc.screenshot({ path: outPath, animations: "disabled" });
        shot = true;
      }
    } catch {
      /* fall through */
    }
  }

  if (!shot) {
    await page.screenshot({ path: outPath, fullPage: false, animations: "disabled" });
  }

  await context.close();
  return outPath;
}

function drawWrapped(doc, text, options = {}) {
  const { fontSize = 10, color = "#333", indent = 0, spaceAfter = 6 } = options;
  doc.fontSize(fontSize).fillColor(color).text(text, {
    indent,
    align: "left",
    paragraphGap: 2,
  });
  if (spaceAfter) doc.moveDown(spaceAfter / 12);
}

async function buildPdf(shots) {
  mkdirSync(OUT_DIR, { recursive: true });

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 48, bottom: 48, left: 48, right: 48 },
    info: {
      Title: "TUKURA — Contenidos web actualizados",
      Author: "TUKURA",
      Subject: "Textos y capturas desktop/mobile",
    },
  });

  const stream = createWriteStream(PDF_PATH);
  doc.pipe(stream);

  // Cover
  doc.fontSize(28).fillColor("#4d3114").text("TUKURA", { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(16).fillColor("#c26d82").text("Contenidos web actualizados", { align: "center" });
  doc.moveDown(1);
  doc.fontSize(11).fillColor("#555").text(
    `Documento generado el ${new Date().toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}.`,
    { align: "center" },
  );
  doc.moveDown(0.5);
  doc.fontSize(10).fillColor("#777").text(
    "Incluye textos vigentes de las páginas y secciones, con capturas desktop (1440px) y mobile (390px).",
    { align: "center" },
  );
  doc.moveDown(2);
  doc.fontSize(12).fillColor("#4d3114").text("Índice");
  doc.moveDown(0.5);
  for (const s of SECTIONS) {
    doc.fontSize(10).fillColor("#333").text(`• ${s.page} — ${s.title}`);
  }

  let currentPage = null;

  for (const section of SECTIONS) {
    if (currentPage !== section.page) {
      doc.addPage();
      currentPage = section.page;
      doc.fontSize(20).fillColor("#4d3114").text(section.page);
      doc.moveDown(0.3);
      doc
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.width - doc.page.margins.right, doc.y)
        .strokeColor("#c26d82")
        .lineWidth(1.5)
        .stroke();
      doc.moveDown(1);
    } else if (doc.y > doc.page.height - 180) {
      doc.addPage();
    } else {
      doc.moveDown(0.8);
    }

    doc.fontSize(14).fillColor("#c26d82").text(section.title);
    doc.moveDown(0.4);
    doc.fontSize(9).fillColor("#888").text(`URL: ${section.url}`);
    doc.moveDown(0.6);

    doc.fontSize(11).fillColor("#4d3114").text("Textos");
    doc.moveDown(0.3);
    for (const line of section.texts) {
      if (!line) {
        doc.moveDown(0.3);
        continue;
      }
      if (doc.y > doc.page.height - 100) doc.addPage();
      drawWrapped(doc, line, { fontSize: 9.5, color: "#333", spaceAfter: 4 });
    }

    doc.moveDown(0.6);
    if (doc.y > doc.page.height - 280) doc.addPage();
    doc.fontSize(11).fillColor("#4d3114").text("Capturas");
    doc.moveDown(0.4);

    const desk = shots[`${section.id}-desktop`];
    const mob = shots[`${section.id}-mobile`];
    const maxW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const colGap = 12;
    const deskW = maxW * 0.62;
    const mobW = maxW * 0.32;

    if (desk && existsSync(desk)) {
      doc.fontSize(8).fillColor("#888").text("Desktop");
      const y = doc.y + 4;
      try {
        doc.image(desk, doc.page.margins.left, y, {
          width: deskW,
          height: 220,
          fit: [deskW, 220],
        });
      } catch {
        doc.fontSize(8).text("(No se pudo insertar la captura desktop)");
      }

      if (mob && existsSync(mob)) {
        doc.fontSize(8).fillColor("#888").text("Mobile", doc.page.margins.left + deskW + colGap, y - 12);
        try {
          doc.image(mob, doc.page.margins.left + deskW + colGap, y, {
            width: mobW,
            height: 220,
            fit: [mobW, 220],
          });
        } catch {
          /* ignore */
        }
      }
      doc.y = y + 230;
    }
  }

  // Legal appendix with fuller excerpts
  doc.addPage();
  doc.fontSize(20).fillColor("#4d3114").text("Anexo — Textos legales (resumen)");
  doc.moveDown(0.5);
  drawWrapped(
    doc,
    "Responsable: Patricia Guillén Castro (nombre comercial TUKURA). NIF pendiente de completar. Domicilio y contacto según pie de página. Documentos: Aviso legal (LSSI), Política de privacidad (RGPD/LOPDGDD) y Política de cookies (art. 22.2 LSSI). Consentimiento gestionado con vanilla-cookieconsent; cookies funcionales opcionales para Google Maps.",
    { fontSize: 10, spaceAfter: 10 },
  );
  drawWrapped(
    doc,
    "Los textos legales completos están disponibles en los overlays del pie de página del sitio (Privacidad, Aviso legal, Cookies).",
    { fontSize: 10, spaceAfter: 10 },
  );

  doc.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function main() {
  mkdirSync(SHOT_DIR, { recursive: true });
  console.log(`Base URL: ${BASE}`);
  console.log("Launching browser…");

  const browser = await chromium.launch({
    headless: true,
    channel: "chrome",
  });
  /** @type {Record<string, string>} */
  const shots = {};

  for (const section of SECTIONS) {
    console.log(`Capturing ${section.id}…`);
    try {
      shots[`${section.id}-desktop`] = await captureSection(
        browser,
        section,
        DESKTOP,
        "desktop",
      );
      shots[`${section.id}-mobile`] = await captureSection(
        browser,
        section,
        MOBILE,
        "mobile",
      );
    } catch (err) {
      console.warn(`  failed ${section.id}:`, err.message);
    }
  }

  await browser.close();
  console.log("Building PDF…");
  await buildPdf(shots);
  console.log(`PDF written to ${PDF_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
