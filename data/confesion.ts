import type { Chapter } from '../types';

export const confessionData: Chapter[] = [
  {
    chapter: 0,
    title: "Prefacio",
    paragraphs: [
      {
        paragraph: 1,
        text: "Al Lector Juicioso e Imparcial.",
        proofs: []
      },
      {
        paragraph: 2,
        text: "Amable lector, hace ya muchos años que deseábamos ver una confesión de fe publicada por aquellos que son llamados (aunque injustamente) anabaptistas. Lo que nos ha llevado, con la mayor presteza, a emprender esta tarea es, en primer lugar, el bien de muchos a quienes el prejuicio podría exponer a cometer el error de concebir ideas equivocadas de nuestras doctrinas y prácticas (ya que hemos sido representados muy falsamente por algunos hombres de nota que se han tomado la libertad de cargarnos con opiniones que no nos pertenecen), y también, para dar cuenta de nuestras convicciones a fin de que aquellos que no creen lo que profesamos puedan ser instruidos en la verdad y no ser engañados por los falsos informes que puedan haber recibido. Además, estamos persuadidos de que esto sería útil para que aquellos que están bajo nuestra enseñanza puedan tener un resumen de la verdad a la mano y no se dejen llevar por todo viento de doctrina.",
        proofs: []
      },
      {
        paragraph: 3,
        text: "No nos hemos avergonzado de tomar la Confesión de Westminster y la de Savoy como nuestro modelo, ya que hemos considerado necesario mostrar nuestro acuerdo con ellos en todos los artículos fundamentales de la religión cristiana. De hecho, hemos adoptado las mismas palabras en la mayoría de los casos. Lo hemos hecho para convencer a todos de que no tenemos ningún deseo de estancar la religión con nuevas palabras, sino que aceptamos de buen grado esa forma de palabras que ha sido utilizada por otros antes que nosotros para expresar esa fe que es la misma para todos. Y así manifestamos nuestro acuerdo de corazón con ellos en esa sana doctrina protestante que, con tan clara evidencia de las Escrituras, han afirmado.",
        proofs: []
      }
    ]
  },
  {
    chapter: 1,
    title: "De las Sagradas Escrituras",
    paragraphs: [
      {
        paragraph: 1,
        text: "Las Santas Escrituras son la única regla suficiente, segura e infalible de todo conocimiento, fe y obediencia para la salvación.{a} Aunque la luz de la naturaleza y las obras de la creación y la providencia manifiestan la bondad, la sabiduría y el poder de Dios, de tal manera que los hombres quedan sin excusa,{b} sin embargo, no son suficientes para dar aquel conocimiento de Dios y de su voluntad que es necesario para la salvación.{c} Por lo tanto, agradó al Señor, en distintas épocas y de diversas maneras, revelarse a sí mismo y declarar su voluntad a su Iglesia;{d} y posteriormente, para la mejor preservación y propagación de la verdad, y para el más seguro establecimiento y consuelo de la Iglesia contra la corrupción de la carne y la malicia de Satanás y del mundo, le agradó dejar esa revelación por escrito;{e} lo cual hace a las Santas Escrituras muy necesarias,{f} habiendo cesado ya aquellas maneras anteriores en que Dios revelaba su voluntad a su pueblo.{g}",
        proofs: [
          { 
            ref: 'a', 
            verses: ['2 Timoteo 3:15-17', 'Isaías 8:20', 'Lucas 16:29, 31', 'Efesios 2:20'],
            fullText: [
              "y que desde la niñez has sabido las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvación por la fe que es en Cristo Jesús. Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.",
              "¡A la ley y al testimonio! Si no dijeren conforme a esto, es porque no les ha amanecido.",
              "Y Abraham le dijo: A Moisés y a los profetas tienen; óiganlos. ... Mas Abraham le dijo: Si no oyen a Moisés y a los profetas, tampoco se persuadirán aunque alguno se levantare de los muertos.",
              "edificados sobre el fundamento de los apóstoles y profetas, siendo la principal piedra del ángulo Jesucristo mismo,"
            ]
          },
          { ref: 'b', verses: ['Romanos 1:19-21', 'Romanos 2:14, 15', 'Salmo 19:1-3'] },
          { ref: 'c', verses: ['1 Corintios 1:21', '1 Corintios 2:13, 14'] },
          { ref: 'd', verses: ['Hebreos 1:1'] },
          { ref: 'e', verses: ['Proverbios 22:19-21', 'Romanos 15:4', '2 Pedro 1:19, 20'] },
          { ref: 'f', verses: ['2 Timoteo 3:15', '2 Pedro 1:19'] },
          { ref: 'g', verses: ['Hebreos 1:1-2a', '1 Corintios 13:9, 10', 'Apocalipsis 22:18, 19'] }
        ]
      },
      {
        paragraph: 2,
        text: "Bajo el nombre de Santas Escrituras, o Palabra de Dios escrita, se incluyen ahora todos los libros del Antiguo y Nuevo Testamento, que son los siguientes: [lista de libros]. Todos ellos fueron dados por inspiración de Dios para ser la regla de fe y vida.{h}",
        proofs: [
            { ref: 'h', verses: ['2 Timoteo 3:16'] }
        ]
      },
       {
        paragraph: 3,
        text: "Los libros comúnmente llamados Apócrifos, no siendo de inspiración divina, no forman parte del canon o regla de la Escritura y, por lo tanto, no tienen autoridad en la Iglesia de Dios, ni deben ser aprobados o utilizados de otra manera que no sea como escritos humanos.{i}",
        proofs: [
            { ref: 'i', verses: ['Lucas 24:27, 44', 'Romanos 3:2', '2 Pedro 1:21'] }
        ]
      }
    ]
  },
  {
    chapter: 2,
    title: "De Dios y de la Santísima Trinidad",
    paragraphs: [
      {
        paragraph: 1,
        text: "El Señor nuestro Dios es un solo Dios vivo y verdadero;{a} cuya subsistencia está en sí mismo y es de sí mismo,{b} infinito en ser y perfección; cuya esencia no puede ser comprendida por nadie sino por él mismo;{c} un espíritu purísimo,{d} invisible, sin cuerpo, partes o pasiones, que es el único que tiene inmortalidad, que habita en luz inaccesible, a quien ningún hombre ha visto ni puede ver.{e} Él es inmutable,{f} inmenso,{g} eterno,{h} incomprensible, todopoderoso,{i} infinito en todos los sentidos, santísimo,{j} sapientísimo,{k} libérrimo,{l} absolutísimo,{m} que hace todas las cosas según el consejo de su propia voluntad inmutable y justísima,{n} para su propia gloria;{o} amantísimo,{p} benigno, misericordioso, longánime, abundante en bondad y verdad, que perdona la iniquidad, la transgresión y el pecado; galardonador de los que le buscan con diligencia,{q} y con todo, justísimo y terrible en sus juicios,{r} que odia todo pecado,{s} y que de ningún modo dará por inocente al culpable.{t}",
        proofs: [
          { ref: 'a', verses: ['1 Corintios 8:4, 6', 'Deuteronomio 6:4'] },
          { ref: 'b', verses: ['Jeremías 10:10', 'Isaías 48:12'] },
          { ref: 'c', verses: ['Éxodo 3:14'] },
          { ref: 'd', verses: ['Juan 4:24'] },
          { ref: 'e', verses: ['1 Timoteo 1:17', 'Deuteronomio 4:15, 16'] },
          { ref: 'f', verses: ['Malaquías 3:6'] },
          { ref: 'g', verses: ['1 Reyes 8:27', 'Jeremías 23:23'] },
          { ref: 'h', verses: ['Salmo 90:2'] },
          { ref: 'i', verses: ['Génesis 17:1'] },
          { ref: 'j', verses: ['Isaías 6:3'] },
          { ref: 'k', verses: ['Salmo 147:5'] },
          { ref: 'l', verses: ['Salmo 115:3'] },
          { ref: 'm', verses: ['Isaías 46:10'] },
          { ref: 'n', verses: ['Efesios 1:11'] },
          { ref: 'o', verses: ['Proverbios 16:4', 'Romanos 11:36'] },
          { ref: 'p', verses: ['1 Juan 4:8'] },
          { ref: 'q', verses: ['Éxodo 34:6, 7', 'Hebreos 11:6'] },
          { ref: 'r', verses: ['Nehemías 9:32, 33'] },
          { ref: 's', verses: ['Salmo 5:5, 6'] },
          { ref: 't', verses: ['Éxodo 34:7', 'Nahúm 1:2, 3'] }
        ]
      },
    ]
  }
];