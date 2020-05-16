import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 3em;

  position: relative;
  padding-bottom: calc(540 / 1296 * 100%); /* 41.66666667% */
  overflow: hidden;
  max-width: 100%;
  background: black;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const VimeoPlayer = ({ vimeoId, videoTitle, ...props }) => (
  <Wrapper>
    <iframe
      src={`https://player.vimeo.com/video/${vimeoId}`}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </Wrapper>
);
export default VimeoPlayer;
