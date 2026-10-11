# 🇨🇴 Trivia Colombia – Juego de Preguntas y Saberes

> **Proyecto Parcial de Desarrollo Full Stack**  
> **Institución:** Universidad de Santander (UDES)  
> **Docente:** Carlos Carrascal  
> **Fecha de Entrega:** Octubre de 2026  
> **Estudiante:** [Nombre del estudiante]  

---

## 1. Descripción del Proyecto

**Trivia Colombia** es una aplicación web interactiva y educativa desarrollada con tecnologías nativas del estándar web (**HTML5 semántico, CSS3 y JavaScript ES6+**). Permite a los usuarios evaluar y profundizar sus conocimientos sobre Colombia en cinco categorías fundamentales:

1. 🗺️ **Geografía**
2. 🏛️ **Historia**
3. 🎭 **Cultura y Tradiciones**
4. ⚽ **Deportes**
5. 🌿 **Ciencia y Naturaleza**

El juego funciona de forma 100% autónoma en el navegador web del cliente. Posee un banco de **55 preguntas especializadas** distribuidas en tres niveles de dificultad (*Fácil*, *Medio*, *Difícil*), temporizador reglamentario de 20 segundos por pregunta, comodines estratégicos (*50/50* y *Tiempo extra*), sistema de puntuación con bonificación de rapidez y rachas, y almacenamiento persistente en `localStorage` para el **Ranking Top 10** y estadísticas acumuladas del jugador.

---

## 2. Enlaces de Entrega Oficial (Sección 17.5)

