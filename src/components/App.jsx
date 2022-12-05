import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import GlobalStyles from './GlobalStyles';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import 'react-toastify/dist/ReactToastify.css';
import * as API from './services/api';
import { SearchApp } from './App.styled';
import { ThreeDots } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    imagesData: [],
    isLoading: false,
    largeImgLink: null,
    imgAlt: null,
    imgOnRequest: 0,
    totalImages: 0,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ isLoading: true });
      try {
        const response = await API.fetchImagesWithQuery(searchQuery);
        const { hits, total } = response.data;
        if (hits.length === 0) {
          toast.error('По вашему запросу ничего не найдено', {
            icon: '👻',
          });
          return;
        }
        const imagesData = hits.map(image => {
          return {
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
          };
        });
        this.setState({
          imagesData,
          searchQuery,
          totalImages: total,
          imgOnRequest: hits.length,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  getSearchName = searchQuery => {
    this.setState({ searchQuery });
  };

  onImageClick = event => {
    const { name, alt } = event.target;
    this.setState({
      largeImgLink: name,
      imgAlt: alt,
    });
  };

  onCloseModal = () => {
    this.setState({ largeImgLink: null, imgAlt: null });
  };

  render() {
    const { imagesData, imgAlt, largeImgLink, isLoading } = this.state;
    return (
      <SearchApp>
        <Searchbar onSubmit={this.getSearchName} />

        {imagesData.length > 0 && (
          <ImageGallery items={imagesData} onImgClick={this.onImageClick} />
        )}
        {isLoading && <ThreeDots />}
        {largeImgLink && (
          <Modal
            alt={imgAlt}
            url={largeImgLink}
            closeModal={this.onCloseModal}
          />
        )}

        <ToastContainer autoClose={2000} />
        <GlobalStyles />
      </SearchApp>
    );
  }
}
