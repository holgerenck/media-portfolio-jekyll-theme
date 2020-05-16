import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 3em 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Entry = styled.div`
  flex: 0 0 calc(33.33% - 30px); /* flex-basis adjustment for margin */
  margin: 5px;
`;

const ImageGallery = ({ images }) => (
  <Wrapper>
    {images.map(image => (
      <Entry>
        <a
          href={image.childImageSharp.fluid.src}
          className="lightbox-image gallery"
        >
          <Img className="gallery-image" fluid={image.childImageSharp.fluid} />
        </a>
      </Entry>
    ))}
  </Wrapper>
);

export default ImageGallery;
