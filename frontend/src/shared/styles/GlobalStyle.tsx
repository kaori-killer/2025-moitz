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
        `}
      />
    </>
  );
}

export default GlobalStyle;
