import { Global, css } from '@emotion/react';
import './reset.css';

function GlobalStyle() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://cdn.jsdelivr.net"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
      />
      <link
        href="https://cdn.jsdelivr.net/gh/toss/tossface/dist/tossface.css"
        rel="stylesheet"
        type="text/css"
      />
      <Global
        styles={css`
          * {
            font-family:
              'Pretendard',
              -apple-system,
              BlinkMacSystemFont,
              'Segoe UI',
              Roboto,
              'Helvetica Neue',
              Arial,
              sans-serif;
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
