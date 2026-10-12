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

    // Actualizar stepper interactivo de reactivos
    this.renderizarStepper(numeroPregunta, totalPreguntas, Juego.estado ? Juego.estado.historialRespuestas : []);

    this.anunciar(`Pregunta ${numeroPregunta} de ${totalPreguntas}: ${pregunta.enunciado}`);
  },

  /**
   * Renderiza el stepper de 10 reactivos interactivos de la ronda
   */
  renderizarStepper(numeroActual, total = 10, historial = []) {
    const container = document.getElementById('stepper-reactivos');
    const textoConteo = document.getElementById('stepper-conteo-texto');

    if (textoConteo) {
      textoConteo.textContent = `Reactivo ${numeroActual} de ${total}`;
    }

    if (!container) return;
    container.innerHTML = '';

    for (let i = 1; i <= total; i++) {
      const pill = document.createElement('div');
      pill.className = 'stepper-pill';
      pill.dataset.numero = i;

      const respuestaPrevia = Array.isArray(historial) ? historial.find(h => h.numero === i) : null;

      if (i === numeroActual) {
        pill.classList.add('activo');
        pill.innerHTML = `<span>${i}</span>`;
        pill.setAttribute('title', `Reactivo ${i} (En curso)`);
      } else if (respuestaPrevia) {
        if (respuestaPrevia.esCorrecta) {
          pill.classList.add('acierto');
          pill.innerHTML = '<i class="bi bi-check-lg" aria-hidden="true"></i>';
          pill.setAttribute('title', `Reactivo ${i}: Acertado`);
        } else {
          pill.classList.add('error');
          pill.innerHTML = '<i class="bi bi-x-lg" aria-hidden="true"></i>';
          pill.setAttribute('title', `Reactivo ${i}: Incorrecto`);
        }
      } else {
        pill.classList.add('pendiente');
        pill.innerHTML = `<span>${i}</span>`;
        pill.setAttribute('title', `Reactivo ${i} (Pendiente)`);
      }

      container.appendChild(pill);
    }
  },

  /**
   * Actualiza el reloj del temporizador radial circular SVG
   */
  actualizarTemporizador(segundos, porcentaje) {
    const reloj = document.getElementById('reloj-cuenta-regresiva');
    const numero = document.getElementById('tiempo-restante-numero');
    const radialProgress = document.getElementById('radial-timer-progress');

    if (numero) numero.textContent = segundos;

    // Animar anillo circular SVG radial (circunferencia r=28 es 175.93)
    if (radialProgress) {
      const perimetro = 175.93;
      const offset = perimetro - (perimetro * (porcentaje / 100));
      radialProgress.style.strokeDashoffset = `${offset}`;

      radialProgress.classList.remove('alerta-media', 'alerta-peligro');
      if (segundos <= 4) {
        radialProgress.classList.add('alerta-peligro');
      } else if (segundos <= 8) {
        radialProgress.classList.add('alerta-media');
      }
    }

    if (reloj) {
      reloj.setAttribute('aria-label', `Segundos restantes: ${segundos}`);
      if (segundos <= 4) {
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

    // Actualizar píldora del stepper en tiempo real
    if (Juego.estado) {
      const pillActual = document.querySelector(`.stepper-pill[data-numero="${Juego.estado.indiceActual + 1}"]`);
      if (pillActual) {
        pillActual.classList.remove('activo');
        if (resultado.esCorrecta) {
          pillActual.classList.add('acierto');
          pillActual.innerHTML = '<i class="bi bi-check-lg" aria-hidden="true"></i>';
        } else {
          pillActual.classList.add('error');
          pillActual.innerHTML = '<i class="bi bi-x-lg" aria-hidden="true"></i>';
        }
      }
    }

    const contenedorOpciones = document.getElementById('contenedor-opciones');
    if (contenedorOpciones) {
      const botones = contenedorOpciones.querySelectorAll('.opcion-btn');
      botones.forEach(btn => {
        const idx = parseInt(btn.dataset.indice, 10);
        btn.disabled = true; // Bloquear opciones tras responder (RF-07)

        const badgePrevio = btn.querySelector('.opcion-estado-badge');
        if (badgePrevio) badgePrevio.remove();

        if (idx === resultado.indiceCorrecto) {
          btn.classList.add('correcta');
          btn.setAttribute('aria-label', `${btn.textContent} (Respuesta Correcta)`);
          const badge = document.createElement('span');
          badge.className = 'badge text-bg-success ms-2 opcion-estado-badge d-inline-flex align-items-center gap-1 shadow-2xs';
          badge.innerHTML = '<i class="bi bi-check-circle-fill" aria-hidden="true"></i> Correcta';
          btn.appendChild(badge);
        } else if (idx === resultado.indiceSeleccionado) {
          btn.classList.add('incorrecta');
          btn.setAttribute('aria-label', `${btn.textContent} (Tu selección incorrecta)`);
          const badge = document.createElement('span');
          badge.className = 'badge text-bg-danger ms-2 opcion-estado-badge d-inline-flex align-items-center gap-1 shadow-2xs';
          badge.innerHTML = '<i class="bi bi-x-circle-fill" aria-hidden="true"></i> Tu selección';
          btn.appendChild(badge);
        } else {
          btn.classList.add('atenuada');
        }
      });
    }

    // Panel de retroalimentación
    const boxRetro = document.getElementById('box-retroalimentacion');
    const retroTitulo = document.getElementById('retro-titulo-estado');
    const retroIcono = document.getElementById('retro-icono-estado');
    const retroPuntos = document.getElementById('retro-puntos-ganados');
    const retroExplicacion = document.getElementById('retro-explicacion-texto');
    const retroFuente = document.getElementById('retro-fuente-credito');
    const retroFuenteTexto = document.getElementById('retro-fuente-credito-texto');
    const btnSiguiente = document.getElementById('btn-siguiente-pregunta');
    const desglosePuntos = document.getElementById('retro-desglose-puntos');
    const badgeBonoTiempo = document.getElementById('badge-bono-tiempo');
    const badgeBonoRacha = document.getElementById('badge-bono-racha');
    const badgeMultiplicador = document.getElementById('badge-multiplicador');
    const comparativaRespuestas = document.getElementById('retro-comparativa-respuestas');
    const tuSeleccionSpan = document.querySelector('#retro-tu-seleccion span');
    const respuestaCorrectaSpan = document.querySelector('#retro-respuesta-correcta span');

    if (!boxRetro) return;

    boxRetro.classList.remove('d-none', 'visible', 'retroalimentacion-box--acierto', 'retroalimentacion-box--error');
    boxRetro.classList.add('visible');

    if (resultado.esCorrecta) {
      boxRetro.classList.add('retroalimentacion-box--acierto');
      if (retroIcono) retroIcono.innerHTML = '<i class="bi bi-check-circle-fill text-success" aria-hidden="true"></i>';
      if (retroTitulo) {
        retroTitulo.className = 'retro-estado text-success fw-bold h5 mb-0';
        if (resultado.rachaActual >= 3) {
          retroTitulo.innerHTML = `¡Racha Imparable! 🔥 <span class="badge text-bg-warning text-dark ms-1">${resultado.rachaActual} aciertos seguidos</span>`;
        } else if (resultado.tiempoSobrante >= 15) {
          retroTitulo.textContent = '¡Extraordinaria Rapidez y Precisión! ⚡';
        } else {
          retroTitulo.textContent = '¡Excelente! Respuesta Correcta';
        }
      }
      if (retroPuntos) {
        retroPuntos.className = 'badge text-bg-success border fs-6 fw-bold shadow-2xs';
        retroPuntos.textContent = `+${resultado.puntosGanados} pts`;
      }

      // Desglose de puntuación visible
      if (desglosePuntos) {
        desglosePuntos.classList.remove('d-none');
        if (badgeBonoTiempo) badgeBonoTiempo.textContent = `+${resultado.bonoTiempo || 0} pts rapidez (${resultado.tiempoSobrante || 0}s)`;
        if (badgeBonoRacha) {
          if (resultado.bonoRacha > 0) {
            badgeBonoRacha.classList.remove('d-none');
          } else {
            badgeBonoRacha.classList.add('d-none');
          }
        }
        if (badgeMultiplicador) {
          badgeMultiplicador.textContent = `Factor de dificultad: x${resultado.multiplicador || 1.0}`;
        }
      }

      if (comparativaRespuestas) comparativaRespuestas.classList.add('d-none');

      // Celebración Confetti sutil tricolor colombiano
      if (typeof window.confetti === 'function') {
        window.confetti({
          particleCount: resultado.bonoRacha > 0 ? 45 : 24,
          spread: 65,
          origin: { y: 0.7 },
          colors: ['#FCD116', '#003893', '#CE1126']
        });
      }
    } else {
      boxRetro.classList.add('retroalimentacion-box--error');
      if (retroIcono) {
        retroIcono.innerHTML = resultado.tiempoAgotado 
          ? '<i class="bi bi-alarm-fill text-warning" aria-hidden="true"></i>' 
          : '<i class="bi bi-x-circle-fill text-danger" aria-hidden="true"></i>';
      }
      if (retroTitulo) {
        retroTitulo.className = resultado.tiempoAgotado ? 'retro-estado text-warning-emphasis fw-bold h5 mb-0' : 'retro-estado text-danger fw-bold h5 mb-0';
        retroTitulo.textContent = resultado.tiempoAgotado 
          ? 'Tiempo Límite Agotado (20 segundos)' 
          : 'Respuesta Incorrecta — Refuerzo Pedagógico';
      }
      if (retroPuntos) {
        retroPuntos.className = 'badge text-bg-secondary border fs-6 fw-bold shadow-2xs';
        retroPuntos.textContent = '+0 pts';
      }

      if (desglosePuntos) desglosePuntos.classList.add('d-none');

      // Comparativa de respuestas para aprendizaje correctivo
      if (comparativaRespuestas) {
        comparativaRespuestas.classList.remove('d-none');
        if (tuSeleccionSpan) tuSeleccionSpan.textContent = resultado.opcionSeleccionadaTexto;
        if (respuestaCorrectaSpan) respuestaCorrectaSpan.textContent = resultado.opcionCorrectaTexto;
      }
    }

    if (retroExplicacion) retroExplicacion.textContent = resultado.explicacion;

    // Mostrar crédito de imagen/documento en el panel pedagógico
    if (retroFuente && retroFuenteTexto) {
      if (resultado.fuenteImagen) {
        retroFuenteTexto.textContent = resultado.fuenteImagen;
        retroFuente.classList.remove('d-none');
      } else {
        retroFuente.classList.add('d-none');
      }
    }

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
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-1">
              <div class="revision-pregunta mb-0">
                ${icono} Reactivo #${item.numero}: ${item.pregunta}
              </div>
              <span class="badge ${item.esCorrecta ? 'text-bg-success' : 'text-bg-secondary'} small">
                ${item.esCorrecta ? `+${item.puntosGanados || 0} pts` : '0 pts'}
              </span>
            </div>
            <div class="revision-detalle mt-2">
              <div class="d-flex flex-column gap-1">
                <div class="small ${item.esCorrecta ? 'text-success fw-semibold' : 'text-danger fw-semibold'}">
                  <i class="bi ${item.esCorrecta ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-1"></i>
                  <strong>Tu respuesta:</strong> ${item.opcionSeleccionadaTexto}
                </div>
                ${!item.esCorrecta ? `
                  <div class="small text-success fw-semibold">
                    <i class="bi bi-check-circle-fill me-1"></i>
                    <strong>Respuesta oficial correcta:</strong> ${item.opcionCorrectaTexto}
                  </div>
                ` : ''}
              </div>
              <div class="p-2 rounded-2 bg-body-tertiary border mt-2 small text-secondary">
                <i class="bi bi-mortarboard-fill text-primary me-1" aria-hidden="true"></i>
                <strong>Justificación pedagógica:</strong> ${item.explicacion}
              </div>
              ${item.fuenteImagen ? `<div class="mt-1 text-muted small" style="font-size: 0.74rem;"><i class="bi bi-camera me-1"></i>Crédito de imagen: ${item.fuenteImagen}</div>` : ''}
            </div>
          </div>
        `;
        contenedorRevision.appendChild(card);
      });
    }

    // Fecha en membrete imprimible
    const fechaElem = document.getElementById('print-fecha-emision');
    if (fechaElem) {
      const hoy = new Date();
      fechaElem.textContent = `Fecha de evaluación: ${hoy.toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}`;
    }

    // Renderizar Diagnóstico de Competencias por Área Evaluada
    const areasGrid = document.getElementById('diagnostico-areas-grid');
    const recomendacionTexto = document.getElementById('diagnostico-recomendacion-texto');
    
    if (areasGrid && Array.isArray(resumen.historialRespuestas)) {
      areasGrid.innerHTML = '';

      const statsPartida = {};
      resumen.historialRespuestas.forEach(item => {
        const cat = item.categoria || 'general';
        if (!statsPartida[cat]) {
          statsPartida[cat] = { aciertos: 0, total: 0 };
        }
        statsPartida[cat].total += 1;
        if (item.esCorrecta) {
          statsPartida[cat].aciertos += 1;
        }
      });

      let peorCategoria = null;
      let menorPorcentaje = 101;

      Object.entries(statsPartida).forEach(([catKey, data]) => {
        const catInfo = CATEGORIAS_INFO[catKey] || { nombre: catKey, icono: '📌' };
        const porcentaje = Math.round((data.aciertos / data.total) * 100);

        if (porcentaje < menorPorcentaje) {
          menorPorcentaje = porcentaje;
          peorCategoria = catKey;
        }

        let badgeClass = 'text-bg-success';
        let nivelTexto = 'Dominio Excelente';
        if (porcentaje < 50) {
          badgeClass = 'text-bg-danger';
          nivelTexto = 'Requiere Refuerzo';
        } else if (porcentaje < 80) {
          badgeClass = 'text-bg-warning';
          nivelTexto = 'Nivel Aceptable';
        }

        const colorBar = porcentaje >= 80 ? 'bg-success' : (porcentaje >= 50 ? 'bg-warning' : 'bg-danger');

        const itemArea = document.createElement('div');
        itemArea.className = 'p-3 rounded-3 bg-body border d-flex flex-column gap-2';
        itemArea.innerHTML = `
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div class="d-flex align-items-center gap-2">
              <span class="fs-5" aria-hidden="true">${catInfo.icono || '📌'}</span>
              <span class="fw-bold small text-body">${catInfo.nombre}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span class="small text-secondary fw-semibold">${data.aciertos} de ${data.total} (${porcentaje}%)</span>
              <span class="badge ${badgeClass} small">${nivelTexto}</span>
            </div>
          </div>
          <div class="progress" style="height: 6px;" role="progressbar" aria-valuenow="${porcentaje}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar ${colorBar}" style="width: ${porcentaje}%"></div>
          </div>
        `;
        areasGrid.appendChild(itemArea);
      });

      const recomendacionesMap = {
        geografia: 'Se sugiere profundizar en la delimitación de departamentos, accidentes geográficos de las cordilleras y la ubicación de las regiones naturales.',
        historia: 'Es recomendable repasar los hitos de la Campaña Libertadora de 1819, las figuras próceres y los acontecimientos sociopolíticos del siglo XX.',
        cultura: 'Se sugiere revisar el folclor tradicional de las regiones colombianas, gastronomía autóctona y celebraciones declaradas Patrimonio de la Humanidad.',
        deportes: 'Se aconseja repasar las hazañas del ciclismo nacional en Europa, campeones olímpicos y los máximos logros del fútbol colombiano.',
        naturaleza: 'Es recomendable afianzar conceptos sobre los pisos térmicos, páramos de alta montaña (frailejones) y especies endémicas de la fauna colombiana.'
      };

      if (recomendacionTexto) {
        if (menorPorcentaje === 100) {
          recomendacionTexto.textContent = '¡Felicitaciones! Has demostrado un dominio sobresaliente y equilibrado en todas las áreas evaluadas en esta sesión.';
        } else if (peorCategoria && recomendacionesMap[peorCategoria]) {
          recomendacionTexto.textContent = `${recomendacionesMap[peorCategoria]}`;
        } else {
          recomendacionTexto.textContent = 'Repasa las preguntas falladas en la auditoría inferior para consolidar tus conocimientos.';
        }
      }
    }

    // Configurar filtros interactivos de auditoría de preguntas
    const btnFiltroTodos = document.getElementById('btn-filtro-todos');
    const btnFiltroAciertos = document.getElementById('btn-filtro-aciertos');
    const btnFiltroErrores = document.getElementById('btn-filtro-errores');
    const conteoAciertos = document.getElementById('conteo-filtro-aciertos');
    const conteoErrores = document.getElementById('conteo-filtro-errores');

    if (conteoAciertos) conteoAciertos.textContent = resumen.aciertos;
    if (conteoErrores) conteoErrores.textContent = resumen.errores;
    if (btnFiltroTodos) btnFiltroTodos.textContent = `Todos (${resumen.totalPreguntas})`;

    const aplicarFiltro = (filtro) => {
      [btnFiltroTodos, btnFiltroAciertos, btnFiltroErrores].forEach(btn => {
        if (btn) btn.classList.remove('active');
      });

      const cards = contenedorRevision.querySelectorAll('.revision-item');
      cards.forEach(card => {
        if (filtro === 'todos') {
          card.classList.remove('d-none');
        } else if (filtro === 'aciertos') {
          card.classList.toggle('d-none', !card.classList.contains('acierto'));
        } else if (filtro === 'errores') {
          card.classList.toggle('d-none', !card.classList.contains('error'));
        }
      });
    };

    if (btnFiltroTodos) {
      btnFiltroTodos.onclick = () => {
        btnFiltroTodos.classList.add('active');
        aplicarFiltro('todos');
      };
    }
    if (btnFiltroAciertos) {
      btnFiltroAciertos.onclick = () => {
        btnFiltroAciertos.classList.add('active');
        aplicarFiltro('aciertos');
      };
    }
    if (btnFiltroErrores) {
      btnFiltroErrores.onclick = () => {
        btnFiltroErrores.classList.add('active');
        aplicarFiltro('errores');
      };
    }

    // Renderizar Insignias de Logro de la Sesión (Gamificación)
    const gridInsignias = document.getElementById('grid-insignias-logro');
    const contadorInsignias = document.getElementById('contador-insignias-obtenidas');

    if (gridInsignias) {
      gridInsignias.innerHTML = '';

      const sinComodines = Juego.estado ? (Juego.estado.comodines.cincuenta && Juego.estado.comodines.tiempo) : false;
      const tiempoPromedio = resumen.totalPreguntas > 0 ? Math.round(resumen.tiempoTotalSeg / resumen.totalPreguntas) : 0;

      const catalogoInsignias = [
        {
          id: 'precision',
          nombre: 'Precisión Impecable',
          descripcion: 'Alcanzaste 80% o más de aciertos en la evaluación.',
          icono: '🎯',
          desbloqueada: resumen.porcentajeAciertos >= 80
        },
        {
          id: 'racha',
          nombre: 'Racha Libertadora',
          descripcion: 'Encadenaste una racha de 3 o más aciertos consecutivos.',
          icono: '🔥',
          desbloqueada: resumen.mejorRacha >= 3
        },
        {
          id: 'rapidez',
          nombre: 'Reflejos de Cóndor',
          descripcion: 'Respondiste con gran agilidad (promedio menor a 8 segundos).',
          icono: '⚡',
          desbloqueada: tiempoPromedio <= 8
        },
        {
          id: 'estrategia',
          nombre: 'Estratega Puro',
          descripcion: 'Completaste la partida sin apoyarte en comodines de ayuda.',
          icono: '🛡️',
          desbloqueada: sinComodines
        },
        {
          id: 'colombia',
          nombre: 'Orgullo Nacional',
          descripcion: 'Completaste satisfactoriamente los 10 reactivos patrios.',
          icono: '🇨🇴',
          desbloqueada: resumen.aciertos >= 5
        }
      ];

      let totalDesbloqueadas = 0;

      catalogoInsignias.forEach(ins => {
        if (ins.desbloqueada) totalDesbloqueadas += 1;

        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';
        col.innerHTML = `
          <div class="insignia-card ${ins.desbloqueada ? 'desbloqueada' : 'bloqueada'}">
            <div class="insignia-icono-box" aria-hidden="true">
              ${ins.icono}
            </div>
            <div class="flex-grow-1">
              <div class="d-flex align-items-center justify-content-between gap-1">
                <span class="fw-bold small text-body">${ins.nombre}</span>
                <span class="badge ${ins.desbloqueada ? 'text-bg-warning text-dark' : 'text-bg-secondary'} small" style="font-size: 0.68rem;">
                  ${ins.desbloqueada ? '<i class="bi bi-unlock-fill me-1"></i>Conseguida' : '<i class="bi bi-lock-fill me-1"></i>Bloqueada'}
                </span>
              </div>
              <p class="text-secondary small mb-0" style="font-size: 0.8rem;">${ins.descripcion}</p>
            </div>
          </div>
        `;
        gridInsignias.appendChild(col);
      });

      if (contadorInsignias) {
        contadorInsignias.textContent = `${totalDesbloqueadas} de ${catalogoInsignias.length} desbloqueadas`;
      }
    }

    // Celebración con Confetti Tricolor al finalizar con buen resultado
    if (typeof window.confetti === 'function' && resumen.porcentajeAciertos >= 60) {
      setTimeout(() => {
        window.confetti({
          particleCount: 95,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#FCD116', '#003893', '#CE1126']
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
