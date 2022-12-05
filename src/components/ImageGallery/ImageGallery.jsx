import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';

function ImageGallery({ items, onImgClick }) {
  return (
    <ImageList>
      {items.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          name={tags}
          url={webformatURL}
          largeUrl={largeImageURL}
          onClick={onImgClick}
        />
      ))}
    </ImageList>
  );
}

export default ImageGallery;
