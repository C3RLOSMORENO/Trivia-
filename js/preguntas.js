/**
 * Trivia Colombia - Banco de Preguntas con Imágenes y Atribución Legal
 * Cada pregunta incluye enlace de imagen educativa y crédito con licencia (Wikimedia Commons / CC / Dominio Público).
 */

const PREGUNTAS = [
  {
    "id": 1,
    "categoria": "geografia",
    "dificultad": "facil",
    "enunciado": "¿Cuál es la capital del departamento de Santander?",
    "opciones": [
      "Floridablanca",
      "Bucaramanga",
      "Girón",
      "San Gil"
    ],
    "correcta": 1,
    "explicacion": "Bucaramanga es la capital de Santander y es conocida nacionalmente como \"La Ciudad Bonita\".",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Panoramica_de_Bucaramanga.jpg/960px-Panoramica_de_Bucaramanga.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: Angel Páez Campos"
  },
  {
    "id": 2,
    "categoria": "geografia",
    "dificultad": "facil",
    "enunciado": "¿Cuál es la capital de la República de Colombia?",
    "opciones": [
      "Medellín",
      "Cali",
      "Bogotá D.C.",
      "Barranquilla"
    ],
    "correcta": 2,
    "explicacion": "Bogotá D.C. es la capital política y administrativa de Colombia desde su fundación en 1538.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Plaza_de_Bol%C3%ADvar_en_Bogot%C3%A1_%28Colombia%29.jpg/960px-Plaza_de_Bol%C3%ADvar_en_Bogot%C3%A1_%28Colombia%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: Javierleiva"
  },
  {
    "id": 3,
    "categoria": "geografia",
    "dificultad": "medio",
    "enunciado": "¿Cuál es el principal río de Colombia, que recorre el país de sur a norte desembocando en el mar Caribe?",
    "opciones": [
      "Río Cauca",
      "Río Magdalena",
      "Río Atrato",
      "Río Meta"
    ],
    "correcta": 1,
    "explicacion": "El río Magdalena es la principal arteria fluvial de Colombia, con una longitud de más de 1.500 km.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/R%C3%ADo_Magdalena%2C_Colombia_03.jpg/960px-R%C3%ADo_Magdalena%2C_Colombia_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: Bernard Gagnon"
  },
  {
    "id": 4,
    "categoria": "geografia",
    "dificultad": "medio",
    "enunciado": "¿Cuántos departamentos conforman el territorio de Colombia?",
    "opciones": [
      "30 departamentos",
      "32 departamentos",
      "34 departamentos",
      "28 departamentos"
    ],
    "correcta": 1,
    "explicacion": "Colombia está dividida territorialmente en 32 departamentos y un Distrito Capital (Bogotá).",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Mapa_de_los_departamentos_de_Colombia_32.png/960px-Mapa_de_los_departamentos_de_Colombia_32.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: User:F3rn4nd0"
  },
  {
    "id": 5,
    "categoria": "geografia",
    "dificultad": "medio",
    "enunciado": "¿Cuáles son los dos océanos que bañan las costas colombianas?",
    "opciones": [
      "Atlántico (Mar Caribe) y Pacífico",
      "Atlántico e Índico",
      "Pacífico y Ártico",
      "Caribe y Antártico"
    ],
    "correcta": 0,
    "explicacion": "Colombia es el único país de América del Sur que cuenta con costas sobre el Mar Caribe (Atlántico) y el Océano Pacífico.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Parque_Nacional_Natural_Tayrona_10.jpg/960px-Parque_Nacional_Natural_Tayrona_10.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: Diana Sierra from Bogotá, Colombia"
  },
  {
    "id": 6,
    "categoria": "geografia",
    "dificultad": "dificil",
    "enunciado": "¿Cuál es el punto continental más septentrional (más al norte) de Colombia y de América del Sur?",
    "opciones": [
      "Cabo Manglares",
      "Punta Gallinas",
      "Quebrada San Antonio",
      "Cabo de la Vela"
    ],
    "correcta": 1,
    "explicacion": "Punta Gallinas, ubicada en la península de La Guajira, es el extremo norte de Colombia y de Suramérica.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Punta_Gallinas_%281631811584%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: LUIS ANGEL CAMARGO from Bogotá, ..."
  },
  {
    "id": 7,
    "categoria": "geografia",
    "dificultad": "dificil",
    "enunciado": "¿Cuál es el pico más alto de Colombia, superando los 5.700 metros sobre el nivel del mar?",
    "opciones": [
      "Nevado del Huila",
      "Pico Cristóbal Colón",
      "Nevado del Ruiz",
      "Pico Pan de Azúcar"
    ],
    "correcta": 1,
    "explicacion": "El Pico Cristóbal Colón (y el Simón Bolívar), en la Sierra Nevada de Santa Marta, son las cumbres más elevadas con ~5.775 msnm.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/5/52/Sierra_Nevada_de_Santa_Marta_desde_el_espacio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain"
  },
  {
    "id": 8,
    "categoria": "geografia",
    "dificultad": "facil",
    "enunciado": "¿En qué región natural colombiana se encuentra ubicado el departamento de Antioquia?",
    "opciones": [
      "Región Amazónica",
      "Región Andina",
      "Región Orinoquía",
      "Región Pacífica"
    ],
    "correcta": 1,
    "explicacion": "Antioquia se encuentra en la cordillera Central y Occidental, dentro de la Región Andina.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Cattle_in_Los_Llanos%2C_Colombia_by_Luis_Perez.jpg/960px-Cattle_in_Los_Llanos%2C_Colombia_by_Luis_Perez.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 2.0 • Foto: Luis Pérez from Medellin, Colombia"
  },
  {
    "id": 9,
    "categoria": "geografia",
    "dificultad": "medio",
    "enunciado": "¿Cuál es la isla continental/marítima colombiana más grande en el mar Caribe?",
    "opciones": [
      "Isla de San Andrés",
      "Isla Gorgona",
      "Isla Barú",
      "Isla Providencia"
    ],
    "correcta": 0,
    "explicacion": "San Andrés es la isla más extensa del archipiélago y cuenta con una superficie de 26 km².",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Matr%C3%ADcula_automovil%C3%ADstica_Colombia_2008_San_Andr%C3%A9s_Isla_YAZ%E2%80%A2714_Servicio_P%C3%BAblico_o_Especial.jpg/960px-Matr%C3%ADcula_automovil%C3%ADstica_Colombia_2008_San_Andr%C3%A9s_Isla_YAZ%E2%80%A2714_Servicio_P%C3%BAblico_o_Especial.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: Jerry \"Woody\" from Edmonton, Canada"
  },
  {
    "id": 10,
    "categoria": "geografia",
    "dificultad": "dificil",
    "enunciado": "¿Qué cañón colombiano es considerado uno de los más profundos del mundo y está ubicado en Santander?",
    "opciones": [
      "Cañón del Combeima",
      "Cañón del Chicamocha",
      "Cañón del Cauca",
      "Cañón de Saturban"
    ],
    "correcta": 1,
    "explicacion": "El cañón del Chicamocha tiene una profundidad promedio de 2.000 metros y es un ícono geográfico de Santander.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Ca%C3%B1%C3%B3n_del_R%C3%ADo_Chicamocha_01.jpg/960px-Ca%C3%B1%C3%B3n_del_R%C3%ADo_Chicamocha_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: Bernard Gagnon"
  },
  {
    "id": 11,
    "categoria": "geografia",
    "dificultad": "facil",
    "enunciado": "¿Con cuál de estos países NO tiene frontera terrestre Colombia?",
    "opciones": [
      "Venezuela",
      "Brasil",
      "Bolivia",
      "Ecuador"
    ],
    "correcta": 2,
    "explicacion": "Colombia limita por tierra con Panamá, Venezuela, Brasil, Perú y Ecuador; no tiene frontera con Bolivia.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Colombia_Mapa_Oficial.svg/960px-Colombia_Mapa_Oficial.svg.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: Milenioscuro"
  },
  {
    "id": 12,
    "categoria": "historia",
    "dificultad": "facil",
    "enunciado": "¿En qué año se firmó el Acta de la Independencia de Colombia?",
    "opciones": [
      "1819",
      "1810",
      "1830",
      "1492"
    ],
    "correcta": 1,
    "explicacion": "El 20 de julio de 1810 ocurrió el grito de independencia de la Nueva Granada tras el suceso del florero de Llorente.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Casa_del_Florero.jpg/960px-Casa_del_Florero.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: Felipe Restrepo Acosta"
  },
  {
    "id": 13,
    "categoria": "historia",
    "dificultad": "facil",
    "enunciado": "¿En qué batalla, librada el 7 de agosto de 1819, se selló definitivamente la independencia de la Nueva Granada?",
    "opciones": [
      "Batalla del Pantano de Vargas",
      "Batalla de Boyacá",
      "Batalla de Carabobo",
      "Batalla de Pichincha"
    ],
    "correcta": 1,
    "explicacion": "La Batalla de Boyacá, en el puente del mismo nombre, consolidó la liberación militar sobre el ejército realista.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/1/16/Puente_de_Boyac%C3%A1%2C_Tunja_%28Boyac%C3%A1%29.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: Tato74"
  },
  {
    "id": 14,
    "categoria": "historia",
    "dificultad": "medio",
    "enunciado": "¿Quién fue la heroína neogranadina fusilada en 1817 por espiar para los patriotas independentistas?",
    "opciones": [
      "Manuela Sáenz",
      "Policarpa Salavarrieta",
      "Antonia Santos",
      "Mercedes Ábrego"
    ],
    "correcta": 1,
    "explicacion": "Policarpa Salavarrieta (\"La Pola\") fue una espía clave de las tropas patriotas y fue fusilada el 14 de noviembre de 1817.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/b/b1/La_Hero%C3%ADna_Policarpa_Salavarrieta.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: L, Lara S."
  },
  {
    "id": 15,
    "categoria": "historia",
    "dificultad": "medio",
    "enunciado": "¿En qué año se separó Panamá de Colombia con apoyo de Estados Unidos?",
    "opciones": [
      "1898",
      "1903",
      "1910",
      "1924"
    ],
    "correcta": 1,
    "explicacion": "El 3 de noviembre de 1903 se proclamó la separación de Panamá, facilitada por las negociaciones del canal interoceánico.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Panama_canal_cartoon_1903.jpg/960px-Panama_canal_cartoon_1903.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: unknown artist for New York Times"
  },
  {
    "id": 16,
    "categoria": "historia",
    "dificultad": "facil",
    "enunciado": "¿Quién es conocido en la historia republicana como \"El Libertador\" de Colombia, Venezuela, Ecuador, Perú y Bolivia?",
    "opciones": [
      "Francisco de Paula Santander",
      "Simón Bolívar",
      "Antonio Nariño",
      "Camilo Torres"
    ],
    "correcta": 1,
    "explicacion": "Simón Bolívar lideró las campañas emancipadoras y presidió la Gran Colombia.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Est%C3%A1tua_Ecuestre_del_Libertador_Sim%C3%B3n_Bol%C3%ADvar_I.jpg/960px-Est%C3%A1tua_Ecuestre_del_Libertador_Sim%C3%B3n_Bol%C3%ADvar_I.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: Rjcastillo"
  },
  {
    "id": 17,
    "categoria": "historia",
    "dificultad": "medio",
    "enunciado": "¿Qué prócer de la independencia tradujo e imprimió por primera vez en castellano los Derechos del Hombre y del Ciudadano?",
    "opciones": [
      "Antonio Nariño",
      "José Celestino Mutis",
      "Francisco José de Caldas",
      "Simón Rodríguez"
    ],
    "correcta": 0,
    "explicacion": "Antonio Nariño tradujo del francés los Derechos del Hombre en 1793, motivo por el cual fue encarcelado por la corona española.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Nari%C3%B1o_by_Acevedo_Bernal.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Ricardo Acevedo Bernal"
  },
  {
    "id": 18,
    "categoria": "historia",
    "dificultad": "dificil",
    "enunciado": "¿Qué conflicto bélico civil asoló a Colombia entre 1899 y 1902?",
    "opciones": [
      "La Guerra de los Supremos",
      "La Guerra de los Mil Días",
      "La Guerra Civil de 1885",
      "El Bogotazo"
    ],
    "correcta": 1,
    "explicacion": "La Guerra de los Mil Días fue un conflicto civil devastador entre liberales y conservadores que debilitó al país.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/b/be/Thousand_Days_War.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Carlos Chahin. Original black an..."
  },
  {
    "id": 19,
    "categoria": "historia",
    "dificultad": "dificil",
    "enunciado": "¿En qué año fue promulgada la actual Constitución Política de Colombia que reemplazó a la de 1886?",
    "opciones": [
      "1986",
      "1989",
      "1991",
      "1994"
    ],
    "correcta": 2,
    "explicacion": "La Asamblea Nacional Constituyente promulgó la Constitución Política vigente el 4 de julio de 1991.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Constituci%C3%B3n_pol%C3%ADtica_de_Colombia_de_1821.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Congreso de Cúcuta de 1821"
  },
  {
    "id": 20,
    "categoria": "historia",
    "dificultad": "facil",
    "enunciado": "¿Qué célebre líder político fue asesinado en Bogotá el 9 de abril de 1948, desatando \"El Bogotazo\"?",
    "opciones": [
      "Luis Carlos Galán",
      "Jorge Eliécer Gaitán",
      "Alfonso López Pumarejo",
      "Gustavo Rojas Pinilla"
    ],
    "correcta": 1,
    "explicacion": "El magnicidio de Jorge Eliécer Gaitán provocó una insurrección popular masiva conocida como El Bogotazo.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Jorge_Eli%C3%A9cer_Gait%C3%A1n_%281936%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Revista Credencial Historia"
  },
  {
    "id": 21,
    "categoria": "historia",
    "dificultad": "dificil",
    "enunciado": "¿Cómo se llamó la expedición científica del siglo XVIII encargada de clasificar la flora neogranadina dirigida por José Celestino Mutis?",
    "opciones": [
      "Expedición Botánica",
      "Misión Corográfica",
      "Expedición del Orinoco",
      "Misión Geodésica"
    ],
    "correcta": 0,
    "explicacion": "La Real Expedición Botánica del Nuevo Reino de Granada (1783) registró miles de especies vegetales y saberes del territorio.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Jos%C3%A9_Celestino_Mutis.jpg/960px-Jos%C3%A9_Celestino_Mutis.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 4.0 • Foto: Oil painting by R. Cristobal, ca..."
  },
  {
    "id": 22,
    "categoria": "historia",
    "dificultad": "medio",
    "enunciado": "¿A qué general se le conoce históricamente como \"El Hombre de las Leyes\" y organizó el Estado civil de la República?",
    "opciones": [
      "Hermógenes Maza",
      "Francisco de Paula Santander",
      "José María Córdova",
      "Custodio García Rovira"
    ],
    "correcta": 1,
    "explicacion": "Francisco de Paula Santander fue vicepresidente de la Gran Colombia y sentó las bases del sistema legal y educativo.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Francisco_de_Paula_Santander_%28painting_by_Jos%C3%A9_Mar%C3%ADa_Espinosa%29.jpg/960px-Francisco_de_Paula_Santander_%28painting_by_Jos%C3%A9_Mar%C3%ADa_Espinosa%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: José María Espinosa"
  },
  {
    "id": 23,
    "categoria": "cultura",
    "dificultad": "medio",
    "enunciado": "¿En qué ciudad caribeña se celebra el Carnaval declarado Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad por la UNESCO?",
    "opciones": [
      "Santa Marta",
      "Cartagena",
      "Barranquilla",
      "Valledupar"
    ],
    "correcta": 2,
    "explicacion": "El Carnaval de Barranquilla es la fiesta folclórica más representativa de Colombia y reconocida por la UNESCO.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Garabato_Carnaval_de_Barranquilla.jpg/960px-Garabato_Carnaval_de_Barranquilla.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 3.0 • Foto: Jdvillalobos"
  },
  {
    "id": 24,
    "categoria": "cultura",
    "dificultad": "facil",
    "enunciado": "¿Qué escritor colombiano recibió el Premio Nobel de Literatura en 1982 por su obra \"Cien años de soledad\"?",
    "opciones": [
      "Álvaro Mutis",
      "Gabriel García Márquez",
      "Rafael Pombo",
      "Jorge Isaacs"
    ],
    "correcta": 1,
    "explicacion": "Gabriel García Márquez (\"Gabo\"), nacido en Aracataca, es la máxima figura literaria del realismo mágico.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: Jose Lara"
  },
  {
    "id": 25,
    "categoria": "cultura",
    "dificultad": "facil",
    "enunciado": "¿Cuál es el ritmo musical tradicional del Caribe colombiano que se toca con acordeón, caja y guacharaca?",
    "opciones": [
      "Cumbia",
      "Vallenato",
      "Porro",
      "Bambuco"
    ],
    "correcta": 1,
    "explicacion": "El Vallenato tradicional es interpretado con este trío de instrumentos y tiene su cuna en Valledupar.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Acorde%C3%B3n_vallenato.jpg/960px-Acorde%C3%B3n_vallenato.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Jdvillalobos"
  },
  {
    "id": 26,
    "categoria": "cultura",
    "dificultad": "medio",
    "enunciado": "¿Qué famoso pintor y escultor colombiano de Medellín se caracteriza por representar figuras humanas y animales con volumen exuberante?",
    "opciones": [
      "Fernando Botero",
      "Alejandro Obregón",
      "David Manzur",
      "Enrique Grau"
    ],
    "correcta": 0,
    "explicacion": "Fernando Botero creó el estilo inconfundible llamado \"boterismo\", conocido mundialmente por sus formas voluminosas.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Medell%C3%ADn%2C_Plaza_Botero%2C_2023-07_CN-01.jpg/960px-Medell%C3%ADn%2C_Plaza_Botero%2C_2023-07_CN-01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: Steffen Schmitz (more photos)"
  },
  {
    "id": 27,
    "categoria": "cultura",
    "dificultad": "medio",
    "enunciado": "¿En qué ciudad colombiana se realiza cada año la tradicional \"Feria de las Flores\" y el Desfile de Silleteros?",
    "opciones": [
      "Pereira",
      "Manizales",
      "Medellín",
      "Armenia"
    ],
    "correcta": 2,
    "explicacion": "Medellín celebra anualmente en agosto la Feria de las Flores en homenaje a los campesinos silleteros de Santa Elena.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Desfile_de_Silleteros2007-%289%29Medellin.JPG/960px-Desfile_de_Silleteros2007-%289%29Medellin.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.5 • Foto: SajoR"
  },
  {
    "id": 28,
    "categoria": "cultura",
    "dificultad": "dificil",
    "enunciado": "¿Cuál es el único festival de música andina colombiana que se celebra en Ginebra (Valle del Cauca) y es insignia del tiple y la bandola?",
    "opciones": [
      "Festival Mono Núñez",
      "Festival del Pasillo",
      "Festival de la Leyenda Vallenata",
      "Festival Folclórico del Tolima"
    ],
    "correcta": 0,
    "explicacion": "El Festival de Música Andina Colombiana Mono Núñez es el más importante certamen de música tradicional andina.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/9/9d/Bandola_andina_columbiana.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY 3.0 • Foto: Emma dusepo"
  },
  {
    "id": 29,
    "categoria": "cultura",
    "dificultad": "facil",
    "enunciado": "¿Cuál es el plato tradicional antioqueño que incluye frijoles, arroz, chicharrón, carne molida, huevo frito, tajada de plátano, arepa y aguacate?",
    "opciones": [
      "Ajiaco",
      "Bandeja Paisa",
      "Mute santandereano",
      "Sancocho trifásico"
    ],
    "correcta": 1,
    "explicacion": "La Bandeja Paisa es el plato insignia de la región andina antioqueña y el Eje Cafetero.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Bandeja_paisa_antioque%C3%B1a%2C_Colombia.jpg/960px-Bandeja_paisa_antioque%C3%B1a%2C_Colombia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: Matt Lemmon from Colorado, USA"
  },
  {
    "id": 30,
    "categoria": "cultura",
    "dificultad": "medio",
    "enunciado": "¿Qué sopa típica bogotana se prepara con pollo, tres tipos de papas (criolla, pastusa y sabanera), mazorca y guascas?",
    "opciones": [
      "Mondongo",
      "Ajiaco santafereño",
      "Cuchuco de trigo",
      "Puchero"
    ],
    "correcta": 1,
    "explicacion": "El Ajiaco es el plato más emblemático de Bogotá y su ingrediente aromático secreto son las hojas de guascas.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Ajiaco.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: Mauricio Giraldo from Bogotá, Co..."
  },
  {
    "id": 31,
    "categoria": "cultura",
    "dificultad": "dificil",
    "enunciado": "¿Qué manifestación cultural del sur de Colombia fue declarada Patrimonio de la Humanidad y se celebra a principios de enero en Pasto?",
    "opciones": [
      "Carnaval de Blancos y Negros",
      "Fiesta del Sol y del Acero",
      "Festival del Viento y las Cometas",
      "Carnaval del Fuego"
    ],
    "correcta": 0,
    "explicacion": "El Carnaval de Negros y Blancos en San Juan de Pasto celebra el mestizaje y la diversidad cultural de los Andes nariñenses.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Talco_en_Carnaval_de_Blancos_y_Negros.jpg/960px-Talco_en_Carnaval_de_Blancos_y_Negros.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 2.0 • Foto: camiloAndres"
  },
  {
    "id": 32,
    "categoria": "cultura",
    "dificultad": "dificil",
    "enunciado": "¿Cuál de los siguientes es el deporte tradicional autóctono y nacional oficial de Colombia según la ley?",
    "opciones": [
      "Chaza",
      "Tejo (Turmequé)",
      "Coleo",
      "Bolirrana"
    ],
    "correcta": 1,
    "explicacion": "El Tejo (o Turmequé) de origen prehispánico chibcha fue declarado deporte nacional oficial de Colombia por la Ley 613 del 2000.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Tejo_entrada.jpg/960px-Tejo_entrada.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 2.0 • Foto: fabulousfabs"
  },
  {
    "id": 33,
    "categoria": "cultura",
    "dificultad": "facil",
    "enunciado": "¿Qué instrumento de percusión indígena hecho con una caña hueca ranurada es fundamental en la cumbia y el vallenato?",
    "opciones": [
      "Guache",
      "Guacharaca",
      "Maracas",
      "Marimba de chonta"
    ],
    "correcta": 1,
    "explicacion": "La guacharaca fue creada por los indígenas taironas y es parte esencial del vallenato y la cumbia tradicional.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/d/db/Guacharaca.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Zero Gravity"
  },
  {
    "id": 34,
    "categoria": "deportes",
    "dificultad": "facil",
    "enunciado": "¿Qué ciclista colombiano ganó el Tour de Francia en 2019, siendo el primer latinoamericano en lograrlo?",
    "opciones": [
      "Nairo Quintana",
      "Egan Bernal",
      "Rigoberto Urán",
      "Lucho Herrera"
    ],
    "correcta": 1,
    "explicacion": "Egan Bernal hizo historia al coronarse campeón del Tour de Francia 2019 a la edad de 22 años.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Egan_Bernal_KOERS_2019_uitsnede.jpg/960px-Egan_Bernal_KOERS_2019_uitsnede.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: Stefaan Beel"
  },
  {
    "id": 35,
    "categoria": "deportes",
    "dificultad": "medio",
    "enunciado": "¿Qué atleta colombiana ganó medalla de oro en salto triple en los Juegos Olímpicos de Río 2016?",
    "opciones": [
      "Mariana Pajón",
      "Caterine Ibargüen",
      "María Isabel Urrutia",
      "Ximena Restrepo"
    ],
    "correcta": 1,
    "explicacion": "Caterine Ibargüen dominó el salto triple internacional logrando el oro olímpico en Río de Janeiro 2016.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/8/82/Caterine_Ibarg%C3%BCen_Moscow_2013.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • GFDL • Foto: Erik van Leeuwen, attribution: E..."
  },
  {
    "id": 36,
    "categoria": "deportes",
    "dificultad": "facil",
    "enunciado": "¿En qué disciplina deportiva se consagró campeona olímpica Mariana Pajón en Londres 2012 y Río 2016?",
    "opciones": [
      "Patinaje de carreras",
      "Ciclismo BMX",
      "Tiro con arco",
      "Judo"
    ],
    "correcta": 1,
    "explicacion": "Mariana Pajón, apodada \"La reina del BMX\", obtuvo dos oros olímpicos consecutivos en bicicrós BMX.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/4/4e/MarianaPajon.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: Seleccionantioquia"
  },
  {
    "id": 37,
    "categoria": "deportes",
    "dificultad": "facil",
    "enunciado": "¿Quién fue la primera deportista en ganar una medalla de oro olímpica para Colombia (Sídney 2000 en halterofilia)?",
    "opciones": [
      "María Isabel Urrutia",
      "Mabel Mosquera",
      "Leidy Solís",
      "Ubaldina Valoyes"
    ],
    "correcta": 0,
    "explicacion": "María Isabel Urrutia levantó la gloria olímpica el 20 de septiembre de 2000 en levantamiento de pesas (75 kg).",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Maria_Isabel_Urrutia.jpg/960px-Maria_Isabel_Urrutia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 3.0 • Foto: Ministerio TIC Colombia"
  },
  {
    "id": 38,
    "categoria": "deportes",
    "dificultad": "medio",
    "enunciado": "¿Qué futbolista colombiano anotó un gol olímpico histórico a la Unión Soviética en el Mundial de Chile 1962?",
    "opciones": [
      "Marcos Coll",
      "Efraín Sánchez",
      "Willington Ortiz",
      "Carlos Valderrama"
    ],
    "correcta": 0,
    "explicacion": "Marcos Coll ostenta el récord de ser el único futbolista que ha marcado un gol olímpico en una Copa del Mundo de la FIFA.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/San_Marcos_Army_Airfield_-_44-04_Classbook.pdf/page1-960px-San_Marcos_Army_Airfield_-_44-04_Classbook.pdf.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: United States Army Air Forces"
  },
  {
    "id": 39,
    "categoria": "deportes",
    "dificultad": "medio",
    "enunciado": "¿Quién fue el máximo goleador del Mundial de Fútbol de Brasil 2014 ganando la Bota de Oro con 6 goles?",
    "opciones": [
      "Radamel Falcao García",
      "James Rodríguez",
      "Teófilo Gutiérrez",
      "Juan Guillermo Cuadrado"
    ],
    "correcta": 1,
    "explicacion": "James Rodríguez anotó 6 goles en Brasil 2014, incluyendo el mejor gol del torneo ante Uruguay en el Maracaná.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/James_Roday_%282009%29.jpg/960px-James_Roday_%282009%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: Kristin Dos Santos"
  },
  {
    "id": 40,
    "categoria": "deportes",
    "dificultad": "dificil",
    "enunciado": "¿En qué año ganó la Selección Colombia de Fútbol su primer y único título de la Copa América?",
    "opciones": [
      "1975",
      "1993",
      "2001",
      "2011"
    ],
    "correcta": 2,
    "explicacion": "Colombia organizó y ganó la Copa América 2001 invicta y sin recibir un solo gol en contra, con gol decisivo de Iván Ramiro Córdoba.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/8/81/Copa_campeon_2001.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Ptownthug16"
  },
  {
    "id": 41,
    "categoria": "deportes",
    "dificultad": "medio",
    "enunciado": "¿Quién fue el primer ciclista colombiano en ganar una de las tres Grandes Vueltas (Vuelta a España 1987)?",
    "opciones": [
      "Fabio Parra",
      "Luis \"Lucho\" Herrera",
      "Martín Emilio Cochise",
      "Oliverio Rincón"
    ],
    "correcta": 1,
    "explicacion": "Lucho Herrera, \"El Jardinerito de Fusagasugá\", conquistó la Vuelta a España de 1987.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/2/25/Lucho.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: Eduardozer"
  },
  {
    "id": 42,
    "categoria": "deportes",
    "dificultad": "dificil",
    "enunciado": "¿Qué patinadora colombiana sumó más de 20 títulos mundiales y es la mayor leyenda histórica del patinaje sobre ruedas?",
    "opciones": [
      "Cecilia \"Chechi\" Baena",
      "Fabriana Arias",
      "Luz Mery Tristán",
      "Kelly Martínez"
    ],
    "correcta": 0,
    "explicacion": "La \"Chechi\" Baena es múltiple campeona del mundo y llevó al patinaje colombiano a la cúspide mundial.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/EVD-patinajedecarreras-000.ogv/250px--EVD-patinajedecarreras-000.ogv.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.5 co • Foto: User:Evdcoldeportes"
  },
  {
    "id": 43,
    "categoria": "deportes",
    "dificultad": "dificil",
    "enunciado": "¿Qué club de fútbol colombiano ganó la Copa Libertadores de América por primera vez en el año 1989?",
    "opciones": [
      "América de Cali",
      "Atlético Nacional",
      "Millonarios",
      "Once Caldas"
    ],
    "correcta": 1,
    "explicacion": "Atlético Nacional, dirigido por Francisco Maturana, se coronó campeón de la Copa Libertadores en 1989.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Recibimiento_Atletico_Nacional_2024.jpg/960px-Recibimiento_Atletico_Nacional_2024.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 4.0 • Foto: Systematyk"
  },
  {
    "id": 44,
    "categoria": "deportes",
    "dificultad": "facil",
    "enunciado": "¿Qué famoso portero colombiano patentó la jugada acrobática de \"El Escorpión\" en el estadio de Wembley en 1995?",
    "opciones": [
      "Óscar Córdoba",
      "René Higuita",
      "Faryd Mondragón",
      "David Ospina"
    ],
    "correcta": 1,
    "explicacion": "René Higuita realizó \"El Escorpión\" el 6 de septiembre de 1995 ante Inglaterra, considerada una de las jugadas más vistosas de la historia.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ren%C3%A9_Higuita%2C_2007.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Isolinamajul"
  },
  {
    "id": 45,
    "categoria": "naturaleza",
    "dificultad": "facil",
    "enunciado": "¿Cuál es el ave nacional de Colombia que aparece representada en el Escudo de Armas?",
    "opciones": [
      "Guacamaya bandera",
      "Cóndor de los Andes",
      "Colibrí ermitaño",
      "Tucán toco"
    ],
    "correcta": 1,
    "explicacion": "El Cóndor de los Andes es el ave nacional y simboliza la libertad y la soberanía sobre las alturas andinas.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Vultur_gryphus_head_%28Linnaeus%2C_1758%29.jpg/960px-Vultur_gryphus_head_%28Linnaeus%2C_1758%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 3.0 • Foto: Michael Gäbler"
  },
  {
    "id": 46,
    "categoria": "naturaleza",
    "dificultad": "facil",
    "enunciado": "¿Cuál es la flor nacional oficial de Colombia?",
    "opciones": [
      "Orquídea Cattleya trianae",
      "Rosa silvestre",
      "Heliconia rostrata",
      "Girasol"
    ],
    "correcta": 0,
    "explicacion": "La Cattleya trianae fue elegida como flor nacional en 1936 por su belleza y distribución endémica.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Cattleya_trianae.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: Arne Larsen (?)"
  },
  {
    "id": 47,
    "categoria": "naturaleza",
    "dificultad": "facil",
    "enunciado": "¿Cuál es el árbol nacional de Colombia, que puede superar los 60 metros de altura en el Valle de Cocora?",
    "opciones": [
      "Ceiba bonga",
      "Palma de Cera del Quindío",
      "Guayacán amarillo",
      "Roble andino"
    ],
    "correcta": 1,
    "explicacion": "La Palma de Cera (Ceroxylon quindiuense) es la palmera más alta del planeta y el árbol nacional de Colombia.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Valle_de_Cocora%2C_Colombia_02.jpg/960px-Valle_de_Cocora%2C_Colombia_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: Bernard Gagnon"
  },
  {
    "id": 48,
    "categoria": "naturaleza",
    "dificultad": "medio",
    "enunciado": "¿Qué río colombiano en la Sierra de la Macarena es conocido popularmente como \"El río de los siete colores\"?",
    "opciones": [
      "Caño Cristales",
      "Río Inírida",
      "Río Guaviare",
      "Caño Canoas"
    ],
    "correcta": 0,
    "explicacion": "Caño Cristales debe sus vivos colores a la planta acuática endémica Macarenia clavigera que florece bajo el agua.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Ca%C3%B1o_Cristales_01.jpg/960px-Ca%C3%B1o_Cristales_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 3.0 • Foto: Astromario"
  },
  {
    "id": 49,
    "categoria": "naturaleza",
    "dificultad": "medio",
    "enunciado": "¿Qué ecosistema de alta montaña, del cual Colombia alberga más del 50% de la existencia mundial, es la principal fábrica de agua?",
    "opciones": [
      "Páramo",
      "Selva húmeda tropical",
      "Bosque seco tropical",
      "Manglar"
    ],
    "correcta": 0,
    "explicacion": "Los páramos andinos son reservorios hídricos vitales cubiertos de frailejones que regulan el ciclo del agua.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/P%C3%A1ramo_del_Consuelo_5%2C_Boyac%C3%A1%2C_Colombia.jpg/960px-P%C3%A1ramo_del_Consuelo_5%2C_Boyac%C3%A1%2C_Colombia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: VeRdUgO PY"
  },
  {
    "id": 50,
    "categoria": "naturaleza",
    "dificultad": "medio",
    "enunciado": "¿Cuál es el páramo más grande del mundo, ubicado en los departamentos de Cundinamarca, Meta y Huila?",
    "opciones": [
      "Páramo de Santurbán",
      "Páramo de Sumapaz",
      "Páramo de Chingaza",
      "Páramo de Rabanal"
    ],
    "correcta": 1,
    "explicacion": "El Páramo de Sumapaz tiene más de 333.000 hectáreas y es la mayor extensión de páramo del planeta.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/P%C3%A1ramo_de_Sumapaz.jpg/960px-P%C3%A1ramo_de_Sumapaz.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 • Foto: Luis Alejandro Bernal Romero"
  },
  {
    "id": 51,
    "categoria": "naturaleza",
    "dificultad": "dificil",
    "enunciado": "¿En qué grupo de seres vivos Colombia ocupa el primer puesto mundial en diversidad de especies?",
    "opciones": [
      "Aves y orquídeas",
      "Mamíferos marinos",
      "Pingüinos",
      "Pinos templados"
    ],
    "correcta": 0,
    "explicacion": "Colombia es el país número 1 del planeta en diversidad de aves (más de 1.950 especies) y orquídeas (más de 4.000 especies).",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Colibr%C3%AD_Orejimorado_-_Colibri_serrirostris.jpg/960px-Colibr%C3%AD_Orejimorado_-_Colibri_serrirostris.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: Danielmoreno25"
  },
  {
    "id": 52,
    "categoria": "naturaleza",
    "dificultad": "dificil",
    "enunciado": "¿Qué anfibio endémico de la costa pacífica colombiana es considerado el vertebrado más venenoso del planeta?",
    "opciones": [
      "Rana dardo dorada (Phyllobates terribilis)",
      "Sapo gigante neotropical",
      "Rana de cristal",
      "Salamandra andina"
    ],
    "correcta": 0,
    "explicacion": "La rana Phyllobates terribilis secreta batracotoxina, suficiente en un solo espécimen para matar a 10 personas.",
    "imagen": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Schrecklicherpfeilgiftfrosch-01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 2.0 de • Foto: Wilfried Berns"
  },
  {
    "id": 53,
    "categoria": "naturaleza",
    "dificultad": "dificil",
    "enunciado": "¿Qué científico e inmunólogo colombiano sintetizó en 1987 la primera vacuna sintética contra la malaria (SPf66)?",
    "opciones": [
      "Manuel Elkin Patarroyo",
      "Rodolfo Llinás",
      "Jorge Reynolds Pombo",
      "Salomón Hakim"
    ],
    "correcta": 0,
    "explicacion": "Manuel Elkin Patarroyo desarrolló la vacuna SPf66 y donó su patente a la Organización Mundial de la Salud (OMS).",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Lehendakaria_Manuel_Patarroyo_zientzialari_kolonbiarrarekin_elkartu_da.jpg/960px-Lehendakaria_Manuel_Patarroyo_zientzialari_kolonbiarrarekin_elkartu_da.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY 2.0 • Foto: Irekia"
  },
  {
    "id": 54,
    "categoria": "naturaleza",
    "dificultad": "medio",
    "enunciado": "¿Qué neurocientífico colombiano descubrió la oscilación dendrítica y propuso la \"Ley de Llinás\" sobre el funcionamiento neuronal?",
    "opciones": [
      "Rodolfo Llinás",
      "Manuel Elkin Patarroyo",
      "Salomón Hakim",
      "Andrés Hurtado"
    ],
    "correcta": 0,
    "explicacion": "Rodolfo Llinás es uno de los padres de la neurociencia contemporánea y exdirector del departamento de fisiología de la NYU.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Rodolfo_Llin%C3%A1s_in_2010.png/960px-Rodolfo_Llin%C3%A1s_in_2010.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • Public domain • Foto: Rodolfo Llinas"
  },
  {
    "id": 55,
    "categoria": "naturaleza",
    "dificultad": "facil",
    "enunciado": "¿Qué planta emblemática de los páramos colombianos retiene el agua de la neblina con sus hojas afelpadas?",
    "opciones": [
      "Frailejón (Espeletia)",
      "Helecho arborescente",
      "Eucalipto",
      "Pino pátula"
    ],
    "correcta": 0,
    "explicacion": "Los frailejones son plantas endémicas de páramo indispensables para captar y filtrar el agua de las nubes.",
    "imagen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Frailej%C3%B3n%28Espeletia_Grandiflora%29.jpg/960px-Frailej%C3%B3n%28Espeletia_Grandiflora%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "fuenteImagen": "Wikimedia Commons • CC BY-SA 4.0 • Foto: Cam2001"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PREGUNTAS };
}
