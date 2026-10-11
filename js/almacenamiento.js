/**
 * Trivia Colombia - Módulo de Almacenamiento (localStorage)
 * Gestiona el Ranking Top 10, Estadísticas globales y Preferencias de usuario.
 */

const STORAGE_KEYS = {
  RANKING: 'trivia_ranking',
  STATS: 'trivia_stats',
  CONFIG: 'trivia_config',
  JUGADOR_ACTUAL: 'trivia_jugador_actual'
};

const Almacenamiento = {
  /**
   * Obtiene la lista del Top 10 guardada en localStorage
   * @returns {Array} Lista ordenada de partidas
   */
  obtenerRanking() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RANKING);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Error al leer ranking de localStorage:', e);
      return [];
    }
  },

  /**
   * Guarda una partida completada en el ranking manteniendo únicamente el Top 10
   * @param {Object} partida { nombre, puntaje, categoria, dificultad, fecha, aciertos }
   * @returns {Array} Nuevo Top 10
   */
  guardarEnRanking(partida) {
    if (!partida || typeof partida.puntaje !== 'number') return this.obtenerRanking();

    const ranking = this.obtenerRanking();
    const nuevaEntrada = {
      nombre: (partida.nombre || 'Anónimo').trim().slice(0, 25),
      puntaje: Math.round(partida.puntaje),
      categoria: partida.categoria || 'todas',
      dificultad: partida.dificultad || 'medio',
      aciertos: partida.aciertos || 0,
      totalPreguntas: partida.totalPreguntas || 10,
      fecha: partida.fecha || new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    ranking.push(nuevaEntrada);

    // Ordenar de mayor a menor puntaje; desempate por aciertos y fecha reciente
    ranking.sort((a, b) => {
      if (b.puntaje !== a.puntaje) {
        return b.puntaje - a.puntaje;
      }
      return (b.aciertos || 0) - (a.aciertos || 0);
    });

    // Mantener sólo el Top 10
    const top10 = ranking.slice(0, 10);

    try {
      localStorage.setItem(STORAGE_KEYS.RANKING, JSON.stringify(top10));
    } catch (e) {
      console.error('Error al guardar ranking en localStorage:', e);
    }

    return top10;
  },

  /**
   * Elimina el historial del ranking local
   */
  borrarRanking() {
    try {
      localStorage.removeItem(STORAGE_KEYS.RANKING);
      return true;
    } catch (e) {
      console.error('Error al limpiar ranking:', e);
      return false;
    }
  },

  /**
   * Obtiene las estadísticas consolidadas del jugador
   * @returns {Object}
   */
  obtenerEstadisticas() {
    const defaultStats = {
      partidasJugadas: 0,
      aciertosTotales: 0,
      preguntasRespondidas: 0,
      mejorPuntaje: 0,
      rachaHistorica: 0,
      tiempoTotalJugadoSeg: 0,
      porCategoria: {
        geografia: { aciertos: 0, total: 0 },
        historia: { aciertos: 0, total: 0 },
        cultura: { aciertos: 0, total: 0 },
        deportes: { aciertos: 0, total: 0 },
        naturaleza: { aciertos: 0, total: 0 }
      }
    };

    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      if (!data) return defaultStats;
      const parsed = JSON.parse(data);
      return { ...defaultStats, ...parsed };
    } catch (e) {
      console.warn('Error al leer estadísticas:', e);
      return defaultStats;
    }
  },

  /**
   * Actualiza las estadísticas tras finalizar una partida
   * @param {Object} resumenPartida
   */
  actualizarEstadisticas(resumenPartida) {
    if (!resumenPartida) return;
    const stats = this.obtenerEstadisticas();

    stats.partidasJugadas += 1;
    stats.aciertosTotales += resumenPartida.aciertos || 0;
    stats.preguntasRespondidas += resumenPartida.totalPreguntas || 10;
    stats.tiempoTotalJugadoSeg += resumenPartida.tiempoTotalSeg || 0;

    if (resumenPartida.puntaje > stats.mejorPuntaje) {
      stats.mejorPuntaje = Math.round(resumenPartida.puntaje);
    }

    if ((resumenPartida.mejorRacha || 0) > stats.rachaHistorica) {
      stats.rachaHistorica = resumenPartida.mejorRacha;
    }

    // Estadísticas por categoría
    if (resumenPartida.desgloseCategorias) {
      Object.entries(resumenPartida.desgloseCategorias).forEach(([cat, valores]) => {
        if (!stats.porCategoria[cat]) {
          stats.porCategoria[cat] = { aciertos: 0, total: 0 };
        }
        stats.porCategoria[cat].aciertos += valores.aciertos || 0;
        stats.porCategoria[cat].total += valores.total || 0;
      });
    }

    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Error al guardar estadísticas:', e);
    }

    return stats;
  },

  /**
   * Obtiene la mejor puntuación histórica para una categoría y dificultad dada
   */
  obtenerMejorPuntajeFiltro(categoria, dificultad) {
    const ranking = this.obtenerRanking();
    const filtrados = ranking.filter(item => {
      const catMatch = (categoria === 'todas' || item.categoria === categoria);
      const difMatch = item.dificultad === dificultad;
      return catMatch && difMatch;
    });

    if (filtrados.length === 0) return 0;
    return Math.max(...filtrados.map(r => r.puntaje));
  },

  /**
   * Preferencias de usuario (Sonido, Tema, etc.)
   */
  obtenerConfiguracion() {
    const defaultConfig = {
      sonido: true,
      temaOscuro: false,
      altoContraste: false,
      fuenteGrande: false
    };

    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (!data) return defaultConfig;
      return { ...defaultConfig, ...JSON.parse(data) };
    } catch (e) {
      return defaultConfig;
    }
  },

  guardarConfiguracion(nuevaConfig) {
    try {
      const configActual = this.obtenerConfiguracion();
      const fusion = { ...configActual, ...nuevaConfig };
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(fusion));
      return fusion;
    } catch (e) {
      console.error('Error al guardar configuración:', e);
      return null;
    }
  },

  /**
   * Recordar último nombre de jugador
   */
  obtenerUltimoJugador() {
    try {
      return localStorage.getItem(STORAGE_KEYS.JUGADOR_ACTUAL) || '';
    } catch (e) {
      return '';
    }
  },

  guardarUltimoJugador(nombre) {
    try {
      if (nombre) {
        localStorage.setItem(STORAGE_KEYS.JUGADOR_ACTUAL, nombre.trim());
      }
    } catch (e) {
      // Ignorar
    }
  }
};

// Exportar en caso de ambiente modular o Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Almacenamiento, STORAGE_KEYS };
}
