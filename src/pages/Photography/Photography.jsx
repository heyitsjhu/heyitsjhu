import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import PhotoGallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

import GalleryImage from '../../components/GalleryImage/GalleryImage';
import { ROUTES } from '../../const';
import { useCopy } from '../../i18n';
import PageLayout from '../PageLayout/PageLayout';

import photos from './photos';

const useStyles = makeStyles(({ palette, spacing }) => ({
  photographyLayout: {
    padding: 0,
  },
  galleryContainer: {},
  modalGateway: {},
}));

export default (props) => {
  const { t } = useCopy();
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    console.log('is this working?', photo, index);
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = useCallback(
    ({ key, direction, photo, margin, top, left, index, onClick }) => (
      <GalleryImage
        //
        key={key}
        direction={direction}
        photo={photo}
        margin={'2px'}
        top={top}
        left={left}
        index={index}
        onPhotoSelect={onClick}
      />
    ),
    []
  );

  return (
    <PageLayout pageName="photography" className={classes.photographyLayout}>
      <PhotoGallery
        className={classes.galleryContainer}
        photos={photos}
        renderImage={imageRenderer}
        onClick={openLightbox}
      />
      <ModalGateway className={classes.modalGateway}>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                source: x.src,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </PageLayout>
  );
};
