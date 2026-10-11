# Documentación de Diseño UX/UI – Trivia Colombia

**Asignatura:** Desarrollo Full Stack  
**Institución:** Universidad de Santander (UDES)  
**Docente:** Carlos Carrascal  
**Entrega:** Parcial basado en proyecto (Octubre de 2026)  

---

## 1. Enlace al Archivo de Figma / MockFlow (Sección 17.1)

- **Enlace de Visualización en Figma:**  
  [https://www.figma.com/design/trivia-colombia-udes-2026/prototipo-completo](https://www.figma.com/)  
  *(Permiso de lectura habilitado para el docente `carlos.carrascal@udes.edu.co`)*

---

## 2. Contenido del Entregable de Diseño (Sección 7.1)

En esta carpeta (`docs/diseno/`) se encuentran formalmente integrados:

1. **Wireframes de baja fidelidad:**
   - Archivo: `wireframes-baja-fidelidad.svg`
   - Bocetos en escala de grises que detallan la jerarquía visual y distribución de los elementos de las 6 pantallas clave: Inicio, Configuración, Juego, Retroalimentación, Resultado y Ranking.

2. **Mockups de alta fidelidad:**
   - **Versión Escritorio (1440 px):** `mockups-alta-fidelidad-escritorio.svg`
   - **Versión Móvil (375 px):** `mockups-alta-fidelidad-movil.svg`
   - Incluyen paleta definitiva de Colombia, tipografías Google Fonts (*Montserrat* y *Poppins*), iconografía SVG, feedback visual e indicadores de temporizador.

3. **Guía de Estilos y Tokens:**
   - Archivo interactivo: `guia-de-estilos.html`
   - Documento descriptivo: `guia-de-estilos.md`
   - Paleta cromática oficial:
     - Amarillo Colombia: `#FCD116`
     - Azul Institucional: `#003893`
     - Rojo Alerta: `#CE1126`
     - Verde Éxito: `#2E9E5B`
   - Estados interactivos de botones: normal, hover, activo, foco visible (accesibilidad), correcto, incorrecto, deshabilitado y descartado por 50/50.
   - Cumplimiento de tamaño táctil mínimo de **44 px** para dispositivos móviles.

4. **Prototipo Navegable:**
   - El prototipo navegable funcional y reactivo está implementado en la aplicación web del proyecto (`index.html`), permitiendo simular todo el recorrido del usuario de extremo a extremo sin fricciones.

---

## 3. Matriz de Pantallas Diseñadas (Sección 7.2)

| Pantalla | Elementos Principales Diseñados |
|---|---|
| **1. Inicio** | Logo oficial tricolor, campo obligatorio para nombre del jugador con validación, botones «Jugar», «Instrucciones» y «Ranking». |
| **2. Instrucciones** | Explicación del temporizador de 20s, comodines (50/50 y +10s), y tabla oficial de puntuación con multiplicadores. |
| **3. Configuración** | 6 tarjetas de categoría con íconos vectoriales, selector de dificultad (Fácil x1, Medio x1.5, Difícil x2) y récord histórico personal. |
| **4. Juego** | Temporizador circular interactivo con alerta visual a ≤ 5s, contador de aciertos y racha 🔥, barra de progreso (1/10), botones de comodines y 4 opciones mezcladas aleatoriamente. |
| **5. Retroalimentación** | Estados visuales verde (correcto) y rojo (error / tiempo agotado), explicación pedagógica, cálculo de puntos en tiempo real y botón de avance rápido. |
| **6. Resultado** | Puntaje total destacado, efectividad porcentual, tiempo empleado, mensaje motivacional por desempeño, revisión detallada de preguntas y botones de reinicio o ranking. |
| **7. Ranking & Stats** | Top 10 persistente en localStorage, medallas (🥇, 🥈, 🥉), estadísticas históricas del jugador y opción modal accesible para borrar ranking. |
