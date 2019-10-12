export const generatePhotoUrl = (photoId, size = "thumbnails") => {
  return `https://s3-us-west-2.amazonaws.com/www.nolaneverafter.com/photos/${size}/nolaneverafter${photoId}.jpg`;
};

export const loadPhoto = src => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, src, height: img.height });
    img.onerror = () => resolve({});
    img.src = src;
  });
};
