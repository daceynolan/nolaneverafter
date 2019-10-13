import React, { useEffect, useState, useCallback } from "react";
import { InfiniteScroll } from "react-simple-infinite-scroll";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";

import Header from "./Header";
import Loader from "./Loader";
import { generatePhotoUrl, loadPhoto } from "../utils/photos";

const TOTAL_PHOTO_COUNT = 554;
const PHOTOS_PER_PAGE = 20;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Fetch initial photos
  useEffect(() => {
    loadPhotos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPhotos = () => {
    // Verify fetching needs to happen
    const currentPhotoCount = photos.length;
    if (currentPhotoCount >= TOTAL_PHOTO_COUNT || isLoading) return;

    // Build the next set of photo urls
    setIsLoading(true);
    const nextPhotoUrls = Array(PHOTOS_PER_PAGE)
      .fill()
      .map((_, i) => {
        const newPhotoId = currentPhotoCount + 1 + i;
        if (newPhotoId <= TOTAL_PHOTO_COUNT) {
          return generatePhotoUrl(newPhotoId);
        }
        return null;
      })
      .filter(Boolean);

    // Wait for all promises to resolve
    Promise.all(nextPhotoUrls.map(loadPhoto)).then(newPhotos => {
      setIsLoading(false);
      setPhotos(photos.concat(newPhotos));
    });
  };

  const openLightbox = useCallback((event, { index }) => {
    setCurrentPhotoIndex(index);
    setLightboxIsOpen(true);
  }, []);

  const closeLightBox = () => {
    setCurrentPhotoIndex(0);
    setLightboxIsOpen(false);
  };

  return (
    <div className="App">
      <Header
        TOTAL_PHOTO_COUNT={TOTAL_PHOTO_COUNT}
        currentPhotoCount={photos.length}
      />
      <InfiniteScroll
        throttle={100}
        threshold={500}
        isLoading={isLoading}
        hasMore={photos.length < TOTAL_PHOTO_COUNT}
        onLoadMore={loadPhotos}
      >
        <Gallery photos={photos} onClick={openLightbox} />
      </InfiniteScroll>
      {isLoading && <Loader />}
      <ModalGateway>
        {lightboxIsOpen && (
          <Modal onClose={closeLightBox} closeOnEsc={false}>
            <Carousel
              hideControlsWhenIdle={false}
              components={{ Footer: null }}
              currentIndex={currentPhotoIndex}
              views={photos.map((photo, i) => ({
                ...photo,
                source: {
                  thumbnail: photo.src,
                  regular: generatePhotoUrl(i + 1, "large")
                }
              }))}
            />
          </Modal>
        )}
      </ModalGateway>
    </div>
  );
};

export default App;
