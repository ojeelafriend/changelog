export type tag = {
  id: number;
  creation: string;
  title: string;
  body?: string;
  image?: string;
  author: string;
};

/*
  El interprete se encargará de recolectar la información del .md
  Aprovechando la imagen de portada (en caso de que exista)

  La única RegExp utilizada sirve para separar la imagen del content.

  Existen dos tipos de lecturas del .md en la sección de tags de GitHub:
  
  * one (lee un solo tag) | * all (lee todos los tags);
*/

export const read = (type: 'one' | 'all', wrapper: any): tag | tag[] => {
  const regExp = /\!\[.*?\]\((.*?)\)([\s\S]*)/;

  if (type === 'one') {
    //extrae la imagen
    const match = wrapper.body.match(regExp);

    //extrae el contenido texto.
    const imageUrl = match ? match[1] : null;

    //matchea todo el body aqui se suele encontrar los comandos en el .md del tag.
    const remainingText = match ? match[2].trim() : wrapper.body;

    const tag: tag = {
      id: 1,
      title: wrapper.name || 'Unknown',
      body: remainingText || 'Missing',
      author: wrapper.author.login,
      image: imageUrl,
      creation: `${new Date(wrapper.published_at).toLocaleDateString()}`,
    };

    return tag;
  }
  //extrae la imagen

  let tags: tag[] = [];

  for (const item of wrapper) {
    const match = item.body.match(regExp);

    //extrae el contenido texto.
    const imageUrl = match ? match[1] : null;

    //matchea todo el body aqui se suele encontrar los comandos en el .md del tag.
    const remainingText = match ? match[2].trim() : item.body;

    tags = [
      ...tags,
      {
        id: item.id,
        title: item.name || 'Unknown',
        body: remainingText || 'Missing',
        author: item.author.login,
        image: imageUrl,
        creation: `${new Date(wrapper.published_at).toLocaleDateString()}`,
      },
    ];
  }

  return tags;
};
