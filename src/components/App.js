import React from "react";
import MasonryLayout from "react-masonry-layout";
const TOTAL_PHOTO_COUNT = 554;
const PHOTOS_PER_PAGE = 20;
const generatePhotoUrl = (index, size = "thumbnails") => {
  return `https://s3-us-west-2.amazonaws.com/www.nolaneverafter.com/photos/${size}/nolaneverafter${index +
    1}.jpg`;
};
class Masonry extends React.Component {
  state = {
    isLoading: true,
    photos: []
  };
  componentDidMount = () => {
    this.loadPhotos();
  };
  loadPhotos = () => {
    // Verify fetching needs to happen
    const currentPhotoCount = this.state.photos.length;
    if (currentPhotoCount >= TOTAL_PHOTO_COUNT) return;
    // Build the next set of photo urls
    this.setState({ isLoading: true });
    const nextPhotoUrls = Array(PHOTOS_PER_PAGE)
      .fill()
      .map((_, i) => {
        const newPhotoIndex = currentPhotoCount + 1 + i;
        if (newPhotoIndex < TOTAL_PHOTO_COUNT) {
          return generatePhotoUrl(currentPhotoCount + 1 + i);
        }
        return null;
      })
      .filter(Boolean);
    // Create promises for fetching photos
    const photoPromises = nextPhotoUrls.map(photoUrl => {
      return new Promise((resolve, reject) => {
        const photo = new Image();
        photo.addEventListener("load", () => resolve(photo));
        photo.addEventListener("error", () => reject());
        photo.src = photoUrl;
      });
    });
    // Wait for all promises to resolve
    Promise.all(photoPromises).finally(() => {
      this.setState({
        isLoading: false,
        photos: this.state.photos.concat(nextPhotoUrls)
      });
    });
  };
  render() {
    return (
      <div className="App">
        <MasonryLayout
          id="masonry-layout"
          infiniteScroll={this.loadPhotos}
          infiniteScrollLoading={this.state.isLoading}
          sizes={[{ columns: 4, gutter: 10 }]}
        >
          {this.state.photos.map(photoSrc => {
            return <img src={photoSrc} alt="" key={photoSrc} />;
          })}
        </MasonryLayout>
      </div>
    );
  }
}
export default Masonry;
