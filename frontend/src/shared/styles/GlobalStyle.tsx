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
