import { Global, css } from '@emotion/react';
import './reset.css';

function GlobalStyle() {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        rel="stylesheet"
      />
      <Global
        styles={css`
          * {
            font-family: 'Pretendard';
          }

          .visually-hidden {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
          }
        `}
      />
    </>
  );
}

export default GlobalStyle;
