import React from "react";
import MasonryLayout from "react-masonry-layout";

import { generatePhotoUrl, loadPhoto } from "../utils/photos";

const TOTAL_PHOTO_COUNT = 554;
const PHOTOS_PER_PAGE = 20;

class App extends React.Component {
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

    // Wait for all promises to resolve
    Promise.all(nextPhotoUrls.map(loadPhoto)).then(newPhotos => {
      this.setState({
        isLoading: false,
        photos: this.state.photos.concat(newPhotos)
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
          {this.state.photos.map(photo => {
            return <img src={photo.src} alt="" key={photo.src} />;
          })}
        </MasonryLayout>
      </div>
    );
  }
}
export default App;
