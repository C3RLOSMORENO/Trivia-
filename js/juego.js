/**
 * Trivia Colombia - Lógica Principal del Juego
 * Implementa la selección de preguntas, algoritmo de Fisher-Yates,
 * temporizador de 20s, cálculo de puntaje según sección 6.1 y comodines.
 */

const DIFICULTADES = {
  facil: { nombre: 'Fácil', multiplicador: 1.0, color: '#2E9E5B' },
  medio: { nombre: 'Medio', multiplicador: 1.5, color: '#FCD116' },
  dificil: { nombre: 'Difícil', multiplicador: 2.0, color: '#CE1126' }
};

const CATEGORIAS_INFO = {
  todas: { nombre: 'Todas las Categorías', icono: '🇨🇴' },
  geografia: { nombre: 'Geografía', icono: '🗺️' },
  historia: { nombre: 'Historia', icono: '🏛️' },
  cultura: { nombre: 'Cultura y Tradiciones', icono: '🎭' },
  deportes: { nombre: 'Deportes', icono: '⚽' },
  naturaleza: { nombre: 'Ciencia y Naturaleza', icono: '🌿' }
};

const Juego = {
  // Estado actual de la partida
  estado: {
    jugador: '',
    categoria: 'todas',
    dificultad: 'medio',
    preguntas: [],          // Las 10 preguntas seleccionadas y mezcladas
    indiceActual: 0,
    aciertos: 0,
    errores: 0,
    racha: 0,
    mejorRacha: 0,
    puntaje: 0,
    tiempoRestante: 20,
    tiempoTotalSegundos: 0,
    enPausa: false,
    haRespondido: false,
    comodines: {
      cincuenta: true,      // 50/50 disponible
      tiempo: true          // +10s disponible
    },
    historialRespuestas: [], // Para la revisión detallada al final
    desgloseCategorias: {}
  },

  intervaloTemporizador: null,
  inicioPreguntaTimestamp: null,

  // Callbacks para sincronizar con la interfaz gráfica (ui.js)
  onTick: null,             // (segundos, porcentaje) => {}
  onTiempoAgotado: null,    // () => {}
  onFinPartida: null,       // (resumen) => {}

  /**
   * Algoritmo Fisher-Yates para mezclar arreglos sin sesgo probabilístico
   * @param {Array} arreglo 
   * @returns {Array} nuevo arreglo mezclado
   */
  mezclar(arreglo) {
    const copia = [...arreglo];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  },

  /**
   * Filtra el banco de preguntas por categoría y dificultad,
   * y selecciona 10 preguntas aleatorias sin repetir.
   */
  obtenerPreguntas(categoria, dificultad) {
    if (typeof PREGUNTAS === 'undefined' || !Array.isArray(PREGUNTAS)) {
      console.error('El banco PREGUNTAS no está disponible.');
      return [];
    }

    // 1. Filtrar por categoría y dificultad
    let candidatas = PREGUNTAS.filter(p => {
      const cumpleCat = (categoria === 'todas' || p.categoria === categoria);
      const cumpleDif = (dificultad === 'todas' || p.dificultad === dificultad);
      return cumpleCat && cumpleDif;
    });

    // Fallback inteligente si no hay suficientes con dificultad exacta en esa categoría
    if (candidatas.length < 10) {
      const adicionales = PREGUNTAS.filter(p => {
        const cumpleCat = (categoria === 'todas' || p.categoria === categoria);
        return cumpleCat && !candidatas.some(c => c.id === p.id);
      });
      candidatas = candidatas.concat(this.mezclar(adicionales));
    }

    // Si aún faltan (ej. categoría muy específica), completar con preguntas generales
    if (candidatas.length < 10) {
      const restantes = PREGUNTAS.filter(p => !candidatas.some(c => c.id === p.id));
      candidatas = candidatas.concat(this.mezclar(restantes));
    }

    // Mezclar aleatoriamente el conjunto y tomar exactamente 10
    const seleccionadas = this.mezclar(candidatas).slice(0, 10);

    // Para cada pregunta, mezclar sus 4 opciones y rastrear la posición de la correcta
    return seleccionadas.map(pregunta => {
      const textoCorrecto = pregunta.opciones[pregunta.correcta];
      const opcionesMezcladas = this.mezclar(pregunta.opciones);
      const nuevoIndiceCorrecto = opcionesMezcladas.indexOf(textoCorrecto);

      return {
        id: pregunta.id,
        categoria: pregunta.categoria,
        dificultad: pregunta.dificultad,
        enunciado: pregunta.enunciado,
        opciones: opcionesMezcladas,
        correcta: nuevoIndiceCorrecto,
        explicacion: pregunta.explicacion,
        opcionesDescartadas: [] // Llenado si se usa el comodín 50/50
      };
    });
  },

  /**
   * Inicia una nueva partida con los filtros indicados
   */
  iniciarPartida(jugador, categoria = 'todas', dificultad = 'medio') {
    this.detenerTemporizador();

    const preguntas = this.obtenerPreguntas(categoria, dificultad);
    if (preguntas.length === 0) {
      throw new Error('No fue posible cargar preguntas para esta selección.');
    }

    this.estado = {
      jugador: jugador.trim(),
      categoria,
      dificultad,
      preguntas,
      indiceActual: 0,
      aciertos: 0,
      errores: 0,
      racha: 0,
      mejorRacha: 0,
      puntaje: 0,
      tiempoRestante: 20,
      tiempoTotalSegundos: 0,
      enPausa: false,
      haRespondido: false,
      comodines: {
        cincuenta: true,
        tiempo: true
      },
      historialRespuestas: [],
      desgloseCategorias: {
        geografia: { aciertos: 0, total: 0 },
        historia: { aciertos: 0, total: 0 },
        cultura: { aciertos: 0, total: 0 },
        deportes: { aciertos: 0, total: 0 },
        naturaleza: { aciertos: 0, total: 0 }
      }
    };

    return this.estado;
  },

  /**
   * Retorna la pregunta en juego actual
   */
  obtenerPreguntaActual() {
    return this.estado.preguntas[this.estado.indiceActual] || null;
  },

  /**
   * Controla la cuenta regresiva de 20 segundos
   */
  iniciarTemporizador(segundosIniciales = 20) {
    this.detenerTemporizador();
    this.estado.tiempoRestante = segundosIniciales;
    this.inicioPreguntaTimestamp = Date.now();

    if (typeof this.onTick === 'function') {
      this.onTick(this.estado.tiempoRestante, (this.estado.tiempoRestante / 20) * 100);
    }

    this.intervaloTemporizador = setInterval(() => {
      if (this.estado.enPausa || this.estado.haRespondido) return;

      this.estado.tiempoRestante -= 1;
      this.estado.tiempoTotalSegundos += 1;

      const porcentaje = Math.max(0, (this.estado.tiempoRestante / 20) * 100);

      if (typeof this.onTick === 'function') {
        this.onTick(this.estado.tiempoRestante, porcentaje);
      }

      if (this.estado.tiempoRestante <= 0) {
        this.detenerTemporizador();
        if (typeof this.onTiempoAgotado === 'function') {
          this.onTiempoAgotado();
        }
      }
    }, 1000);
  },

  /**
   * Detiene el temporizador activo
   */
  detenerTemporizador() {
    if (this.intervaloTemporizador) {
      clearInterval(this.intervaloTemporizador);
      this.intervaloTemporizador = null;
    }
  },

  /**
   * Valida la respuesta del usuario o procesa tiempo agotado (-1)
   * Aplica la fórmula de puntuación estipulada en la Sección 6.1
   */
  responder(indiceOpcion) {
    if (this.estado.haRespondido) return null;
    this.estado.haRespondido = true;
    this.detenerTemporizador();

    const pregunta = this.obtenerPreguntaActual();
    if (!pregunta) return null;

    const esCorrecta = (indiceOpcion === pregunta.correcta);
    const tiempoSobrante = Math.max(0, this.estado.tiempoRestante);
    const configDif = DIFICULTADES[this.estado.dificultad] || DIFICULTADES.medio;
    const multiplicador = configDif.multiplicador;

    let puntosGanados = 0;
    let bonoTiempo = 0;
    let bonoRacha = 0;

    // Actualizar desglose por categoría
    if (pregunta.categoria && this.estado.desgloseCategorias[pregunta.categoria]) {
      this.estado.desgloseCategorias[pregunta.categoria].total += 1;
    }

    if (esCorrecta) {
      this.estado.aciertos += 1;
      this.estado.racha += 1;

      if (this.estado.racha > this.estado.mejorRacha) {
        this.estado.mejorRacha = this.estado.racha;
      }

      // 1. Base por respuesta correcta: +100 puntos
      const base = 100;

      // 2. Bonificación por rapidez: +5 por cada segundo restante (máx +100)
      bonoTiempo = Math.min(100, tiempoSobrante * 5);

      // 3. Racha de 3 respuestas correctas seguidas: +50 adicionales
      if (this.estado.racha > 0 && this.estado.racha % 3 === 0) {
        bonoRacha = 50;
      }

      // Suma antes de multiplicador (según CP-04 del documento)
      const subtotalPregunta = base + bonoTiempo + bonoRacha;

      // Aplicar multiplicador por dificultad
      puntosGanados = Math.round(subtotalPregunta * multiplicador);
      this.estado.puntaje += puntosGanados;

      if (pregunta.categoria && this.estado.desgloseCategorias[pregunta.categoria]) {
        this.estado.desgloseCategorias[pregunta.categoria].aciertos += 1;
      }
    } else {
      this.estado.errores += 1;
      this.estado.racha = 0; // Se rompe la racha
      puntosGanados = 0;
    }

    const resultado = {
      esCorrecta,
      tiempoAgotado: (indiceOpcion === -1),
      indiceSeleccionado: indiceOpcion,
      indiceCorrecto: pregunta.correcta,
      opcionSeleccionadaTexto: (indiceOpcion >= 0 && indiceOpcion < pregunta.opciones.length) 
        ? pregunta.opciones[indiceOpcion] 
        : 'Tiempo agotado',
      opcionCorrectaTexto: pregunta.opciones[pregunta.correcta],
      explicacion: pregunta.explicacion,
      puntosGanados,
      bonoTiempo,
      bonoRacha,
      tiempoSobrante,
      rachaActual: this.estado.racha,
      puntajeTotal: this.estado.puntaje
    };

    // Guardar en el historial de la partida
    this.estado.historialRespuestas.push({
      numero: this.estado.indiceActual + 1,
      pregunta: pregunta.enunciado,
      categoria: pregunta.categoria,
      dificultad: pregunta.dificultad,
      imagen: pregunta.imagen,
      fuenteImagen: pregunta.fuenteImagen,
      ...resultado
    });

    return resultado;
  },

  /**
   * Uso de comodines: 'cincuenta' | 'tiempo'
   * Sección 6 y 6.1: Resta 30 puntos
   */
  usarComodin(tipo) {
    if (this.estado.haRespondido) return { exito: false, mensaje: 'Ya respondiste esta pregunta' };

    if (tipo === 'cincuenta') {
      if (!this.estado.comodines.cincuenta) {
        return { exito: false, mensaje: 'El comodín 50/50 ya fue utilizado en esta partida' };
      }

      const pregunta = this.obtenerPreguntaActual();
      if (!pregunta) return { exito: false };

      // Identificar las 3 opciones incorrectas
      const indicesIncorrectos = [0, 1, 2, 3].filter(idx => idx !== pregunta.correcta);
      // Mezclar y tomar 2 incorrectas para descartar
      const descartadas = this.mezclar(indicesIncorrectos).slice(0, 2);

      pregunta.opcionesDescartadas = descartadas;
      this.estado.comodines.cincuenta = false;
      this.estado.puntaje = Math.max(0, this.estado.puntaje - 30); // Penalización reglamentaria

      return {
        exito: true,
        tipo: 'cincuenta',
        descartadas,
        penalizacion: 30,
        puntajeActual: this.estado.puntaje
      };
    }

    if (tipo === 'tiempo') {
      if (!this.estado.comodines.tiempo) {
        return { exito: false, mensaje: 'El comodín de tiempo extra ya fue utilizado' };
      }

      this.estado.comodines.tiempo = false;
      // Suma 10 segundos
      this.estado.tiempoRestante = Math.min(30, this.estado.tiempoRestante + 10);
      this.estado.puntaje = Math.max(0, this.estado.puntaje - 30); // Penalización reglamentaria

      if (typeof this.onTick === 'function') {
        const porcentaje = Math.min(100, (this.estado.tiempoRestante / 20) * 100);
        this.onTick(this.estado.tiempoRestante, porcentaje);
      }

      return {
        exito: true,
        tipo: 'tiempo',
        segundosSumados: 10,
        tiempoRestante: this.estado.tiempoRestante,
        penalizacion: 30,
        puntajeActual: this.estado.puntaje
      };
    }

    return { exito: false, mensaje: 'Comodín no reconocido' };
  },

  /**
   * Avanza a la siguiente pregunta o finaliza la partida si era la décima
   */
  siguientePregunta() {
    this.estado.indiceActual += 1;
    this.estado.haRespondido = false;

    if (this.estado.indiceActual >= this.estado.preguntas.length) {
      return this.finalizarPartida();
    }

    return {
      fin: false,
      pregunta: this.obtenerPreguntaActual(),
      numero: this.estado.indiceActual + 1,
      total: this.estado.preguntas.length
    };
  },

  /**
   * Finaliza la partida, consolida el resumen y genera mensajes motivacionales
   */
  finalizarPartida() {
    this.detenerTemporizador();

    const total = this.estado.preguntas.length;
    const aciertos = this.estado.aciertos;
    const porcentaje = Math.round((aciertos / total) * 100);

    // Mensaje de evaluación pedagógica según porcentaje de acierto
    let mensaje = '';
    let emoji = '';
    if (porcentaje === 100) {
      mensaje = 'Dominio sobresaliente y exhaustivo. Demuestras una comprensión integral de los saberes y el patrimonio nacional de Colombia.';
      emoji = '🏆';
    } else if (porcentaje >= 80) {
      mensaje = 'Desempeño destacado. Evidencias un conocimiento estructurado y solvente en historia, geografía, cultura y biodiversidad colombiana.';
      emoji = '🎖️';
    } else if (porcentaje >= 60) {
      mensaje = 'Desempeño satisfactorio. Superaste los criterios de evaluación con bases conceptuales sólidas.';
      emoji = '✅';
    } else if (porcentaje >= 40) {
      mensaje = 'Desempeño básico. Es recomendable profundizar en los hitos de la historia republicana y las regiones geográficas del país.';
      emoji = '📘';
    } else {
      mensaje = 'Desempeño en desarrollo. Te invitamos a revisar los contenidos temáticos y realizar una nueva evaluación diagnóstica.';
      emoji = '🎯';
    }

    const resumen = {
      fin: true,
      jugador: this.estado.jugador,
      puntaje: this.estado.puntaje,
      categoria: this.estado.categoria,
      dificultad: this.estado.dificultad,
      aciertos: this.estado.aciertos,
      errores: this.estado.errores,
      totalPreguntas: total,
      porcentajeAciertos: porcentaje,
      mejorRacha: this.estado.mejorRacha,
      tiempoTotalSeg: this.estado.tiempoTotalSegundos,
      mensaje,
      emoji,
      historialRespuestas: this.estado.historialRespuestas,
      desgloseCategorias: this.estado.desgloseCategorias,
      fecha: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    if (typeof this.onFinPartida === 'function') {
      this.onFinPartida(resumen);
    }

    return resumen;
  }
};

// Exportar para pruebas o módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Juego, DIFICULTADES, CATEGORIAS_INFO };
}
