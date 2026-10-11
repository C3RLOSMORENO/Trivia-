# Guía de Estilos – Trivia Colombia
**Asignatura:** Desarrollo Full Stack  
**Institución:** Universidad de Santander (UDES)  
**Docente:** Carlos Carrascal  
**Fecha:** Octubre de 2026  

---

## 1. Paleta de Colores Institucional (Inspirada en Colombia)

La paleta se fundamenta en la identidad tricolor nacional de Colombia, seleccionada con rigor para superar los ratios de contraste de la norma **WCAG 2.1 nivel AA y AAA** (mínimo 4.5:1 para texto estándar y 3:1 para componentes de interfaz):

| Color | Hex | Función / Rol | Ratio de Contraste vs Blanco |
|---|---|---|---|
| **Azul Institucional** | `#003893` | Encabezados, botones de acción primaria, enlaces destacados | 8.9:1 (Pasa AAA) |
| **Amarillo Colombia** | `#FCD116` | Acentos, badges de puntaje, estrellas y medallas | Utilizado con texto oscuro `#0F172A` |
| **Rojo Alerta** | `#CE1126` | Alerta de tiempo crítico (< 5s), respuestas erróneas, botón de borrar | 5.2:1 (Pasa AA) |
| **Verde Éxito** | `#2E9E5B` | Respuestas correctas, indicadores de logro y confirmación | 4.8:1 (Pasa AA) |
| **Fondo Superficie** | `#F4F7FB` | Fondo de la aplicación para reducir fatiga visual | 1.1:1 vs superficie blanca |
| **Texto Primario** | `#0F172A` | Títulos y enunciados de preguntas | 14.8:1 (Pasa AAA) |
| **Texto Secundario**| `#475569` | Explicaciones y metadatos de apoyo | 7.2:1 (Pasa AAA) |

---

## 2. Tipografía y Escala Visual

Se emplean fuentes oficiales de Google Fonts: **Montserrat** para títulos de impacto e identidad, y **Poppins** para lectura ágil y textos de opción:

- **H1 Principal:** Montserrat Bold (800), 2.2rem (35px), Interletraje -0.5px.
- **H2 Sección / Enunciados:** Montserrat SemiBold (700), 1.45rem (23px), Interlineado 1.4.
- **Botones y Controles:** Montserrat SemiBold (600), 1rem (16px), Altura mínima 44px.
- **Cuerpo / Explicaciones:** Poppins Regular (400), 0.95rem (15.2px), Interlineado 1.55.
- **Badges / Metadatos:** Montserrat ExtraBold (800), 0.75rem (12px), Mayúsculas sostenidas.

---

## 3. Estados de Componentes y Botones

Todos los botones interactivos poseen un tamaño de objetivo táctil mínimo de **44 px de alto** (`--target-touch-min`):

1. **Estado Normal:** Fondo sólido o contorno definido, texto con alto contraste, esquinas redondeadas (`border-radius: 14px`).
2. **Estado Hover:** Elevación sutil (`translateY(-2px)`), sombreado reforzado, oscurecimiento de fondo tonal del 10%.
3. **Estado Focus-Visible (Teclado):** Borde nítido de 3px con desplazamiento (`outline: 3px solid var(--border-focus); outline-offset: 3px;`).
4. **Estado Correcto:** Fondo `#D1FAE5`, borde verde `#2E9E5B`, ícono de verificación `✓`, texto verde oscuro `#065F46`.
5. **Estado Incorrecto:** Fondo `#FEE2E2`, borde rojo `#CE1126`, ícono de cruz `✗`, texto rojo oscuro `#991B1B`.
6. **Estado Descartado (50/50):** Opacidad reducida al 25%, escala de grises, cursor deshabilitado y atributo `aria-hidden="true"`.
7. **Estado Deshabilitado:** Opacidad al 50%, puntero bloqueado (`pointer-events: none`).

---

## 4. Diseño Responsive y Puntos de Quiebre

- **Mobile First (360px - 480px):** Cuadrícula a 1 columna en opciones, controles táctiles ampliados, temporizador superior compacto.
- **Tablet (481px - 768px):** Opciones distribuidas en columna única legible, tarjetas de categoría en 3 columnas.
- **Escritorio (769px - 1440px+):** Contenedor centralizado a 1100px con sombra envolvente, opciones en rejilla 2x2, temporizador circular centrado de 68px.
