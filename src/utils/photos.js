export const generatePhotoUrl = (index, size = "thumbnails") => {
  return `https://s3-us-west-2.amazonaws.com/www.nolaneverafter.com/photos/${size}/nolaneverafter${index +
    1}.jpg`;
};

export const loadPhoto = src => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ img, src });
    img.onerror = () => resolve({ img: {}, src });
    img.src = src;
  }).then(photo => ({
    src: photo.src,
    width: photo.img.width,
    height: photo.img.height
  }));
};
