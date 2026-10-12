/**
 * Trivia Colombia - Punto de Entrada y Coordinador General (app.js)
 * Conecta los módulos Juego, UI y Almacenamiento, gestiona atajos de teclado,
 * sintetizador de audio (Web Audio API), preferencias y accesibilidad.
 */

// ============================================================================
// MÓDULO DE SONIDOS Y EFECTOS AUDITIVOS (Web Audio API)
// ============================================================================
const GestorSonido = {
  activo: true,
  audioContext: null,

  inicializar() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    } catch (e) {
      console.warn('Web Audio API no soportado en este entorno:', e);
    }
  },

  resumirContexto() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  },

  reproducirAcierto() {
    if (!this.activo) return;
    this.inicializar();
    this.resumirContexto();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      // Arpegio mayor ascendente: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz) -> C6 (1046Hz)
      const notas = [523.25, 659.25, 783.99, 1046.50];
      notas.forEach((freq, idx) => {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.22);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch (e) {
      console.warn('Error al reproducir sonido de acierto:', e);
    }
  },

  reproducirError() {
    if (!this.activo) return;
    this.inicializar();
    this.resumirContexto();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    } catch (e) {
      console.warn('Error al reproducir sonido de error:', e);
    }
  },

  reproducirComodin() {
    if (!this.activo) return;
    this.inicializar();
    this.resumirContexto();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.3);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) {
      console.warn('Error al reproducir sonido de comodín:', e);
    }
  },

  reproducirAlertaTiempo() {
    if (!this.activo) return;
    this.inicializar();
    this.resumirContexto();
    if (!this.audioContext) return;

    try {
      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      // Ignorar
    }
  }
};

