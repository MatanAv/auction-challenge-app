const getImageURL = (imagePath: string) => new URL(imagePath, import.meta.url).href;

const getSlideUrlById = (id: number) => getImageURL(`../assets/slides/slide-${id}.jpg`);

export { getSlideUrlById };
