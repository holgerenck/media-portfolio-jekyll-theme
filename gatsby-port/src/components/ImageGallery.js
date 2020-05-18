import React, { useRef, useCallback } from 'react';
import Img from 'gatsby-image';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Wrapper = styled.div`
  margin: 3em 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Entry = styled.div`
  flex: 0 0 calc(33.33% - 30px); /* flex-basis adjustment for margin */
  margin: 5px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1024px) {
    flex: 0 0 calc(50% - 30px); /* flex-basis adjustment for margin */
  }

  @media (max-width: 768px) {
    flex: 0 0 calc(100% - 30px); /* flex-basis adjustment for margin */
  }
`;

const Button = styled.button`
  box-shadow: none;
  padding: 4px 6px;

  &:hover {
    box-shadow: none;
  }
`;

const ImageGallery = ({ images, title }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const slider = useRef();

  const openModal = useCallback(index => {
    slider.current.slickGoTo(index, true);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handlePrev = useCallback(() => {
    slider.current.slickPrev();
  }, []);

  const handleNext = useCallback(() => {
    slider.current.slickNext();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <Wrapper>
        {images.map((image, i) => (
          <Entry key={i} onClick={() => openModal(i)}>
            <Img
              className="gallery-image"
              fluid={image.childImageSharp.fluid}
            />
          </Entry>
        ))}
      </Wrapper>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <Button onClick={closeModal}>x</Button>
        <Slider {...sliderSettings} ref={r => (slider.current = r)}>
          {images.map((image, i) => (
            <Img key={i} fluid={image.childImageSharp.fluid} />
          ))}
        </Slider>
        <Row>
          <Button onClick={handlePrev}>{'<'}</Button>
          <Button onClick={handleNext}>></Button>
        </Row>
      </Modal>
    </div>
  );
};

export default ImageGallery;

const Overlay = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(6px);

  ${props =>
    !props.isOpen &&
    css`
      display: none;
    `}
`;

const Content = styled.div`
  width: 64%;
  overflow: hidden;
  background: none;

  @media (max-width: 768px) {
    width: 84%;
  }
`;

const Modal = ({ children, isOpen, onRequestClose }) => {
  const handleClose = e => {
    onRequestClose();
  };

  const handleContentClick = e => {
    e.stopPropagation();
  };

  return (
    <Overlay isOpen={isOpen} onClick={handleClose}>
      <Content onClick={handleContentClick}>{children}</Content>
    </Overlay>
  );
};
