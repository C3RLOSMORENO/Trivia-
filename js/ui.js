/**
 * Trivia Colombia - Módulo de Interfaz de Usuario (ui.js)
 * Renderizado de pantallas en el DOM, transiciones accesibles,
 * gestión de focos, animaciones y componentes interactivos.
 */

const UI = {
  // Referencias a contenedores de pantalla
  pantallas: {
    inicio: document.getElementById('pantalla-inicio'),
    instrucciones: document.getElementById('pantalla-instrucciones'),
    configuracion: document.getElementById('pantalla-configuracion'),
    juego: document.getElementById('pantalla-juego'),
    resultado: document.getElementById('pantalla-resultado'),
    ranking: document.getElementById('pantalla-ranking')
  },

  anunciadorAria: document.getElementById('aria-anunciador'),

  /**
   * Cambia la pantalla activa con accesibilidad de foco y anuncios ARIA
   * @param {string} nombrePantalla 'inicio' | 'instrucciones' | 'configuracion' | 'juego' | 'resultado' | 'ranking'
   */
  cambiarPantalla(nombrePantalla) {
    Object.entries(this.pantallas).forEach(([key, elemento]) => {
      if (!elemento) return;
      if (key === nombrePantalla) {
        elemento.classList.add('pantalla--activa');
        elemento.removeAttribute('hidden');

        // Mover foco al encabezado principal o al primer campo interactivo
        const elementoFoco = elemento.querySelector('h1, h2, input, button');
        if (elementoFoco) {
          elementoFoco.setAttribute('tabindex', '-1');
          elementoFoco.focus({ preventScroll: false });
        }
      } else {
        elemento.classList.remove('pantalla--activa');
        elemento.setAttribute('hidden', 'true');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.anunciar(`Pantalla ${nombrePantalla} cargada.`);
  },

  /**
   * Envía un mensaje dinámico al anunciador de lectores de pantalla
   */
  anunciar(mensaje) {
    if (this.anunciadorAria) {
      this.anunciadorAria.textContent = mensaje;
    }
  },

  /**
   * Renderiza la pregunta activa en la pantalla de juego
   * @param {Object} pregunta 
   * @param {number} numeroPregunta (1 a 10)
   * @param {number} totalPreguntas (10)
   * @param {number} puntajeActual
   * @param {number} rachaActual
   */
  mostrarPregunta(pregunta, numeroPregunta, totalPreguntas, puntajeActual, rachaActual) {
    if (!pregunta) return;

    // Actualizar encabezado del juego
    const indNum = document.getElementById('indicador-numero-pregunta');
    if (indNum) indNum.textContent = `${numeroPregunta} / ${totalPreguntas}`;

    const indPts = document.getElementById('indicador-puntaje-actual');
    if (indPts) indPts.textContent = `${puntajeActual} pts`;

    const rachaCont = document.getElementById('racha-contador');
    if (rachaCont) rachaCont.textContent = rachaActual;

    const chipRacha = document.getElementById('chip-racha-actual');
    if (chipRacha) {
      if (rachaActual >= 3) {
        chipRacha.classList.add('racha-ardiente');
      } else {
        chipRacha.classList.remove('racha-ardiente');
      }
    }

    // Efecto Skeleton Shimmer al transicionar de pregunta
    const skeleton = document.getElementById('skeleton-juego');
    const contenedorReactivo = document.getElementById('contenedor-reactivo-activo');
    if (skeleton && contenedorReactivo) {
      skeleton.classList.remove('d-none');
      contenedorReactivo.classList.add('d-none');

      setTimeout(() => {
        skeleton.classList.add('d-none');
        contenedorReactivo.classList.remove('d-none');
        contenedorReactivo.classList.remove('reactivo-activo-fade');
        void contenedorReactivo.offsetWidth; // Forzar reflow para reanimar
        contenedorReactivo.classList.add('reactivo-activo-fade');
      }, 260);
    }

    // Actualizar barra de progreso
    const barraProgreso = document.getElementById('barra-progreso');
    const barraFill = document.getElementById('barra-progreso-fill');
    const porcentajeProgreso = (numeroPregunta / totalPreguntas) * 100;
    if (barraFill) barraFill.style.width = `${porcentajeProgreso}%`;
    if (barraProgreso) barraProgreso.setAttribute('aria-valuenow', Math.round(porcentajeProgreso));

    // Meta badges de categoría y dificultad
    const badgeCat = document.getElementById('badge-pregunta-categoria');
    const badgeDif = document.getElementById('badge-pregunta-dificultad');
    const catData = CATEGORIAS_INFO[pregunta.categoria] || { nombre: pregunta.categoria };
    const difData = DIFICULTADES[pregunta.dificultad] || { nombre: pregunta.dificultad };

    if (badgeCat) badgeCat.textContent = catData.nombre;
    if (badgeDif) badgeDif.textContent = difData.nombre;

    // Enunciado
    const enunciadoElem = document.getElementById('enunciado-pregunta-texto');
    if (enunciadoElem) enunciadoElem.textContent = pregunta.enunciado;

    // Renderizado de imagen ilustrativa del reactivo con atribución legal
    const contenedorImg = document.getElementById('contenedor-pregunta-imagen');
    const imgElem = document.getElementById('pregunta-imagen-elem');
    const fuenteElem = document.getElementById('pregunta-imagen-fuente');

    if (contenedorImg && imgElem) {
      if (pregunta.imagen) {
        imgElem.src = pregunta.imagen;
        imgElem.alt = `Imagen contextual: ${pregunta.enunciado}`;
        if (fuenteElem) {
          fuenteElem.textContent = pregunta.fuenteImagen || 'Wikimedia Commons';
        }
        contenedorImg.classList.remove('d-none');
        imgElem.onerror = () => {
          contenedorImg.classList.add('d-none');
        };
      } else {
        contenedorImg.classList.add('d-none');
        imgElem.src = '';
      }
    }

    // Contenedor de opciones
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    if (!contenedorOpciones) return;
    contenedorOpciones.innerHTML = '';

    const letras = ['A', 'B', 'C', 'D'];

    pregunta.opciones.forEach((opcionTexto, indice) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'opcion-btn';
      boton.id = `opcion-btn-${indice}`;
      boton.dataset.indice = indice;
      boton.setAttribute('aria-label', `Opción ${letras[indice]}: ${opcionTexto}`);
      boton.setAttribute('aria-keyshortcuts', `${indice + 1}`);

      boton.innerHTML = `
        <div class="d-flex align-items-center flex-grow-1">
          <span class="opcion-letra" aria-hidden="true">${letras[indice]}</span>
          <span class="opcion-texto">${opcionTexto}</span>
        </div>
        <kbd class="opcion-atajo-kbd d-none d-sm-inline-block" aria-hidden="true">${indice + 1}</kbd>
      `;

      contenedorOpciones.appendChild(boton);
    });

    // Ocultar caja de retroalimentación previa
    const boxRetro = document.getElementById('box-retroalimentacion');
    if (boxRetro) {
      boxRetro.classList.remove('visible', 'retroalimentacion-box--acierto', 'retroalimentacion-box--error');
    }

    this.anunciar(`Pregunta ${numeroPregunta} de ${totalPreguntas}: ${pregunta.enunciado}`);
  },

  /**
   * Actualiza el reloj del temporizador
   */
  actualizarTemporizador(segundos, porcentaje) {
    const reloj = document.getElementById('reloj-cuenta-regresiva');
    const numero = document.getElementById('tiempo-restante-numero');

    if (numero) numero.textContent = segundos;
    if (reloj) {
      reloj.setAttribute('aria-label', `Segundos restantes: ${segundos}`);
      if (segundos <= 5) {
        reloj.classList.add('peligro');
      } else {
        reloj.classList.remove('peligro');
      }
    }
  },

  /**
   * Muestra la retroalimentación inmediata sobre la pregunta
   * @param {Object} resultado generado por Juego.responder()
   */
  mostrarRetroalimentacion(resultado) {
    if (!resultado) return;

    const contenedorOpciones = document.getElementById('contenedor-opciones');
    if (contenedorOpciones) {
      const botones = contenedorOpciones.querySelectorAll('.opcion-btn');
      botones.forEach(btn => {
        const idx = parseInt(btn.dataset.indice, 10);
        btn.disabled = true; // Bloquear opciones tras responder (RF-07)

        if (idx === resultado.indiceCorrecto) {
          btn.classList.add('correcta');
          btn.setAttribute('aria-label', `${btn.textContent} (Respuesta Correcta)`);
        } else if (idx === resultado.indiceSeleccionado) {
          btn.classList.add('incorrecta');
          btn.setAttribute('aria-label', `${btn.textContent} (Tu selección incorrecta)`);
        }
      });
    }

    // Panel de retroalimentación
    const boxRetro = document.getElementById('box-retroalimentacion');
    const retroTitulo = document.getElementById('retro-titulo-estado');
    const retroPuntos = document.getElementById('retro-puntos-ganados');
    const retroExplicacion = document.getElementById('retro-explicacion-texto');
    const btnSiguiente = document.getElementById('btn-siguiente-pregunta');

    if (!boxRetro) return;

    boxRetro.classList.remove('retroalimentacion-box--acierto', 'retroalimentacion-box--error');

    if (resultado.esCorrecta) {
      boxRetro.classList.add('visible', 'retroalimentacion-box--acierto');
      retroTitulo.className = 'retro-estado retro-estado--acierto';
      retroTitulo.innerHTML = '<i class="bi bi-check-circle-fill me-2" aria-hidden="true"></i> ¡Respuesta Correcta!';
      retroPuntos.textContent = `+${resultado.puntosGanados} pts`;
      if (resultado.bonoRacha > 0) {
        retroPuntos.textContent += ` (+50 pts Bono de Racha 🔥)`;
      }

      // Celebración Confetti sutil
      if (typeof window.confetti === 'function') {
        window.confetti({
          particleCount: resultado.bonoRacha > 0 ? 40 : 20,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      boxRetro.classList.add('visible', 'retroalimentacion-box--error');
      retroTitulo.className = 'retro-estado retro-estado--error';
      retroTitulo.innerHTML = resultado.tiempoAgotado 
        ? '<i class="bi bi-alarm-fill me-2" aria-hidden="true"></i> ¡Tiempo Límite Agotado!' 
        : '<i class="bi bi-x-circle-fill me-2" aria-hidden="true"></i> Respuesta Incorrecta';
      retroPuntos.textContent = '+0 pts';
    }

    retroExplicacion.textContent = resultado.explicacion;

    // Foco directo al botón siguiente para fluidez con teclado
    if (btnSiguiente) {
      btnSiguiente.focus();
    }

    // Anuncio para tecnologías de asistencia
    const estadoTexto = resultado.esCorrecta ? 'Correcto' : (resultado.tiempoAgotado ? 'Tiempo agotado' : 'Incorrecto');
    this.anunciar(`${estadoTexto}. ${resultado.explicacion}. Puntos sumados: ${resultado.puntosGanados}. Presiona Enter para continuar.`);
  },

  /**
   * Aplica el efecto del comodín 50/50 descartando visualmente 2 opciones
   */
  descartarOpciones5050(indicesDescartados) {
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    if (!contenedorOpciones) return;

    indicesDescartados.forEach(idx => {
      const btn = contenedorOpciones.querySelector(`[data-indice="${idx}"]`);
      if (btn) {
        btn.classList.add('descartada-5050');
        btn.disabled = true;
        btn.setAttribute('aria-hidden', 'true');
      }
    });

    this.anunciar('Comodín 50/50 aplicado: se eliminaron dos respuestas incorrectas. Penalización de 30 puntos aplicada.');
  },

  /**
   * Actualiza el estado visual de los botones de comodín
   */
  actualizarComodines(comodinesEstado) {
    const btn5050 = document.getElementById('btn-comodin-5050');
    const btnTiempo = document.getElementById('btn-comodin-tiempo');

    if (btn5050) {
      btn5050.disabled = !comodinesEstado.cincuenta;
      if (!comodinesEstado.cincuenta) {
        btn5050.setAttribute('title', 'Comodín 50/50 ya utilizado');
      }
    }

    if (btnTiempo) {
      btnTiempo.disabled = !comodinesEstado.tiempo;
      if (!comodinesEstado.tiempo) {
        btnTiempo.setAttribute('title', 'Comodín de tiempo ya utilizado');
      }
    }
  },

  /**
   * Renderiza el resumen y las estadísticas de la partida en la pantalla de resultado
   * @param {Object} resumen 
   */
  mostrarResultado(resumen) {
    if (!resumen) return;

    document.getElementById('resultado-nombre-jugador').textContent = resumen.jugador;
    document.getElementById('resultado-puntaje-final').textContent = resumen.puntaje;
    document.getElementById('resultado-mensaje-motivo').textContent = resumen.mensaje;
    document.getElementById('resultado-icono-emoji').textContent = resumen.emoji;

    document.getElementById('resumen-aciertos-conteo').textContent = `${resumen.aciertos} / ${resumen.totalPreguntas}`;
    document.getElementById('resumen-efectividad-porcentaje').textContent = `${resumen.porcentajeAciertos}%`;
    document.getElementById('resumen-mejor-racha').textContent = `🔥 ${resumen.mejorRacha}`;
    document.getElementById('resumen-tiempo-total').textContent = `${resumen.tiempoTotalSeg}s`;

    // Renderizar desglose y revisión de preguntas
    const contenedorRevision = document.getElementById('contenedor-revision-preguntas');
    if (contenedorRevision && Array.isArray(resumen.historialRespuestas)) {
      contenedorRevision.innerHTML = '';

      resumen.historialRespuestas.forEach(item => {
        const card = document.createElement('article');
        card.className = `revision-item ${item.esCorrecta ? 'acierto' : 'error'}`;

        const icono = item.esCorrecta 
          ? '<i class="bi bi-check-circle-fill text-success me-1" aria-hidden="true"></i>' 
          : '<i class="bi bi-x-circle-fill text-danger me-1" aria-hidden="true"></i>';

        const thumbHTML = item.imagen ? `
          <div class="revision-img-thumb me-3 flex-shrink-0 rounded-2 overflow-hidden border d-none d-sm-block">
            <img src="${item.imagen}" alt="" class="w-100 h-100 object-fit-cover" loading="lazy" onerror="this.parentElement.remove()">
          </div>
        ` : '';

        card.innerHTML = `
          ${thumbHTML}
          <div class="flex-grow-1">
            <div class="revision-pregunta">
              ${icono} Reactivo #${item.numero}: ${item.pregunta}
            </div>
            <div class="revision-detalle">
              <p><strong>Tu respuesta:</strong> ${item.opcionSeleccionadaTexto}</p>
              ${!item.esCorrecta ? `<p><strong>Respuesta correcta:</strong> ${item.opcionCorrectaTexto}</p>` : ''}
              <p class="mt-1 text-secondary"><em>Justificación pedagógica: ${item.explicacion}</em></p>
              ${item.fuenteImagen ? `<p class="mt-1 text-muted small" style="font-size: 0.72rem;"><i class="bi bi-camera me-1"></i>${item.fuenteImagen}</p>` : ''}
            </div>
          </div>
        `;
        contenedorRevision.appendChild(card);
      });
    }

    // Celebración con Confetti al finalizar con buen resultado
    if (typeof window.confetti === 'function' && resumen.porcentajeAciertos >= 60) {
      setTimeout(() => {
        window.confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.55 }
        });
      }, 300);
    }

    this.cambiarPantalla('resultado');
  },

  /**
   * Renderiza la tabla de Top 10 en la pantalla de Ranking
   * @param {Array} ranking 
   */
  renderizarRanking(ranking) {
    const tbody = document.getElementById('ranking-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!ranking || ranking.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            Aún no hay puntuaciones registradas. ¡Sé el primero en jugar y entrar al Top 10!
          </td>
        </tr>
      `;
      return;
    }

    const medallas = ['🥇', '🥈', '🥉'];

    ranking.forEach((partida, index) => {
      const fila = document.createElement('tr');
      const badgeClase = index < 3 ? `posicion-badge--${index + 1}` : '';
      const posicionVisual = index < 3 ? medallas[index] : `${index + 1}º`;

      const catTexto = CATEGORIAS_INFO[partida.categoria]?.nombre || partida.categoria;
      const difTexto = DIFICULTADES[partida.dificultad]?.nombre || partida.dificultad;

      fila.innerHTML = `
        <td class="ps-3"><span class="posicion-badge ${badgeClase}">${posicionVisual}</span></td>
        <td><strong>${this.escaparHTML(partida.nombre)}</strong></td>
        <td><strong class="text-primary">${partida.puntaje} pts</strong></td>
        <td>${partida.aciertos || 0} / ${partida.totalPreguntas || 10}</td>
        <td class="d-none d-md-table-cell col-oculta-movil">${catTexto}</td>
        <td class="d-none d-md-table-cell col-oculta-movil">${difTexto}</td>
        <td class="d-none d-lg-table-cell col-oculta-movil pe-3 text-secondary" style="font-size: 0.8rem;">${partida.fecha || '-'}</td>
      `;

      tbody.appendChild(fila);
    });
  },

  /**
   * Renderiza las estadísticas acumuladas del jugador
   * @param {Object} stats 
   */
  renderizarEstadisticas(stats) {
    if (!stats) return;

    document.getElementById('stats-partidas-jugadas').textContent = stats.partidasJugadas || 0;
    document.getElementById('stats-mejor-puntaje').textContent = `${stats.mejorPuntaje || 0} pts`;
    document.getElementById('stats-mejor-racha').textContent = `🔥 ${stats.rachaHistorica || 0}`;

    const porcentajeGlobal = stats.preguntasRespondidas > 0 
      ? Math.round((stats.aciertosTotales / stats.preguntasRespondidas) * 100) 
      : 0;
    document.getElementById('stats-porcentaje-aciertos').textContent = `${porcentajeGlobal}%`;

    // Desglose por categoría
    const contenedorCat = document.getElementById('contenedor-stats-categorias');
    if (!contenedorCat) return;
    contenedorCat.innerHTML = '';

    const categorias = ['geografia', 'historia', 'cultura', 'deportes', 'naturaleza'];

    categorias.forEach(catKey => {
      const data = stats.porCategoria?.[catKey] || { aciertos: 0, total: 0 };
      const nombreCat = CATEGORIAS_INFO[catKey]?.nombre || catKey;
      const porc = data.total > 0 ? Math.round((data.aciertos / data.total) * 100) : 0;

      const fila = document.createElement('div');
      fila.className = 'cat-stat-fila';
      fila.innerHTML = `
        <div class="cat-stat-info">
          <span>${CATEGORIAS_INFO[catKey]?.icono || '📌'} ${nombreCat}</span>
          <span>${data.aciertos} de ${data.total} (${porc}%)</span>
        </div>
        <div class="cat-stat-barra">
          <div class="cat-stat-fill" style="width: ${porc}%;"></div>
        </div>
      `;
      contenedorCat.appendChild(fila);
    });
  },

  /**
   * Actualiza el récord visible en la pantalla de configuración
   */
  actualizarRecordPreview(puntaje) {
    const texto = document.getElementById('texto-record-puntaje');
    if (texto) {
      texto.textContent = `${puntaje} pts`;
    }
  },

  /**
   * Muestra un toast de notificación flotante accesible
   */
  mostrarToast(mensaje, icono = 'bi-info-circle-fill') {
    const toastElem = document.getElementById('toast-notificacion');
    const textoElem = document.getElementById('toast-notificacion-texto');
    if (!toastElem || !textoElem) return;

    textoElem.innerHTML = `<i class="bi ${icono} text-primary me-2" aria-hidden="true"></i> ${mensaje}`;

    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
      const toast = new bootstrap.Toast(toastElem, { delay: 3500 });
      toast.show();
    }
  },

  /**
   * Escapa caracteres para prevenir inyecciones XSS
   */
  escaparHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UI };
}