| Entregable | Enlace Oficial |
|---|---|
| **🎨 Diseño en Figma / MockFlow** | [https://www.figma.com/design/trivia-colombia-udes](https://www.figma.com/) |
| **💻 Repositorio en GitHub** | [https://github.com/usuario/trivia-colombia](https://github.com/) |
| **🚀 Despliegue en Vercel** | [https://trivia-colombia.vercel.app](https://trivia-colombia.vercel.app) |
| **🎥 Video Explicativo (YouTube)** | [https://youtu.be/...](https://youtu.be/) |

---

## 3. Tecnologías y Herramientas Utilizadas (Sección 5)

| Tecnología / Herramienta | Propósito y Uso en el Proyecto |
|---|---|
| **HTML5** | Estructura semántica accesible (`header`, `main`, `section`, `article`, `footer`, `dialog`, roles ARIA). |
| **CSS3** | Variables de color personalizadas, Flexbox, CSS Grid, media queries fluidas y animaciones optimizadas. |
| **JavaScript (ES6+)** | Lógica modular, algoritmo de mezcla Fisher-Yates, temporizador asíncrono, manipulación del DOM y eventos. |
| **Web Audio API** | Síntesis acústica nativa para efectos sonoros de acierto, error, comodines y alertas de tiempo. |
| **localStorage API** | Persistencia en cliente del Ranking Top 10, estadísticas globales y preferencias de accesibilidad. |
| **Figma / MockFlow** | Wireframes de baja fidelidad, mockups de alta fidelidad (desktop y móvil) y guía de estilos. |
| **Git & GitHub** | Control de versiones con historial de commits progresivos y descriptivos. |
| **Vercel** | Despliegue continuo en la nube para acceso público inmediato. |
| **VS Code / Antigravity** | Entorno de desarrollo integrado con Live Server. |

---

## 4. Estructura Modular del Proyecto (Sección 8)

El repositorio mantiene la estricta organización modular exigida en la documentación técnica:

```text
trivia-colombia/
│
├── index.html              # Estructura semántica y accesible de todas las pantallas
├── README.md               # Documentación general y manual técnico
│
├── css/
│   ├── styles.css          # Variables de diseño, componentes, temas y accesibilidad
│   └── responsive.css      # Media queries fluidas (desde 360px hasta 1440px+)
│
├── js/
│   ├── preguntas.js        # Banco de 55 preguntas con respuestas y explicaciones
│   ├── almacenamiento.js   # Gestión de localStorage (Ranking Top 10 y estadísticas)
│   ├── juego.js            # Lógica central: Fisher-Yates, puntuación, comodines y reloj
│   ├── ui.js               # Renderizado reactivo del DOM y gestión de foco/ARIA
│   └── app.js              # Punto de entrada, Web Audio API y atajos de teclado
│
├── assets/
│   ├── img/                # Logotipo vectorial e íconos SVG de categorías
│   │   ├── logo.svg
│   │   ├── categoria-geografia.svg
│   │   ├── categoria-historia.svg
│   │   ├── categoria-cultura.svg
│   │   ├── categoria-deportes.svg
│   │   ├── categoria-naturaleza.svg
│   │   └── categoria-todas.svg
│   └── sonidos/            # Archivos de audio complementarios (.wav)
│       ├── acierto.wav
│       ├── error.wav
│       └── comodin.wav
│
└── docs/
    └── diseno/             # Entregables oficiales de diseño UX/UI
        ├── README.md
        ├── guia-de-estilos.html
        ├── guia-de-estilos.md
        ├── wireframes-baja-fidelidad.svg
        ├── mockups-alta-fidelidad-escritorio.svg
        └── mockups-alta-fidelidad-movil.svg
```

---

## 5. Reglas del Juego y Sistema de Puntuación (Sección 6 & 6.1)

### Dinámica de Juego
1. El jugador ingresa su nombre en la pantalla de inicio (obligatorio, no vacío).
2. Selecciona la categoría deseada (o «Todas las Categorías») y el nivel de dificultad:
   - **Fácil:** Multiplicador de puntos **x1.0**
   - **Medio:** Multiplicador de puntos **x1.5**
   - **Difícil:** Multiplicador de puntos **x2.0**
3. El sistema selecciona 10 preguntas aleatorias sin repetición mediante el algoritmo Fisher-Yates y baraja las 4 opciones de respuesta de cada una.
4. Cada pregunta dispone de **20 segundos**. Al expirar el tiempo, se procesa automáticamente como incorrecta.
5. Al responder o expirar el tiempo, se muestra retroalimentación inmediata: la opción correcta se resalta en verde, la incorrecta elegida en rojo, se bloquean las opciones y se ofrece una explicación pedagógica concisa.

### Comodines Disponibles (Sección 6 - Regla 7)
- **✂️ 50 / 50:** Elimina dos opciones incorrectas al azar (costo: **-30 puntos**).
- **⏳ +10 segundos:** Suma 10 segundos extra al temporizador (costo: **-30 puntos**).
- *Cada comodín se puede utilizar una sola vez por partida.*

### Fórmula Oficial de Puntos (Sección 6.1)
$$\text{Puntos de Pregunta} = \left( 100\text{ [base]} + (\text{Segundos Restantes} \times 5) + (\text{Bono Racha } 3 = 50) \right) \times \text{Multiplicador de Dificultad}$$

*Ejemplo (Caso CP-04):* Acierto en dificultad Medio (x1.5) con 12 segundos restantes y sin racha:
- Base: $100$
- Bonificación de rapidez: $12 \times 5 = 60$
- Subtotal: $160$ puntos
- Aplicación de multiplicador: $160 \times 1.5 = 240$ puntos.

---

## 6. Accesibilidad Web (WCAG 2.1 AA / AAA)

La aplicación ha sido desarrollada priorizando la inclusión y usabilidad universal:
- **Navegación por Teclado:** Operable completamente sin ratón:
  - Teclas `1`, `2`, `3`, `4`: Seleccionan opciones A, B, C, D.
  - Tecla `C`: Activa comodín 50/50.
  - Tecla `T`: Activa comodín de tiempo (+10s).
  - Tecla `Enter` o `Espacio`: Avanza a la siguiente pregunta o activa botones enfocados.
- **Lectores de Pantalla:** Región `aria-live="polite"` y `role="alert"` dinámicas para notificar tiempos críticos, aciertos y explicaciones.
- **Objetivos Táctiles (WCAG AAA):** Todos los botones y tarjetas poseen una altura mínima de **44 px** (`--target-touch-min`).
- **Contraste de Colores:** Ratios superiores a **4.5:1** en modo estándar y modo de **Alto Contraste** (> 7:1) conmutable desde la cabecera.
- **Movimiento Reducido:** Soporte nativo para `@media (prefers-reduced-motion: reduce)`.
- **Tema Oscuro / Claro:** Alternancia con persistencia de preferencia en `localStorage`.

---

## 7. Verificación del Plan de Pruebas (Sección 15)

Todos los casos de prueba requeridos han sido verificados satisfactoriamente:

| ID | Caso de Prueba | Resultado Esperado | Estado |
|---|---|---|:---:|
| **CP-01** | Intentar iniciar sin escribir el nombre | Se muestra mensaje de error en rojo y no se avanza. | ✅ Aprobado |
| **CP-02** | Iniciar partida de Historia en nivel fácil | Aparecen 10 preguntas distintas de Historia nivel fácil sin duplicados. | ✅ Aprobado |
| **CP-03** | Jugar dos partidas seguidas con los mismos filtros | El orden de las preguntas y de las opciones cambia (Fisher-Yates). | ✅ Aprobado |
| **CP-04** | Responder correctamente con 12 segundos restantes | Se suman 100 + 60 puntos (antes del multiplicador). | ✅ Aprobado |
| **CP-05** | Responder incorrectamente | La opción elegida se marca en rojo, la correcta en verde y aparece explicación. | ✅ Aprobado |
| **CP-06** | Dejar agotar el tiempo (20s) | La pregunta cuenta como incorrecta con 0 puntos y muestra feedback. | ✅ Aprobado |
| **CP-07** | Hacer clic en otra opción después de responder | No ocurre nada; las 4 opciones quedan bloqueadas inmediatamente. | ✅ Aprobado |
| **CP-08** | Usar el comodín 50/50 | Desaparecen dos opciones incorrectas, descuenta 30 pts y botón queda deshabilitado. | ✅ Aprobado |
| **CP-09** | Acertar 3 preguntas seguidas | Se suma la bonificación de racha de +50 puntos adicionales. | ✅ Aprobado |
| **CP-10** | Terminar una partida completa (10/10) | Se muestra el resumen de desempeño y el puntaje se guarda en el ranking. | ✅ Aprobado |
| **CP-11** | Recargar la página (F5) | El ranking local y las estadísticas acumuladas se conservan intactos. | ✅ Aprobado |
| **CP-12** | Comparar aplicación con el diseño de Figma | Las pantallas, tipografías y colores coinciden con la guía de estilos. | ✅ Aprobado |
| **CP-13** | Abrir el juego en dispositivo móvil de 360 px | Todos los elementos se adaptan fluidamente sin desplazamiento horizontal. | ✅ Aprobado |

---

## 8. Instrucciones de Ejecución Local y Despliegue

### Ejecución Local
No requiere instalación de gestores de paquetes pesados ni dependencias externas:
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/trivia-colombia.git
   cd trivia-colombia
   ```
2. Iniciar con cualquier servidor web local:
   - Con la extensión **Live Server** de VS Code (hacer clic derecho en `index.html` -> *Open with Live Server*).
   - O usando Node.js:
     ```bash
     npx serve .
     ```
   - O usando Python:
     ```bash
     python -m http.server 8000
     ```
3. Abrir en el navegador en `http://localhost:8000` o la URL indicada por el servidor local.

### Despliegue en Vercel (Sección 17.3)
1. Conectar la cuenta de GitHub con [Vercel](https://vercel.com).
2. Importar el repositorio `trivia-colombia`.
3. Configuración del proyecto:
   - **Framework Preset:** `Other` (Static HTML)
   - **Build Command:** *(Dejar vacío)*
   - **Output Directory:** `.` (raíz)
4. Presionar **Deploy**. La aplicación quedará disponible con HTTPS y actualización automática en cada commit.

---

## 9. Guion para el Video Explicativo (Sección 17.4)

Duración total máxima: **5:00 minutos**.  
*Requisito obligatorio:* El estudiante debe aparecer en cámara con rostro visible y explicar con su propia voz.

- **0:00 – 0:30 | Presentación:** Presentación personal, estudiante de la Universidad de Santander (UDES), docente Carlos Carrascal, presentación del proyecto Trivia Colombia y objetivos.
- **0:30 – 1:30 | Recorrido por el Diseño:** Mostrar archivo de Figma, guía de estilos (paleta nacional, botones de 44px), wireframes y mockups de escritorio y móvil.
- **1:30 – 2:30 | Demostración en Vivo en Vercel:** Jugar una partida completa, demostrar validación de nombre, responder preguntas, usar comodín 50/50 y tiempo extra, mostrar retroalimentación y guardar en el Ranking Top 10.
- **2:30 – 4:00 | Explicación del Código:** Recorrer la arquitectura modular: banco de 55 preguntas en `preguntas.js`, algoritmo Fisher-Yates y puntuación en `juego.js`, renderizado en `ui.js`, y persistencia con `localStorage` en `almacenamiento.js`.
- **4:00 – 4:30 | Recorrido por GitHub:** Mostrar el repositorio público, estructura de carpetas de la sección 8 y el historial progresivo de commits.
- **4:30 – 5:00 | Dificultades y Conclusiones:** Explicar cómo se resolvió la sincronización del temporizador, la accesibilidad de teclado y balance de preguntas, cerrando con las conclusiones del aprendizaje.

---

## 10. Conclusiones y Mejoras Futuras (Sección 18 & 19)

- El desarrollo de Trivia Colombia consolidó el dominio integral de la arquitectura web frontend nativa, demostrando que mediante buenas prácticas de diseño modular y estándares semánticos es posible construir interfaces de alto rendimiento, accesibles y atractivas sin sobrecargar el proyecto con dependencias externas.
- **Mejoras Futuras Planificadas:**
  - Conectar el juego a una API REST con Node.js / Express y base de datos para ranking global multijugador en tiempo real.
  - Implementar Progressive Web App (PWA) con Service Workers para juego offline instalable en dispositivos móviles.
  - Panel administrativo para que los docentes agreguen nuevas preguntas dinámicamente.
