import React from "react";
import { InfiniteScroll } from "react-simple-infinite-scroll";
import Gallery from "react-photo-gallery";

import { generatePhotoUrl, loadPhoto } from "../utils/photos";

const TOTAL_PHOTO_COUNT = 554;
const PHOTOS_PER_PAGE = 20;

class App extends React.Component {
  state = {
    isLoading: false,
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
    const { photos, isLoading } = this.state;
    return (
      <div className="App">
        <InfiniteScroll
          throttle={100}
          threshold={500}
          isLoading={isLoading}
          hasMore={photos.length < TOTAL_PHOTO_COUNT}
          onLoadMore={this.loadPhotos}
        >
          <Gallery photos={this.state.photos} />
        </InfiniteScroll>
      </div>
    );
  }
}
export default App;
