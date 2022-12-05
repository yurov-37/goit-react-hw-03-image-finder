import React from 'react';
import { GalleryItem, ImageItem } from './ImageGalleryItem.styled';

function ImageGalleryItem({ name, url, largeUrl, onClick }) {
  return (
    <GalleryItem onClick={onClick}>
      <ImageItem src={url} alt={name} name={largeUrl} />
    </GalleryItem>
  );
}

export default ImageGalleryItem;
