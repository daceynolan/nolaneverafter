import download from "downloadjs";

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

export const downloadPhoto = src => {
  const request = new XMLHttpRequest();
  const filename = src.substring(src.lastIndexOf("/") + 1);
  request.open("GET", src, true);
  request.responseType = "blob";
  request.onload = event => {
    download(event.target.response, filename, "image/jpg");
  };
  request.send();
};
