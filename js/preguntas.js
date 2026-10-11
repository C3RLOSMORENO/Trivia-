/**
 * Trivia Colombia - Banco de Preguntas
 * Contiene un mínimo de 50 preguntas distribuidas en las 5 categorías:
 * 1. geografía
 * 2. historia
 * 3. cultura (Cultura y Tradiciones)
 * 4. deportes
 * 5. naturaleza (Ciencia y Naturaleza)
 *
 * Cada pregunta cuenta con:
 * - id: Identificador numérico único
 * - categoria: geografía | historia | cultura | deportes | naturaleza
 * - dificultad: facil | medio | dificil
 * - enunciado: Texto claro de la pregunta
 * - opciones: Arreglo de 4 alternativas
 * - correcta: Índice de la opción correcta (0, 1, 2 ó 3)
 * - explicacion: Justificación pedagógica breve del acierto
 */

const PREGUNTAS = [
  // ==========================================
  // GEOGRAFÍA (11 Preguntas)
  // ==========================================
  {
    id: 1,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Santander?',
    opciones: ['Floridablanca', 'Bucaramanga', 'Girón', 'San Gil'],
    correcta: 1,
    explicacion: 'Bucaramanga es la capital de Santander y es conocida nacionalmente como "La Ciudad Bonita".'
  },
  {
    id: 2,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital de la República de Colombia?',
    opciones: ['Medellín', 'Cali', 'Bogotá D.C.', 'Barranquilla'],
    correcta: 2,
    explicacion: 'Bogotá D.C. es la capital política y administrativa de Colombia desde su fundación en 1538.'
  },
  {
    id: 3,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el principal río de Colombia, que recorre el país de sur a norte desembocando en el mar Caribe?',
    opciones: ['Río Cauca', 'Río Magdalena', 'Río Atrato', 'Río Meta'],
    correcta: 1,
    explicacion: 'El río Magdalena es la principal arteria fluvial de Colombia, con una longitud de más de 1.500 km.'
  },
  {
    id: 4,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuántos departamentos conforman el territorio de Colombia?',
    opciones: ['30 departamentos', '32 departamentos', '34 departamentos', '28 departamentos'],
    correcta: 1,
    explicacion: 'Colombia está dividida territorialmente en 32 departamentos y un Distrito Capital (Bogotá).'
  },
  {
    id: 5,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuáles son los dos océanos que bañan las costas colombianas?',
    opciones: [
      'Atlántico (Mar Caribe) y Pacífico',
      'Atlántico e Índico',
      'Pacífico y Ártico',
      'Caribe y Antártico'
    ],
    correcta: 0,
    explicacion: 'Colombia es el único país de América del Sur que cuenta con costas sobre el Mar Caribe (Atlántico) y el Océano Pacífico.'
  },
  {
    id: 6,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el punto continental más septentrional (más al norte) de Colombia y de América del Sur?',
    opciones: ['Cabo Manglares', 'Punta Gallinas', 'Quebrada San Antonio', 'Cabo de la Vela'],
    correcta: 1,
    explicacion: 'Punta Gallinas, ubicada en la península de La Guajira, es el extremo norte de Colombia y de Suramérica.'
  },
  {
    id: 7,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el pico más alto de Colombia, superando los 5.700 metros sobre el nivel del mar?',
    opciones: [
      'Nevado del Huila',
      'Pico Cristóbal Colón',
      'Nevado del Ruiz',
      'Pico Pan de Azúcar'
    ],
    correcta: 1,
    explicacion: 'El Pico Cristóbal Colón (y el Simón Bolívar), en la Sierra Nevada de Santa Marta, son las cumbres más elevadas con ~5.775 msnm.'
  },
  {
    id: 8,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿En qué región natural colombiana se encuentra ubicado el departamento de Antioquia?',
    opciones: ['Región Amazónica', 'Región Andina', 'Región Orinoquía', 'Región Pacífica'],
    correcta: 1,
    explicacion: 'Antioquia se encuentra en la cordillera Central y Occidental, dentro de la Región Andina.'
  },
  {
    id: 9,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es la isla continental/marítima colombiana más grande en el mar Caribe?',
    opciones: ['Isla de San Andrés', 'Isla Gorgona', 'Isla Barú', 'Isla Providencia'],
    correcta: 0,
    explicacion: 'San Andrés es la isla más extensa del archipiélago y cuenta con una superficie de 26 km².'
  },
  {
    id: 10,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Qué cañón colombiano es considerado uno de los más profundos del mundo y está ubicado en Santander?',
    opciones: ['Cañón del Combeima', 'Cañón del Chicamocha', 'Cañón del Cauca', 'Cañón de Saturban'],
    correcta: 1,
    explicacion: 'El cañón del Chicamocha tiene una profundidad promedio de 2.000 metros y es un ícono geográfico de Santander.'
  },
  {
    id: 11,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Con cuál de estos países NO tiene frontera terrestre Colombia?',
    opciones: ['Venezuela', 'Brasil', 'Bolivia', 'Ecuador'],
    correcta: 2,
    explicacion: 'Colombia limita por tierra con Panamá, Venezuela, Brasil, Perú y Ecuador; no tiene frontera con Bolivia.'
  },

  // ==========================================
  // HISTORIA (11 Preguntas)
  // ==========================================
  {
    id: 12,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué año se firmó el Acta de la Independencia de Colombia?',
    opciones: ['1819', '1810', '1830', '1492'],
    correcta: 1,
    explicacion: 'El 20 de julio de 1810 ocurrió el grito de independencia de la Nueva Granada tras el suceso del florero de Llorente.'
  },
  {
    id: 13,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué batalla, librada el 7 de agosto de 1819, se selló definitivamente la independencia de la Nueva Granada?',
    opciones: ['Batalla del Pantano de Vargas', 'Batalla de Boyacá', 'Batalla de Carabobo', 'Batalla de Pichincha'],
    correcta: 1,
    explicacion: 'La Batalla de Boyacá, en el puente del mismo nombre, consolidó la liberación militar sobre el ejército realista.'
  },
  {
    id: 14,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Quién fue la heroína neogranadina fusilada en 1817 por espiar para los patriotas independentistas?',
    opciones: ['Manuela Sáenz', 'Policarpa Salavarrieta', 'Antonia Santos', 'Mercedes Ábrego'],
    correcta: 1,
    explicacion: 'Policarpa Salavarrieta ("La Pola") fue una espía clave de las tropas patriotas y fue fusilada el 14 de noviembre de 1817.'
  },
  {
    id: 15,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿En qué año se separó Panamá de Colombia con apoyo de Estados Unidos?',
    opciones: ['1898', '1903', '1910', '1924'],
    correcta: 1,
    explicacion: 'El 3 de noviembre de 1903 se proclamó la separación de Panamá, facilitada por las negociaciones del canal interoceánico.'
  },
  {
    id: 16,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Quién es conocido en la historia republicana como "El Libertador" de Colombia, Venezuela, Ecuador, Perú y Bolivia?',
    opciones: ['Francisco de Paula Santander', 'Simón Bolívar', 'Antonio Nariño', 'Camilo Torres'],
    correcta: 1,
    explicacion: 'Simón Bolívar lideró las campañas emancipadoras y presidió la Gran Colombia.'
  },
  {
    id: 17,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué prócer de la independencia tradujo e imprimió por primera vez en castellano los Derechos del Hombre y del Ciudadano?',
    opciones: ['Antonio Nariño', 'José Celestino Mutis', 'Francisco José de Caldas', 'Simón Rodríguez'],
    correcta: 0,
    explicacion: 'Antonio Nariño tradujo del francés los Derechos del Hombre en 1793, motivo por el cual fue encarcelado por la corona española.'
  },
  {
    id: 18,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Qué conflicto bélico civil asoló a Colombia entre 1899 y 1902?',
    opciones: ['La Guerra de los Supremos', 'La Guerra de los Mil Días', 'La Guerra Civil de 1885', 'El Bogotazo'],
    correcta: 1,
    explicacion: 'La Guerra de los Mil Días fue un conflicto civil devastador entre liberales y conservadores que debilitó al país.'
  },
  {
    id: 19,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿En qué año fue promulgada la actual Constitución Política de Colombia que reemplazó a la de 1886?',
    opciones: ['1986', '1989', '1991', '1994'],
    correcta: 2,
    explicacion: 'La Asamblea Nacional Constituyente promulgó la Constitución Política vigente el 4 de julio de 1991.'
  },
  {
    id: 20,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Qué célebre líder político fue asesinado en Bogotá el 9 de abril de 1948, desatando "El Bogotazo"?',
    opciones: ['Luis Carlos Galán', 'Jorge Eliécer Gaitán', 'Alfonso López Pumarejo', 'Gustavo Rojas Pinilla'],
    correcta: 1,
    explicacion: 'El magnicidio de Jorge Eliécer Gaitán provocó una insurrección popular masiva conocida como El Bogotazo.'
  },
  {
    id: 21,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Cómo se llamó la expedición científica del siglo XVIII encargada de clasificar la flora neogranadina dirigida por José Celestino Mutis?',
    opciones: [
      'Expedición Botánica',
      'Misión Corográfica',
      'Expedición del Orinoco',
      'Misión Geodésica'
    ],
    correcta: 0,
    explicacion: 'La Real Expedición Botánica del Nuevo Reino de Granada (1783) registró miles de especies vegetales y saberes del territorio.'
  },
  {
    id: 22,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿A qué general se le conoce históricamente como "El Hombre de las Leyes" y organizó el Estado civil de la República?',
    opciones: ['Hermógenes Maza', 'Francisco de Paula Santander', 'José María Córdova', 'Custodio García Rovira'],
    correcta: 1,
    explicacion: 'Francisco de Paula Santander fue vicepresidente de la Gran Colombia y sentó las bases del sistema legal y educativo.'
  },

  // ==========================================
  // CULTURA Y TRADICIONES (11 Preguntas)
  // ==========================================
  {
    id: 23,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad caribeña se celebra el Carnaval declarado Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad por la UNESCO?',
    opciones: ['Santa Marta', 'Cartagena', 'Barranquilla', 'Valledupar'],
    correcta: 2,
    explicacion: 'El Carnaval de Barranquilla es la fiesta folclórica más representativa de Colombia y reconocida por la UNESCO.'
  },
  {
    id: 24,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué escritor colombiano recibió el Premio Nobel de Literatura en 1982 por su obra "Cien años de soledad"?',
    opciones: ['Álvaro Mutis', 'Gabriel García Márquez', 'Rafael Pombo', 'Jorge Isaacs'],
    correcta: 1,
    explicacion: 'Gabriel García Márquez ("Gabo"), nacido en Aracataca, es la máxima figura literaria del realismo mágico.'
  },
  {
    id: 25,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Cuál es el ritmo musical tradicional del Caribe colombiano que se toca con acordeón, caja y guacharaca?',
    opciones: ['Cumbia', 'Vallenato', 'Porro', 'Bambuco'],
    correcta: 1,
    explicacion: 'El Vallenato tradicional es interpretado con este trío de instrumentos y tiene su cuna en Valledupar.'
  },
  {
    id: 26,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué famoso pintor y escultor colombiano de Medellín se caracteriza por representar figuras humanas y animales con volumen exuberante?',
    opciones: ['Fernando Botero', 'Alejandro Obregón', 'David Manzur', 'Enrique Grau'],
    correcta: 0,
    explicacion: 'Fernando Botero creó el estilo inconfundible llamado "boterismo", conocido mundialmente por sus formas voluminosas.'
  },
  {
    id: 27,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad colombiana se realiza cada año la tradicional "Feria de las Flores" y el Desfile de Silleteros?',
    opciones: ['Pereira', 'Manizales', 'Medellín', 'Armenia'],
    correcta: 2,
    explicacion: 'Medellín celebra anualmente en agosto la Feria de las Flores en homenaje a los campesinos silleteros de Santa Elena.'
  },
  {
    id: 28,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el único festival de música andina colombiana que se celebra en Ginebra (Valle del Cauca) y es insignia del tiple y la bandola?',
    opciones: ['Festival Mono Núñez', 'Festival del Pasillo', 'Festival de la Leyenda Vallenata', 'Festival Folclórico del Tolima'],
    correcta: 0,
    explicacion: 'El Festival de Música Andina Colombiana Mono Núñez es el más importante certamen de música tradicional andina.'
  },
  {
    id: 29,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Cuál es el plato tradicional antioqueño que incluye frijoles, arroz, chicharrón, carne molida, huevo frito, tajada de plátano, arepa y aguacate?',
    opciones: ['Ajiaco', 'Bandeja Paisa', 'Mute santandereano', 'Sancocho trifásico'],
    correcta: 1,
    explicacion: 'La Bandeja Paisa es el plato insignia de la región andina antioqueña y el Eje Cafetero.'
  },
  {
    id: 30,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿Qué sopa típica bogotana se prepara con pollo, tres tipos de papas (criolla, pastusa y sabanera), mazorca y guascas?',
    opciones: ['Mondongo', 'Ajiaco santafereño', 'Cuchuco de trigo', 'Puchero'],
    correcta: 1,
    explicacion: 'El Ajiaco es el plato más emblemático de Bogotá y su ingrediente aromático secreto son las hojas de guascas.'
  },
  {
    id: 31,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué manifestación cultural del sur de Colombia fue declarada Patrimonio de la Humanidad y se celebra a principios de enero en Pasto?',
    opciones: [
      'Carnaval de Blancos y Negros',
      'Fiesta del Sol y del Acero',
      'Festival del Viento y las Cometas',
      'Carnaval del Fuego'
    ],
    correcta: 0,
    explicacion: 'El Carnaval de Negros y Blancos en San Juan de Pasto celebra el mestizaje y la diversidad cultural de los Andes nariñenses.'
  },
  {
    id: 32,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Cuál de los siguientes es el deporte tradicional autóctono y nacional oficial de Colombia según la ley?',
    opciones: ['Chaza', 'Tejo (Turmequé)', 'Coleo', 'Bolirrana'],
    correcta: 1,
    explicacion: 'El Tejo (o Turmequé) de origen prehispánico chibcha fue declarado deporte nacional oficial de Colombia por la Ley 613 del 2000.'
  },
  {
    id: 33,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué instrumento de percusión indígena hecho con una caña hueca ranurada es fundamental en la cumbia y el vallenato?',
    opciones: ['Guache', 'Guacharaca', 'Maracas', 'Marimba de chonta'],
    correcta: 1,
    explicacion: 'La guacharaca fue creada por los indígenas taironas y es parte esencial del vallenato y la cumbia tradicional.'
  },

  // ==========================================
  // DEPORTES (11 Preguntas)
  // ==========================================
  {
    id: 34,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué ciclista colombiano ganó el Tour de Francia en 2019, siendo el primer latinoamericano en lograrlo?',
    opciones: ['Nairo Quintana', 'Egan Bernal', 'Rigoberto Urán', 'Lucho Herrera'],
    correcta: 1,
    explicacion: 'Egan Bernal hizo historia al coronarse campeón del Tour de Francia 2019 a la edad de 22 años.'
  },
  {
    id: 35,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué atleta colombiana ganó medalla de oro en salto triple en los Juegos Olímpicos de Río 2016?',
    opciones: ['Mariana Pajón', 'Caterine Ibargüen', 'María Isabel Urrutia', 'Ximena Restrepo'],
    correcta: 1,
    explicacion: 'Caterine Ibargüen dominó el salto triple internacional logrando el oro olímpico en Río de Janeiro 2016.'
  },
  {
    id: 36,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿En qué disciplina deportiva se consagró campeona olímpica Mariana Pajón en Londres 2012 y Río 2016?',
    opciones: ['Patinaje de carreras', 'Ciclismo BMX', 'Tiro con arco', 'Judo'],
    correcta: 1,
    explicacion: 'Mariana Pajón, apodada "La reina del BMX", obtuvo dos oros olímpicos consecutivos en bicicrós BMX.'
  },
  {
    id: 37,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Quién fue la primera deportista en ganar una medalla de oro olímpica para Colombia (Sídney 2000 en halterofilia)?',
    opciones: ['María Isabel Urrutia', 'Mabel Mosquera', 'Leidy Solís', 'Ubaldina Valoyes'],
    correcta: 0,
    explicacion: 'María Isabel Urrutia levantó la gloria olímpica el 20 de septiembre de 2000 en levantamiento de pesas (75 kg).'
  },
  {
    id: 38,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué futbolista colombiano anotó un gol olímpico histórico a la Unión Soviética en el Mundial de Chile 1962?',
    opciones: ['Marcos Coll', 'Efraín Sánchez', 'Willington Ortiz', 'Carlos Valderrama'],
    correcta: 0,
    explicacion: 'Marcos Coll ostenta el récord de ser el único futbolista que ha marcado un gol olímpico en una Copa del Mundo de la FIFA.'
  },
  {
    id: 39,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Quién fue el máximo goleador del Mundial de Fútbol de Brasil 2014 ganando la Bota de Oro con 6 goles?',
    opciones: ['Radamel Falcao García', 'James Rodríguez', 'Teófilo Gutiérrez', 'Juan Guillermo Cuadrado'],
    correcta: 1,
    explicacion: 'James Rodríguez anotó 6 goles en Brasil 2014, incluyendo el mejor gol del torneo ante Uruguay en el Maracaná.'
  },
  {
    id: 40,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿En qué año ganó la Selección Colombia de Fútbol su primer y único título de la Copa América?',
    opciones: ['1975', '1993', '2001', '2011'],
    correcta: 2,
    explicacion: 'Colombia organizó y ganó la Copa América 2001 invicta y sin recibir un solo gol en contra, con gol decisivo de Iván Ramiro Córdoba.'
  },
  {
    id: 41,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Quién fue el primer ciclista colombiano en ganar una de las tres Grandes Vueltas (Vuelta a España 1987)?',
    opciones: ['Fabio Parra', 'Luis "Lucho" Herrera', 'Martín Emilio Cochise', 'Oliverio Rincón'],
    correcta: 1,
    explicacion: 'Lucho Herrera, "El Jardinerito de Fusagasugá", conquistó la Vuelta a España de 1987.'
  },
  {
    id: 42,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué patinadora colombiana sumó más de 20 títulos mundiales y es la mayor leyenda histórica del patinaje sobre ruedas?',
    opciones: ['Cecilia "Chechi" Baena', 'Fabriana Arias', 'Luz Mery Tristán', 'Kelly Martínez'],
    correcta: 0,
    explicacion: 'La "Chechi" Baena es múltiple campeona del mundo y llevó al patinaje colombiano a la cúspide mundial.'
  },
  {
    id: 43,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Qué club de fútbol colombiano ganó la Copa Libertadores de América por primera vez en el año 1989?',
    opciones: ['América de Cali', 'Atlético Nacional', 'Millonarios', 'Once Caldas'],
    correcta: 1,
    explicacion: 'Atlético Nacional, dirigido por Francisco Maturana, se coronó campeón de la Copa Libertadores en 1989.'
  },
  {
    id: 44,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Qué famoso portero colombiano patentó la jugada acrobática de "El Escorpión" en el estadio de Wembley en 1995?',
    opciones: ['Óscar Córdoba', 'René Higuita', 'Faryd Mondragón', 'David Ospina'],
    correcta: 1,
    explicacion: 'René Higuita realizó "El Escorpión" el 6 de septiembre de 1995 ante Inglaterra, considerada una de las jugadas más vistosas de la historia.'
  },

  // ==========================================
  // CIENCIA Y NATURALEZA (11 Preguntas)
  // ==========================================
  {
    id: 45,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es el ave nacional de Colombia que aparece representada en el Escudo de Armas?',
    opciones: ['Guacamaya bandera', 'Cóndor de los Andes', 'Colibrí ermitaño', 'Tucán toco'],
    correcta: 1,
    explicacion: 'El Cóndor de los Andes es el ave nacional y simboliza la libertad y la soberanía sobre las alturas andinas.'
  },
  {
    id: 46,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es la flor nacional oficial de Colombia?',
    opciones: ['Orquídea Cattleya trianae', 'Rosa silvestre', 'Heliconia rostrata', 'Girasol'],
    correcta: 0,
    explicacion: 'La Cattleya trianae fue elegida como flor nacional en 1936 por su belleza y distribución endémica.'
  },
  {
    id: 47,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es el árbol nacional de Colombia, que puede superar los 60 metros de altura en el Valle de Cocora?',
    opciones: ['Ceiba bonga', 'Palma de Cera del Quindío', 'Guayacán amarillo', 'Roble andino'],
    correcta: 1,
    explicacion: 'La Palma de Cera (Ceroxylon quindiuense) es la palmera más alta del planeta y el árbol nacional de Colombia.'
  },
  {
    id: 48,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Qué río colombiano en la Sierra de la Macarena es conocido popularmente como "El río de los siete colores"?',
    opciones: ['Caño Cristales', 'Río Inírida', 'Río Guaviare', 'Caño Canoas'],
    correcta: 0,
    explicacion: 'Caño Cristales debe sus vivos colores a la planta acuática endémica Macarenia clavigera que florece bajo el agua.'
  },
  {
    id: 49,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Qué ecosistema de alta montaña, del cual Colombia alberga más del 50% de la existencia mundial, es la principal fábrica de agua?',
    opciones: ['Páramo', 'Selva húmeda tropical', 'Bosque seco tropical', 'Manglar'],
    correcta: 0,
    explicacion: 'Los páramos andinos son reservorios hídricos vitales cubiertos de frailejones que regulan el ciclo del agua.'
  },
  {
    id: 50,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Cuál es el páramo más grande del mundo, ubicado en los departamentos de Cundinamarca, Meta y Huila?',
    opciones: ['Páramo de Santurbán', 'Páramo de Sumapaz', 'Páramo de Chingaza', 'Páramo de Rabanal'],
    correcta: 1,
    explicacion: 'El Páramo de Sumapaz tiene más de 333.000 hectáreas y es la mayor extensión de páramo del planeta.'
  },
  {
    id: 51,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿En qué grupo de seres vivos Colombia ocupa el primer puesto mundial en diversidad de especies?',
    opciones: ['Aves y orquídeas', 'Mamíferos marinos', 'Pingüinos', 'Pinos templados'],
    correcta: 0,
    explicacion: 'Colombia es el país número 1 del planeta en diversidad de aves (más de 1.950 especies) y orquídeas (más de 4.000 especies).'
  },
  {
    id: 52,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Qué anfibio endémico de la costa pacífica colombiana es considerado el vertebrado más venenoso del planeta?',
    opciones: ['Rana dardo dorada (Phyllobates terribilis)', 'Sapo gigante neotropical', 'Rana de cristal', 'Salamandra andina'],
    correcta: 0,
    explicacion: 'La rana Phyllobates terribilis secreta batracotoxina, suficiente en un solo espécimen para matar a 10 personas.'
  },
  {
    id: 53,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Qué científico e inmunólogo colombiano sintetizó en 1987 la primera vacuna sintética contra la malaria (SPf66)?',
    opciones: ['Manuel Elkin Patarroyo', 'Rodolfo Llinás', 'Jorge Reynolds Pombo', 'Salomón Hakim'],
    correcta: 0,
    explicacion: 'Manuel Elkin Patarroyo desarrolló la vacuna SPf66 y donó su patente a la Organización Mundial de la Salud (OMS).'
  },
  {
    id: 54,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Qué neurocientífico colombiano descubrió la oscilación dendrítica y propuso la "Ley de Llinás" sobre el funcionamiento neuronal?',
    opciones: ['Rodolfo Llinás', 'Manuel Elkin Patarroyo', 'Salomón Hakim', 'Andrés Hurtado'],
    correcta: 0,
    explicacion: 'Rodolfo Llinás es uno de los padres de la neurociencia contemporánea y exdirector del departamento de fisiología de la NYU.'
  },
  {
    id: 55,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Qué planta emblemática de los páramos colombianos retiene el agua de la neblina con sus hojas afelpadas?',
    opciones: ['Frailejón (Espeletia)', 'Helecho arborescente', 'Eucalipto', 'Pino pátula'],
    correcta: 0,
    explicacion: 'Los frailejones son plantas endémicas de páramo indispensables para captar y filtrar el agua de las nubes.'
  }
];

// Hacer PREGUNTAS accesible globalmente o exportable
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PREGUNTAS };
}
