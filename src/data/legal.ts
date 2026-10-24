import { site } from "./site";

export type LegalDocId = "privacidad" | "aviso-legal" | "cookies";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  id: LegalDocId;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

/** Fill in NIF before publishing — required by LSSI-CE. */
export const legalEntity = {
  ownerName: "Patricia Guillén Castro",
  tradeName: site.name,
  nif: "[Completar NIF]",
  activity: "Servicios de quiromasaje, masaje y bienestar",
  address: site.contact.address,
  email: site.contact.email,
  phone: site.contact.phone,
  website: site.url,
  domain: "tukura.es",
} as const;

const lastUpdated = "20 de octubre de 2026";

export const legalDocuments: Record<LegalDocId, LegalDocument> = {
  "aviso-legal": {
    id: "aviso-legal",
    title: "Aviso legal",
    lastUpdated,
    sections: [
      {
        heading: "1. Titularidad del sitio web",
        paragraphs: [
          `En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a todos los lectores y usuarios de que el contenido del dominio ${legalEntity.domain} es responsabilidad de:`,
        ],
        list: [
          `Titular: ${legalEntity.ownerName}`,
          `Nombre comercial: ${legalEntity.tradeName}`,
          `NIF: ${legalEntity.nif}`,
          `Domicilio: ${legalEntity.address}`,
          `Teléfono: ${legalEntity.phone}`,
          `Email: ${legalEntity.email}`,
          `Actividad: ${legalEntity.activity}`,
        ],
      },
      {
        heading: "2. Términos y condiciones de uso",
        paragraphs: [
          "El usuario accede voluntariamente a este sitio web. El acceso y la navegación implican aceptar y conocer las advertencias legales, condiciones y términos de uso aquí contenidos. El mero acceso no implica el establecimiento de ninguna relación comercial entre el titular y el usuario.",
          `La información del Sitio tiene como finalidad facilitar el conocimiento de las actividades y servicios que presta ${legalEntity.tradeName}. El titular se reserva el derecho de efectuar, en cualquier momento y sin previo aviso, cuantas modificaciones, variaciones, supresiones o cancelaciones en los contenidos y en su forma de presentación considere necesarias, de forma temporal o definitiva. El usuario debe asegurarse de utilizar en cada momento la versión actualizada. Esta facultad no otorga derecho a percibir indemnización por daños y perjuicios.`,
        ],
      },
      {
        heading: "3. Servicios",
        paragraphs: [
          `${legalEntity.tradeName} ofrece a través del Sitio información sobre servicios de masaje y bienestar, así como canales de contacto y reserva (formulario que genera un mensaje para WhatsApp, teléfono, email e Instagram). El usuario debe leer con atención las condiciones aplicables a cada servicio, lo que en ningún caso le exime del cumplimiento de este Aviso legal.`,
          "La información publicada tiene carácter orientativo y no constituye consejo médico ni sustituye el criterio de un profesional sanitario.",
        ],
      },
      {
        heading: "4. Condiciones de uso del Sitio",
        paragraphs: [
          "El usuario se compromete a hacer un uso adecuado y lícito del Sitio y de sus contenidos, de conformidad con la legislación aplicable, la buena fe y el orden público.",
          "Queda prohibido utilizar el Sitio con fines ilícitos, lesivos de derechos e intereses de terceros, o de cualquier forma que pueda dañar, inutilizar, sobrecargar o impedir el normal funcionamiento del Sitio.",
        ],
      },
      {
        heading: "5. Exoneración de responsabilidades",
        paragraphs: [
          "Uso indebido: el titular no se responsabiliza del mal uso que se realice de los contenidos del Sitio, ni de los daños o perjuicios que se deriven del acceso o uso indebido de la información.",
          "Contenidos de terceros: el Sitio puede contener enlaces a otras páginas (WhatsApp, Instagram, Google Maps u otros). Dichos enlaces son independientes. El titular no garantiza la exactitud, suficiencia o autenticidad de la información suministrada a través de ellos.",
          "Fallos tecnológicos: el titular no se responsabiliza de daños derivados de interferencias, omisiones, interrupciones, virus informáticos, averías o desconexiones motivadas por causas ajenas; ni de retrasos o bloqueos causados por deficiencias o sobrecargas de redes o servidores; ni de intromisiones ilegítimas de terceros fuera de su control.",
          "El titular no tiene la obligación de verificar la identidad de los usuarios ni la veracidad, vigencia o exhaustividad de los datos que estos facilitan sobre sí mismos.",
        ],
      },
      {
        heading: "6. Propiedad intelectual e industrial",
        paragraphs: [
          `El material contenido en este Sitio es propiedad de ${legalEntity.ownerName} o de terceros que han autorizado su uso. El acceso gratuito no implica licencia para su reproducción y/o distribución sin autorización previa y expresa del titular.`,
          "Las marcas, logotipos, diseños, tipografías, textos, imágenes, código y demás elementos están protegidos por las leyes de propiedad intelectual e industrial. La reproducción, distribución, comunicación pública o transformación no autorizada podrá dar lugar a las acciones civiles y penales que correspondan.",
        ],
      },
      {
        heading: "7. Política de privacidad y cookies",
        paragraphs: [
          "El usuario puede consultar la Política de privacidad y la Política de cookies en este mismo Sitio, a través de los enlaces del pie de página o del panel de preferencias de cookies.",
          "En cumplimiento de la LSSI-CE, el RGPD y la LOPDGDD, se solicita el consentimiento para cookies no necesarias la primera vez que se accede al Sitio.",
        ],
      },
      {
        heading: "8. Menores",
        paragraphs: [
          `Los menores de 14 años no podrán usar los servicios disponibles a través de ${legalEntity.domain} sin la previa autorización de sus padres, tutores o representantes legales, quienes serán responsables de los actos realizados por los menores a su cargo.`,
          `Si tienes conocimiento del registro o envío de datos de un menor de 14 años sin autorización, te rogamos que nos lo comuniques a ${legalEntity.email} para proceder a su eliminación.`,
        ],
      },
      {
        heading: "9. Legislación aplicable y tribunales",
        paragraphs: [
          "Los términos y condiciones que rigen este Sitio, así como las relaciones que pudieran derivarse de él, quedan sujetos a la legislación española.",
          `Para la resolución de cualquier controversia entre el usuario y ${legalEntity.ownerName} por el uso de este Sitio, se aplicará la legislación española y los tribunales que resulten competentes conforme a la normativa de consumidores y usuarios (domicilio del usuario consumidor) o, en su defecto, los de Jerez de la Frontera (Cádiz).`,
        ],
      },
      {
        heading: "10. Contacto",
        paragraphs: [
          `Para cualquier consulta relacionada con este aviso legal: ${legalEntity.email} · ${legalEntity.phone}.`,
        ],
      },
    ],
  },

  privacidad: {
    id: "privacidad",
    title: "Política de privacidad",
    lastUpdated,
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        paragraphs: [
          "En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD), y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa de lo siguiente.",
          "El responsable del tratamiento de los datos de carácter personal es:",
        ],
        list: [
          `Identidad: ${legalEntity.ownerName} (${legalEntity.tradeName})`,
          `NIF: ${legalEntity.nif}`,
          `Dirección: ${legalEntity.address}`,
          `Teléfono: ${legalEntity.phone}`,
          `Email: ${legalEntity.email}`,
          `Web: ${legalEntity.website}`,
        ],
      },
      {
        heading: "2. Datos recopilados y su procedencia",
        paragraphs: [
          "Recopilamos y tratamos información personal, con carácter general, para gestionar la relación que mantenemos contigo. Según el caso:",
        ],
        list: [
          "Datos de contacto y reserva: nombre y apellidos; tipo de masaje o servicio solicitado; mensaje o consulta; teléfono cuando nos escribes por WhatsApp o nos llamas; email o perfil de Instagram si nos contactas por esos canales.",
          "Datos de salud o bienestar: información que nos facilitas voluntariamente (por ejemplo, contraindicaciones u objeciones en el formulario de reserva), necesaria para prestar el servicio de forma segura.",
          "Datos de navegación: información técnica asociada a cookies necesarias y, si lo autorizas, a cookies funcionales (ver Política de cookies).",
        ],
      },
      {
        heading: "3. Cómo recabamos tu información",
        paragraphs: [
          "Recabamos tu información a través de distintos medios. En el momento de la recogida se informa, en la medida aplicable, sobre el responsable, la finalidad, la base legal, los destinatarios, el plazo de conservación y cómo ejercer tus derechos.",
          "Principalmente a través del formulario de reserva del Sitio, que genera un mensaje prellenado que tú envías por WhatsApp. También si nos contactas por teléfono, email, WhatsApp o Instagram.",
          `${legalEntity.tradeName} utiliza redes sociales (p. ej. Instagram) como otro canal de contacto. La información que publiques en esas plataformas se rige también por sus propias políticas de privacidad; te recomendamos consultarlas antes de usarlas.`,
          "A través de la página web también puede recabarse información relacionada con la navegación mediante cookies. Para conocer de forma clara qué cookies utilizamos, sus finalidades y cómo configurarlas, consulta nuestra Política de cookies.",
        ],
      },
      {
        heading: "4. Responsabilidad del usuario",
        paragraphs: [
          `Al facilitarnos tus datos a través de canales electrónicos, garantizas que eres mayor de 14 años y que los datos facilitados a ${legalEntity.ownerName} son verdaderos, exactos, completos y actualizados.`,
          "Respondes de la veracidad de los datos comunicados y te comprometes a mantenerlos actualizados. Serás responsable de los datos falsos o inexactos que facilites, así como de los daños y perjuicios, directos o indirectos, que pudieran derivarse.",
        ],
      },
      {
        heading: "5. Finalidad del tratamiento",
        paragraphs: [
          "La recogida y el tratamiento de tus datos personales responden, según el caso concreto, a:",
        ],
        list: [
          "Gestionar solicitudes de información y reservas de sesiones de masaje y bienestar.",
          "Prestar el servicio de forma segura, teniendo en cuenta la información que nos facilites sobre tu estado o contraindicaciones.",
          "Atender consultas e incidencias asociadas al servicio a través de WhatsApp, teléfono, email o Instagram.",
          "Gestionar la comunicación necesaria para continuar la relación de contacto o reserva.",
          "Cumplir obligaciones legales aplicables.",
          "Mejorar la experiencia de navegación mediante cookies funcionales, solo si las aceptas.",
        ],
      },
      {
        heading: "6. Legitimación",
        paragraphs: [
          `${legalEntity.ownerName} está legitimada al tratamiento de datos personales conforme al RGPD:`,
        ],
        list: [
          "Art. 6.1.a) RGPD: consentimiento del interesado para uno o varios fines específicos (p. ej. cookies no necesarias; envío del formulario o mensaje con datos voluntarios).",
          "Art. 6.1.b) RGPD: ejecución de medidas precontractuales a petición del interesado o de un contrato (gestión de la reserva y prestación del servicio).",
          "Art. 6.1.c) RGPD: cumplimiento de una obligación legal aplicable al responsable.",
          "Art. 6.1.f) RGPD: interés legítimo para atender consultas, reclamaciones y la comunicación razonable asociada al servicio.",
          "Art. 9.2.a) RGPD: cuando se traten datos de salud o bienestar facilitados voluntariamente, el consentimiento explícito al enviar el formulario o mensaje.",
        ],
      },
      {
        heading: "7. Plazo de conservación",
        paragraphs: [
          "Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la que se recabaron, los años necesarios para cumplir obligaciones legales y para determinar posibles responsabilidades derivadas del tratamiento. En su caso, se bloquearán o limitarán y podrán ponerse a disposición de las autoridades competentes.",
          "Por regla general, mantendremos tu información mientras exista una relación que nos vincule o no ejerzas tu derecho de supresión y/o limitación del tratamiento. En ese caso, la información podrá bloquearse sin uso distinto de su conservación mientras sea necesaria para el ejercicio o defensa de reclamaciones o pudiera derivarse alguna responsabilidad.",
          "Los datos de salud o bienestar facilitados para la sesión se tratarán solo en la medida necesaria para prestar el servicio y se limitarán o eliminarán cuando dejen de ser necesarios, salvo obligación legal de conservación.",
        ],
      },
      {
        heading: "8. Exactitud de los datos",
        paragraphs: [
          `Toda la información que facilites a través de los servicios del Sitio deberá ser veraz. Garantizas la autenticidad de los datos que comuniques al cumplimentar formularios o enviar mensajes. Será tu responsabilidad mantener actualizada la información facilitada a ${legalEntity.ownerName}. En todo caso, serás el único responsable de las manifestaciones falsas o inexactas que realices y de los perjuicios que cause.`,
        ],
      },
      {
        heading: "9. Destinatarios",
        paragraphs: [
          "Solo se cederán datos en los casos necesarios para el desarrollo, control y cumplimiento de la/s finalidad/es expresada/s, o en los supuestos previstos por la ley.",
        ],
        list: [
          "Proveedores tecnológicos necesarios para el funcionamiento del Sitio y las comunicaciones (por ejemplo, Meta/WhatsApp o Instagram cuando usas esos canales; Google si aceptas el mapa embebido).",
          "Administraciones Públicas, Jueces y Tribunales, para la atención de posibles responsabilidades nacidas del tratamiento.",
        ],
      },
      {
        heading: "10. Transferencias internacionales",
        paragraphs: [
          "Algunos proveedores (p. ej. Meta o Google) pueden tratar datos fuera del Espacio Económico Europeo. En ese caso se aplicarán las garantías previstas en el RGPD (cláusulas contractuales tipo u otras medidas adecuadas).",
        ],
      },
      {
        heading: "11. Derechos de los usuarios",
        paragraphs: [
          `Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad y revocación del consentimiento (cuando el tratamiento se base en él), acreditando tu identidad, a través del teléfono ${legalEntity.phone} o del email ${legalEntity.email}, indicando «Protección de datos».`,
          "Cuando no hayas obtenido satisfacción en el ejercicio de tus derechos, puedes presentar reclamación ante la Agencia Española de Protección de Datos: C/ Jorge Juan, 6 – 28001 Madrid · Teléfonos: 901 100 099 / 912 663 517 · www.aepd.es.",
        ],
      },
      {
        heading: "12. Medidas de seguridad",
        paragraphs: [
          `${legalEntity.ownerName} adoptará en su sistema de información medidas físicas, técnicas y organizativas razonablemente fiables y efectivas, dando cumplimiento al principio de responsabilidad proactiva, a fin de garantizar la seguridad y confidencialidad de los datos, evitando su alteración, pérdida, tratamiento o acceso no autorizado.`,
          "En los contratos con proveedores se incluirán, cuando proceda, cláusulas que exijan mantener el deber de secreto respecto a los datos a los que tengan acceso e implantar medidas de seguridad adecuadas.",
          "Estas medidas se revisan de forma periódica. No obstante, la seguridad absoluta no puede garantizarse. Si alguna información bajo nuestro control se viese comprometida como consecuencia de una brecha de seguridad, se tomarán las medidas adecuadas para investigar el incidente, notificarlo a la Autoridad de Control y, en su caso, a los usuarios afectados.",
        ],
      },
      {
        heading: "13. Código de conducta y actualizaciones",
        paragraphs: [
          `Se informa de que el sitio ${legalEntity.domain} no está adherido a ningún código de conducta, propio o ajeno.`,
          "La presente Política de privacidad puede modificarse para adaptarse a cambios legislativos o a las directrices de la Agencia Española de Protección de Datos. La fecha de la última actualización aparece al inicio del documento.",
        ],
      },
    ],
  },

  cookies: {
    id: "cookies",
    title: "Política de cookies",
    lastUpdated,
    sections: [
      {
        heading: "1. Marco normativo y responsable",
        paragraphs: [
          "A los efectos de dar cumplimiento a las obligaciones previstas en el artículo 22.2 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), en relación con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa de lo siguiente.",
          `${legalEntity.ownerName} (${legalEntity.tradeName}) es responsable de las cookies y del tratamiento de los datos obtenidos a través de estas, ya sean propias o de terceros, decidiendo sobre la finalidad, contenido y uso del tratamiento de la información recabada.`,
          "El objetivo de esta política es informarte de manera clara y detallada de qué es una cookie, cuál es su finalidad, qué tipo de cookies utilizamos, durante cuánto tiempo se almacenan y cómo configurarlas o deshabilitarlas.",
        ],
      },
      {
        heading: "2. Qué son las cookies",
        paragraphs: [
          "Las cookies son archivos que se pueden descargar en tu equipo a través de las páginas web. Son herramientas esenciales para la prestación de numerosos servicios de la sociedad de la información. Entre otros, permiten a una página web almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, según la información obtenida, reconocer al usuario y mejorar el servicio ofrecido.",
        ],
      },
      {
        heading: "3. Tipos de cookies",
        paragraphs: [
          "Según quién gestione el dominio desde el que se envían las cookies:",
        ],
        list: [
          "Cookies propias: se envían desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado.",
          "Cookies de terceros: se envían desde un equipo o dominio no gestionado por el editor, sino por otra entidad que trata los datos obtenidos a través de las cookies.",
        ],
      },
      {
        heading: "4. Según el plazo de conservación",
        paragraphs: [],
        list: [
          "Cookies de sesión: recaban y almacenan datos mientras el usuario accede a una página web y suelen desaparecer al terminar la sesión.",
          "Cookies persistentes: los datos siguen almacenados en el terminal y pueden accederse durante un periodo definido por el responsable de la cookie (de minutos a varios años).",
        ],
      },
      {
        heading: "5. Según la finalidad",
        paragraphs: [],
        list: [
          "Cookies técnicas o necesarias: permiten la navegación y el uso de las diferentes opciones o servicios del Sitio (incluida la gestión del consentimiento de cookies).",
          "Cookies de preferencias o personalización / funcionales: permiten recordar información para que el usuario acceda al servicio con determinadas características, o habilitar funcionalidades opcionales (p. ej. mapa embebido).",
          "Cookies de análisis o medición: permiten el seguimiento y análisis del comportamiento de los usuarios. Actualmente no utilizamos este tipo de cookies.",
          "Cookies de publicidad comportamental: elaboran un perfil para mostrar publicidad. Actualmente no utilizamos este tipo de cookies.",
          "Cookies de redes sociales externas: permiten interactuar con contenido de plataformas sociales. Solo se generan si usas esas funcionalidades o enlaces; se rigen por la política de la red social correspondiente.",
        ],
      },
      {
        heading: `6. Cookies utilizadas en ${legalEntity.domain}`,
        paragraphs: [
          "A continuación se identifican las cookies o tecnologías equivalentes utilizadas en este Sitio:",
        ],
        list: [
          "cc_cookie (propia / necesaria): guarda tus preferencias de consentimiento de cookies. Duración aproximada: 6 meses. Imprescindible para recordar tu elección; no requiere consentimiento adicional.",
          "Cookies de Google Maps / Google (terceros / funcionales): pueden establecerse al cargar el mapa embebido en la sección de contacto. Solo se activan si aceptas las cookies funcionales. Política de Google: https://policies.google.com/privacy",
        ],
      },
      {
        heading: "7. Desactivación y eliminación de cookies",
        paragraphs: [
          "Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de tu navegador. Al desactivar cookies, algunos servicios podrían dejar de estar operativos.",
          "También puedes gestionar tus preferencias en este Sitio mediante el enlace «Cookies» del pie de página o el panel de consentimiento (aceptar todas, solo necesarias o configurar).",
          "Enlaces de ayuda de navegadores habituales:",
        ],
        list: [
          "Microsoft Edge: https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
          "Mozilla Firefox: https://support.mozilla.org/es/kb/Borrar%20cookies",
          "Google Chrome: https://support.google.com/accounts/answer/61416?hl=es",
          "Safari: https://support.apple.com/es-es/guide/safari/sfri11471/mac",
        ],
      },
      {
        heading: "8. Herramientas adicionales",
        paragraphs: [
          "También puedes gestionar el almacén de cookies a través de herramientas como Ghostery (www.ghostery.com) o Your Online Choices (www.youronlinechoices.com/es/).",
        ],
      },
      {
        heading: "9. Aceptación de la Política de cookies",
        paragraphs: [
          `${legalEntity.domain} muestra información sobre su Política de cookies al inicio de la visita para que seas consciente de su uso. Ante esta información puedes:`,
        ],
        list: [
          "Aceptar todas: se instalarán también las cookies funcionales (p. ej. mapa).",
          "Rechazarlas / solo necesarias: solo se usarán cookies imprescindibles para el funcionamiento del Sitio y el recuerdo de tu elección.",
          "Configurar: podrás elegir categorías en el panel de preferencias.",
        ],
      },
      {
        heading: "10. Más información",
        paragraphs: [
          `Para más detalles sobre el tratamiento de datos personales, consulta nuestra Política de privacidad. Para cualquier duda: ${legalEntity.email} · ${legalEntity.phone}.`,
        ],
      },
    ],
  },
};

export const legalFooterItems: {
  id: LegalDocId;
  label: string;
}[] = [
  { id: "privacidad", label: "Privacidad" },
  { id: "aviso-legal", label: "Aviso legal" },
  { id: "cookies", label: "Cookies" },
];