// ============================================================================
// CONTROLADOR PRINCIPAL DE LA APLICACIÓN
// ============================================================================
const App = {
  // Estado de configuración de la partida en proceso de armado
  configPartida: {
    nombreJugador: '',
    categoria: 'todas',
    dificultad: 'medio'
  },

  iniciar() {
    this.cargarPreferencias();
    this.conectarCallbacksJuego();
    this.registrarEventosUI();
    this.registrarAtajosTeclado();

    // Precargar último nombre jugado si existe
    const ultimoNombre = Almacenamiento.obtenerUltimoJugador();
    const inputNombre = document.getElementById('input-nombre-jugador');
    if (ultimoNombre && inputNombre) {
      inputNombre.value = ultimoNombre;
      this.configPartida.nombreJugador = ultimoNombre;
    }

    // Pantalla inicial por defecto
    UI.cambiarPantalla('inicio');
  },

  /**
   * Carga configuración de usuario (Tema, Sonido, Contraste)
   */
  cargarPreferencias() {
    const config = Almacenamiento.obtenerConfiguracion();

    // Sonido
    GestorSonido.activo = config.sonido !== false;
    const btnSonido = document.getElementById('btn-toggle-sonido');
    const iconoSonido = document.getElementById('icono-sonido');
    if (btnSonido && iconoSonido) {
      btnSonido.setAttribute('aria-pressed', GestorSonido.activo);
      iconoSonido.className = GestorSonido.activo ? 'bi bi-volume-up-fill' : 'bi bi-volume-mute-fill';
      btnSonido.setAttribute('title', `Sonido (${GestorSonido.activo ? 'Activado' : 'Desactivado'})`);
    }

    // Modo Oscuro
    const btnTema = document.getElementById('btn-toggle-tema');
    const iconoTema = document.getElementById('icono-tema');
    if (config.temaOscuro) {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (btnTema) btnTema.setAttribute('aria-pressed', 'true');
      if (iconoTema) iconoTema.className = 'bi bi-sun-fill';
    }

    // Modo Alto Contraste
    const btnContraste = document.getElementById('btn-toggle-contraste');
    if (config.altoContraste) {
      document.documentElement.setAttribute('data-contrast', 'high');
      if (btnContraste) btnContraste.setAttribute('aria-pressed', 'true');
    }

    // Tamaño de fuente
    const btnFuente = document.getElementById('btn-toggle-fuente');
    if (config.fuenteGrande) {
      document.documentElement.setAttribute('data-text-size', 'large');
      if (btnFuente) btnFuente.setAttribute('aria-pressed', 'true');
    }
  },

  /**
   * Sincroniza callbacks de la lógica de Juego con UI y Sonidos
   */
  conectarCallbacksJuego() {
    // Ticks del temporizador de 20s
    Juego.onTick = (segundos, porcentaje) => {
      UI.actualizarTemporizador(segundos, porcentaje);
      if (segundos <= 5 && segundos > 0) {
        GestorSonido.reproducirAlertaTiempo();
      }
    };

    // Tiempo agotado (equivale a respuesta fallida automática)
    Juego.onTiempoAgotado = () => {
      GestorSonido.reproducirError();
      const resultado = Juego.responder(-1);
      UI.mostrarRetroalimentacion(resultado);
    };

    // Fin de partida
    Juego.onFinPartida = (resumen) => {
      // Guardar partida en el Ranking Top 10
      Almacenamiento.guardarEnRanking(resumen);
      // Actualizar estadísticas acumuladas
      Almacenamiento.actualizarEstadisticas(resumen);
      // Guardar nombre reciente
      Almacenamiento.guardarUltimoJugador(resumen.jugador);

      UI.mostrarResultado(resumen);
    };
  },

  /**
   * Vincula todos los escuchadores de eventos interactivos
   */
  registrarEventosUI() {
    // ----------------------------------------------------
    // Barra superior: Accesibilidad y Controles
    // ----------------------------------------------------
    const btnSonido = document.getElementById('btn-toggle-sonido');
    if (btnSonido) {
      btnSonido.addEventListener('click', () => {
        GestorSonido.activo = !GestorSonido.activo;
        btnSonido.setAttribute('aria-pressed', GestorSonido.activo);
        const icono = document.getElementById('icono-sonido');
        if (icono) icono.className = GestorSonido.activo ? 'bi bi-volume-up-fill' : 'bi bi-volume-mute-fill';
        btnSonido.setAttribute('title', `Sonido (${GestorSonido.activo ? 'Activado' : 'Desactivado'})`);
        Almacenamiento.guardarConfiguracion({ sonido: GestorSonido.activo });
        UI.anunciar(`Sonido ${GestorSonido.activo ? 'activado' : 'desactivado'}.`);
      });
    }

    const btnTema = document.getElementById('btn-toggle-tema');
    if (btnTema) {
      btnTema.addEventListener('click', () => {
        const esOscuro = document.documentElement.getAttribute('data-theme') === 'dark';
        const nuevoOscuro = !esOscuro;
        if (nuevoOscuro) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        btnTema.setAttribute('aria-pressed', nuevoOscuro);
        const icono = document.getElementById('icono-tema');
        if (icono) icono.className = nuevoOscuro ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        Almacenamiento.guardarConfiguracion({ temaOscuro: nuevoOscuro });
        UI.anunciar(`Modo ${nuevoOscuro ? 'oscuro' : 'claro'} activado.`);
      });
    }

    const btnContraste = document.getElementById('btn-toggle-contraste');
    if (btnContraste) {
      btnContraste.addEventListener('click', () => {
        const esAlto = document.documentElement.getAttribute('data-contrast') === 'high';
        const nuevoAlto = !esAlto;
        if (nuevoAlto) {
          document.documentElement.setAttribute('data-contrast', 'high');
        } else {
          document.documentElement.removeAttribute('data-contrast');
        }
        btnContraste.setAttribute('aria-pressed', nuevoAlto);
        Almacenamiento.guardarConfiguracion({ altoContraste: nuevoAlto });
        UI.anunciar(`Modo alto contraste ${nuevoAlto ? 'activado' : 'desactivado'}.`);
      });
    }

    const btnFuente = document.getElementById('btn-toggle-fuente');
    if (btnFuente) {
      btnFuente.addEventListener('click', () => {
        const esGrande = document.documentElement.getAttribute('data-text-size') === 'large';
        const nuevoGrande = !esGrande;
        if (nuevoGrande) {
          document.documentElement.setAttribute('data-text-size', 'large');
        } else {
          document.documentElement.removeAttribute('data-text-size');
        }
        btnFuente.setAttribute('aria-pressed', nuevoGrande);
        Almacenamiento.guardarConfiguracion({ fuenteGrande: nuevoGrande });
        UI.anunciar(`Tamaño de fuente ${nuevoGrande ? 'aumentado' : 'estándar'}.`);
      });
    }

    // Modal accesible de confirmación para salir de partida activa
    const modalSalir = document.getElementById('modal-confirmar-salir');
    const btnCancelarSalir = document.getElementById('btn-cancelar-salir-partida');
    const btnConfirmarSalir = document.getElementById('btn-confirmar-salir-partida');
    const btnAbandonarPartida = document.getElementById('btn-abandonar-partida');

    const intentarSalirPartida = () => {
      const enPartida = (Juego.intervaloTemporizador !== null) || 
        (UI.pantallas.juego && UI.pantallas.juego.classList.contains('pantalla--activa') && !Juego.estado.haRespondido);

      if (enPartida) {
        // Pausar temporizador durante la confirmación
        Juego.estado.enPausa = true;

        if (modalSalir) {
          if (typeof modalSalir.showModal === 'function') {
            modalSalir.showModal();
          } else {
            modalSalir.setAttribute('open', '');
          }
        }
      } else {
        UI.cambiarPantalla('inicio');
      }
    };

    const btnLogo = document.getElementById('btn-ir-inicio-logo');
    if (btnLogo) {
      btnLogo.addEventListener('click', (e) => {
        e.preventDefault();
        intentarSalirPartida();
      });
      btnLogo.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          intentarSalirPartida();
        }
      });
    }

    if (btnAbandonarPartida) {
      btnAbandonarPartida.addEventListener('click', (e) => {
        e.preventDefault();
        intentarSalirPartida();
      });
    }

    if (btnCancelarSalir && modalSalir) {
      btnCancelarSalir.addEventListener('click', () => {
        Juego.estado.enPausa = false;
        if (typeof modalSalir.close === 'function') {
          modalSalir.close();
        } else {
          modalSalir.removeAttribute('open');
        }
        UI.mostrarToast('Evaluación reanudada', 'bi-play-fill');
      });
    }

    if (btnConfirmarSalir && modalSalir) {
      btnConfirmarSalir.addEventListener('click', () => {
        Juego.detenerTemporizador();
        Juego.estado.enPausa = false;
        if (typeof modalSalir.close === 'function') {
          modalSalir.close();
        } else {
          modalSalir.removeAttribute('open');
        }
        UI.cambiarPantalla('inicio');
        UI.mostrarToast('Partida cancelada. Regresaste al inicio.', 'bi-door-closed');
      });
    }

    if (modalSalir) {
      modalSalir.addEventListener('cancel', () => {
        Juego.estado.enPausa = false;
      });
    }

    // ----------------------------------------------------
    // Pantalla Inicio: Validación y Navegación
    // ----------------------------------------------------
    const inputNombre = document.getElementById('input-nombre-jugador');
    const errorNombre = document.getElementById('error-nombre-jugador');
    const btnIniciarFlujo = document.getElementById('btn-iniciar-flujo');

    // Limpiar mensaje de error en tiempo real
    if (inputNombre) {
      inputNombre.addEventListener('input', () => {
        if (inputNombre.value.trim().length > 0) {
          if (errorNombre) {
            errorNombre.classList.remove('visible', 'd-block');
            errorNombre.classList.add('d-none');
          }
          inputNombre.classList.remove('is-invalid');
        }
      });

      inputNombre.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (btnIniciarFlujo) btnIniciarFlujo.click();
        }
      });
    }

    if (btnIniciarFlujo) {
      btnIniciarFlujo.addEventListener('click', () => {
        const nombre = inputNombre ? inputNombre.value.trim() : '';

        // RF-01: Solicitar nombre antes de iniciar y no permitir nombre vacío
        if (!nombre) {
          if (errorNombre) {
            errorNombre.classList.remove('d-none');
            errorNombre.classList.add('visible', 'd-block');
          }
          if (inputNombre) {
            inputNombre.classList.add('is-invalid');
            inputNombre.focus();
          }
          UI.anunciar('Error: El nombre del jugador no puede estar vacío.');
          return;
        }

        this.configPartida.nombreJugador = nombre;
        Almacenamiento.guardarUltimoJugador(nombre);

        // Actualizar saludo en configuración
        const saludo = document.getElementById('saludo-jugador-config');
        if (saludo) saludo.textContent = nombre;

        this.actualizarPreviewRecord();
        UI.cambiarPantalla('configuracion');
      });
    }

    // Botones de Instrucciones y Ranking desde Inicio
    const btnVerInstrucciones = document.getElementById('btn-ver-instrucciones');
    if (btnVerInstrucciones) {
      btnVerInstrucciones.addEventListener('click', () => UI.cambiarPantalla('instrucciones'));
    }

    const btnVolverInstrucciones = document.getElementById('btn-volver-instrucciones');
    if (btnVolverInstrucciones) {
      btnVolverInstrucciones.addEventListener('click', () => UI.cambiarPantalla('inicio'));
    }

    const btnVerRankingInicio = document.getElementById('btn-ver-ranking-inicio');
    if (btnVerRankingInicio) {
      btnVerRankingInicio.addEventListener('click', () => {
        UI.renderizarRanking(Almacenamiento.obtenerRanking());
        UI.renderizarEstadisticas(Almacenamiento.obtenerEstadisticas());
        UI.cambiarPantalla('ranking');
      });
    }

    // ----------------------------------------------------
    // Pantalla Configuración de Partida
    // ----------------------------------------------------
    // Selección de Categorías
    const cardsCategorias = document.querySelectorAll('.categoria-card');
    cardsCategorias.forEach(card => {
      card.addEventListener('click', () => {
        cardsCategorias.forEach(c => {
          c.classList.remove('seleccionada');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('seleccionada');
        card.setAttribute('aria-checked', 'true');
        this.configPartida.categoria = card.dataset.categoria || 'todas';
        this.actualizarPreviewRecord();
      });
    });

    // Selección de Dificultad
    const btnsDificultad = document.querySelectorAll('.dificultad-btn');
    btnsDificultad.forEach(btn => {
      btn.addEventListener('click', () => {
        btnsDificultad.forEach(b => {
          b.classList.remove('seleccionada');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('seleccionada');
        btn.setAttribute('aria-checked', 'true');
        this.configPartida.dificultad = btn.dataset.dificultad || 'medio';
        this.actualizarPreviewRecord();
      });
    });

    const btnCancelarConfig = document.getElementById('btn-cancelar-config');
    if (btnCancelarConfig) {
      btnCancelarConfig.addEventListener('click', () => UI.cambiarPantalla('inicio'));
    }

    const btnComenzarPartida = document.getElementById('btn-comenzar-partida');
    if (btnComenzarPartida) {
      btnComenzarPartida.addEventListener('click', () => {
        this.iniciarNuevaPartida();
      });
    }

    // ----------------------------------------------------
    // Pantalla Juego: Opciones y Comodines
    // ----------------------------------------------------
    const contenedorOpciones = document.getElementById('contenedor-opciones');
    if (contenedorOpciones) {
      contenedorOpciones.addEventListener('click', (e) => {
        const btnOpcion = e.target.closest('.opcion-btn');
        if (!btnOpcion || btnOpcion.disabled) return;

        const indice = parseInt(btnOpcion.dataset.indice, 10);
        this.procesarRespuesta(indice);
      });
    }

    // Comodín 50/50
    const btnComodin5050 = document.getElementById('btn-comodin-5050');
    if (btnComodin5050) {
      btnComodin5050.addEventListener('click', () => {
        this.activarComodin('cincuenta');
      });
    }

    // Comodín Tiempo (+10s)
    const btnComodinTiempo = document.getElementById('btn-comodin-tiempo');
    if (btnComodinTiempo) {
      btnComodinTiempo.addEventListener('click', () => {
        this.activarComodin('tiempo');
      });
    }

    // Botón Siguiente Pregunta
    const btnSiguiente = document.getElementById('btn-siguiente-pregunta');
    if (btnSiguiente) {
      btnSiguiente.addEventListener('click', () => {
        this.avanzarSiguientePregunta();
      });
    }

    // ----------------------------------------------------
    // Pantalla Resultado
    // ----------------------------------------------------
    const btnJugarDeNuevo = document.getElementById('btn-jugar-de-nuevo');
    if (btnJugarDeNuevo) {
      btnJugarDeNuevo.addEventListener('click', () => {
        this.iniciarNuevaPartida();
      });
    }

    const btnVerRankingResultado = document.getElementById('btn-ver-ranking-desde-resultado');
    if (btnVerRankingResultado) {
      btnVerRankingResultado.addEventListener('click', () => {
        UI.renderizarRanking(Almacenamiento.obtenerRanking());
        UI.renderizarEstadisticas(Almacenamiento.obtenerEstadisticas());
        UI.cambiarPantalla('ranking');
      });
    }

    const btnVolverInicioResultado = document.getElementById('btn-volver-inicio-desde-resultado');
    if (btnVolverInicioResultado) {
      btnVolverInicioResultado.addEventListener('click', () => UI.cambiarPantalla('inicio'));
    }

    // Botón Imprimir Ficha Oficial Académica
    const btnImprimirResultado = document.getElementById('btn-imprimir-resultado');
    if (btnImprimirResultado) {
      btnImprimirResultado.addEventListener('click', () => {
        window.print();
      });
    }

    // Botón Copiar Ficha de Resultados al Portapapeles
    const btnCopiarResumen = document.getElementById('btn-copiar-resumen');
    if (btnCopiarResumen) {
      btnCopiarResumen.addEventListener('click', () => {
        const jugador = document.getElementById('resultado-nombre-jugador')?.textContent || 'Participante';
        const puntaje = document.getElementById('resultado-puntaje-final')?.textContent || '0';
        const aciertos = document.getElementById('resumen-aciertos-conteo')?.textContent || '0 / 10';
        const efectividad = document.getElementById('resumen-efectividad-porcentaje')?.textContent || '0%';
        const racha = document.getElementById('resumen-mejor-racha')?.textContent || '0';
        const tiempo = document.getElementById('resumen-tiempo-total')?.textContent || '0s';
        const dictamen = document.getElementById('resultado-mensaje-motivo')?.textContent || '';

        const textoFicha = `🇨🇴 Trivia Colombia - Ficha Oficial de Resultados\n` +
          `• Participante: ${jugador}\n` +
          `• Puntuación Total: ${puntaje} pts\n` +
          `• Reactivos Acertados: ${aciertos} (${efectividad})\n` +
          `• Mayor Racha Consecutiva: ${racha}\n` +
          `• Tiempo Invertido: ${tiempo}\n` +
          `• Evaluación Pedagógica: ${dictamen.trim()}\n` +
          `• Entorno Académico: Universidad de Santander (UDES)`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textoFicha).then(() => {
            UI.mostrarToast('Ficha de resultados copiada al portapapeles', 'bi-clipboard-check-fill');
          }).catch(() => {
            UI.mostrarToast('No se pudo copiar automáticamente', 'bi-exclamation-triangle-fill');
          });
        } else {
          UI.mostrarToast('Portapapeles no compatible en este navegador', 'bi-exclamation-triangle-fill');
        }
      });
    }

    // Modal de Atajos de Teclado
    const modalAtajos = document.getElementById('modal-atajos');
    const btnToggleAtajos = document.getElementById('btn-toggle-atajos');
    const btnCerrarAtajos = document.getElementById('btn-cerrar-modal-atajos');
    const btnCerrarAtajosX = document.getElementById('btn-cerrar-modal-atajos-x');

    const abrirAtajos = () => {
      if (modalAtajos) {
        if (typeof modalAtajos.showModal === 'function') {
          modalAtajos.showModal();
        } else {
          modalAtajos.setAttribute('open', '');
        }
      }
    };

    const cerrarAtajos = () => {
      if (modalAtajos) {
        if (typeof modalAtajos.close === 'function') {
          modalAtajos.close();
        } else {
          modalAtajos.removeAttribute('open');
        }
      }
    };

    if (btnToggleAtajos) btnToggleAtajos.addEventListener('click', abrirAtajos);
    if (btnCerrarAtajos) btnCerrarAtajos.addEventListener('click', cerrarAtajos);
    if (btnCerrarAtajosX) btnCerrarAtajosX.addEventListener('click', cerrarAtajos);

    // ----------------------------------------------------
    // Pantalla Ranking y Estadísticas
    // ----------------------------------------------------
    const tabTop10 = document.getElementById('tab-top10');
    const tabMisStats = document.getElementById('tab-mis-stats');
    const panelTop10 = document.getElementById('panel-top10');
    const panelMisStats = document.getElementById('panel-mis-stats');

    if (tabTop10 && tabMisStats) {
      tabTop10.addEventListener('click', () => {
        tabTop10.classList.add('activo');
        tabTop10.setAttribute('aria-selected', 'true');
        tabMisStats.classList.remove('activo');
        tabMisStats.setAttribute('aria-selected', 'false');

        if (panelTop10) panelTop10.style.display = 'block';
        if (panelMisStats) panelMisStats.style.display = 'none';
      });

      tabMisStats.addEventListener('click', () => {
        tabMisStats.classList.add('activo');
        tabMisStats.setAttribute('aria-selected', 'true');
        tabTop10.classList.remove('activo');
        tabTop10.setAttribute('aria-selected', 'false');

        if (panelMisStats) panelMisStats.style.display = 'block';
        if (panelTop10) panelTop10.style.display = 'none';
      });
    }

    const btnVolverMenuRanking = document.getElementById('btn-volver-menu-desde-ranking');
    if (btnVolverMenuRanking) {
      btnVolverMenuRanking.addEventListener('click', () => UI.cambiarPantalla('inicio'));
    }

    const btnVolverDesdeStats = document.getElementById('btn-volver-desde-stats');
    if (btnVolverDesdeStats) {
      btnVolverDesdeStats.addEventListener('click', () => UI.cambiarPantalla('inicio'));
    }

    // Modal de confirmación para borrar ranking
    const modalBorrar = document.getElementById('modal-confirmar-borrar');
    const btnAbrirModalBorrar = document.getElementById('btn-abrir-modal-borrar');
    const btnCancelarBorrar = document.getElementById('btn-cancelar-borrar-ranking');
    const btnConfirmarBorrar = document.getElementById('btn-confirmar-borrar-ranking');

    if (btnAbrirModalBorrar && modalBorrar) {
      btnAbrirModalBorrar.addEventListener('click', () => {
        if (typeof modalBorrar.showModal === 'function') {
          modalBorrar.showModal();
        } else {
          modalBorrar.setAttribute('open', '');
        }
      });
    }

    if (btnCancelarBorrar && modalBorrar) {
      btnCancelarBorrar.addEventListener('click', () => {
        if (typeof modalBorrar.close === 'function') {
          modalBorrar.close();
        } else {
          modalBorrar.removeAttribute('open');
        }
      });
    }

    if (btnConfirmarBorrar && modalBorrar) {
      btnConfirmarBorrar.addEventListener('click', () => {
        Almacenamiento.borrarRanking();
        UI.renderizarRanking([]);
        if (typeof modalBorrar.close === 'function') {
          modalBorrar.close();
        } else {
          modalBorrar.removeAttribute('open');
        }
        UI.mostrarToast('El cuadro de clasificación ha sido reiniciado', 'bi-trash3-fill');
        UI.anunciar('El ranking ha sido borrado exitosamente.');
      });
    }
  },

  /**
   * Atajos de teclado para accesibilidad total (WCAG 2.1)
   */
  registrarAtajosTeclado() {
    window.addEventListener('keydown', (e) => {
      // Si el usuario está escribiendo en un input, no interceptar atajos
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Tecla ? para abrir atajos de teclado
      if (e.key === '?') {
        e.preventDefault();
        const modalAtajos = document.getElementById('modal-atajos');
        if (modalAtajos && typeof modalAtajos.showModal === 'function') {
          modalAtajos.showModal();
        }
        return;
      }

      const pantallaJuegoActiva = UI.pantallas.juego && UI.pantallas.juego.classList.contains('pantalla--activa');
      if (!pantallaJuegoActiva) return;

      // Teclas numéricas 1-4 para opciones A, B, C, D
      if (['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const indice = parseInt(e.key, 10) - 1;
        const btn = document.getElementById(`opcion-btn-${indice}`);
        if (btn && !btn.disabled) {
          this.procesarRespuesta(indice);
        }
      }

      // Tecla C: Comodín 50/50
      if (e.key.toLowerCase() === 'c') {
        const btn5050 = document.getElementById('btn-comodin-5050');
        if (btn5050 && !btn5050.disabled) {
          e.preventDefault();
          this.activarComodin('cincuenta');
        }
      }

      // Tecla T: Comodín Tiempo (+10s)
      if (e.key.toLowerCase() === 't') {
        const btnTiempo = document.getElementById('btn-comodin-tiempo');
        if (btnTiempo && !btnTiempo.disabled) {
          e.preventDefault();
          this.activarComodin('tiempo');
        }
      }

      // Tecla Enter o Espacio para avanzar si la retroalimentación está visible
      if (e.key === 'Enter' || e.code === 'Space') {
        const btnSiguiente = document.getElementById('btn-siguiente-pregunta');
        const boxRetro = document.getElementById('box-retroalimentacion');
        if (boxRetro && boxRetro.classList.contains('visible') && btnSiguiente) {
          e.preventDefault();
          this.avanzarSiguientePregunta();
        }
      }
    });
  },

  /**
   * Inicia el ciclo de una nueva partida
   */
  iniciarNuevaPartida() {
    try {
      const estado = Juego.iniciarPartida(
        this.configPartida.nombreJugador || 'Jugador',
        this.configPartida.categoria,
        this.configPartida.dificultad
      );

      UI.cambiarPantalla('juego');
      UI.actualizarComodines(estado.comodines);

      const preguntaActual = Juego.obtenerPreguntaActual();
      UI.mostrarPregunta(
        preguntaActual,
        1,
        estado.preguntas.length,
        estado.puntaje,
        estado.racha
      );

      Juego.iniciarTemporizador(20);
    } catch (err) {
      console.error(err);
      UI.mostrarToast('Error al iniciar la evaluación: ' + err.message, 'bi-exclamation-triangle-fill');
    }
  },

  /**
   * Procesa la respuesta elegida por el jugador
   */
  procesarRespuesta(indice) {
    const resultado = Juego.responder(indice);
    if (!resultado) return;

    if (resultado.esCorrecta) {
      GestorSonido.reproducirAcierto();
    } else {
      GestorSonido.reproducirError();
    }

    // Actualizar indicador de puntaje en pantalla
    const indPts = document.getElementById('indicador-puntaje-actual');
    if (indPts) indPts.textContent = `${resultado.puntajeTotal} pts`;

    const rachaCont = document.getElementById('racha-contador');
    if (rachaCont) rachaCont.textContent = resultado.rachaActual;

    UI.mostrarRetroalimentacion(resultado);
  },

  /**
   * Ejecuta comodines reglamentarios (-30 pts de costo)
   */
  activarComodin(tipo) {
    const resultado = Juego.usarComodin(tipo);
    if (!resultado.exito) {
      UI.mostrarToast(resultado.mensaje || 'No fue posible usar el comodín', 'bi-exclamation-circle-fill');
      UI.anunciar(resultado.mensaje || 'Comodín no disponible');
      return;
    }

    GestorSonido.reproducirComodin();
    UI.actualizarComodines(Juego.estado.comodines);

    // Actualizar puntaje descontado
    const indPts = document.getElementById('indicador-puntaje-actual');
    if (indPts) indPts.textContent = `${resultado.puntajeActual} pts`;

    if (tipo === 'cincuenta') {
      UI.descartarOpciones5050(resultado.descartadas);
      UI.mostrarToast('Comodín 50/50 activado (-30 pts)', 'bi-scissors');
    } else if (tipo === 'tiempo') {
      UI.mostrarToast('Comodín de Tiempo activado (+10s, -30 pts)', 'bi-alarm-fill');
      UI.anunciar('¡Comodín de tiempo aplicado! Se agregaron 10 segundos extra. Penalización de 30 puntos aplicada.');
    }
  },

  /**
   * Avanza a la siguiente pregunta o pasa a la pantalla final
   */
  avanzarSiguientePregunta() {
    const siguiente = Juego.siguientePregunta();
    if (siguiente.fin) {
      // El fin de partida es gestionado en Juego.onFinPartida
      return;
    }

    UI.mostrarPregunta(
      siguiente.pregunta,
      siguiente.numero,
      siguiente.total,
      Juego.estado.puntaje,
      Juego.estado.racha
    );

    Juego.iniciarTemporizador(20);
  },

  /**
   * Actualiza la vista previa del mejor puntaje en la pantalla de configuración
   */
  actualizarPreviewRecord() {
    const mejor = Almacenamiento.obtenerMejorPuntajeFiltro(
      this.configPartida.categoria,
      this.configPartida.dificultad
    );
    UI.actualizarRecordPreview(mejor);
  }
};

// Arrancar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  App.iniciar();
});
