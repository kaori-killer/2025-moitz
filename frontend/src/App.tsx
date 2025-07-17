import { css } from '@emotion/react';
import styled from '@emotion/styled';

function EmotionReact() {
  return (
    <div
      css={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: red;
        }
      `}
    >
      안녕 나는 Emotion React야
    </div>
  );
}
function EmotionStyled() {
  const Wrapper = styled.div`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    &:hover {
      color: red;
    }
  `;
  return <Wrapper></Wrapper>;
}

export default function App() {
  return (
    <>
      <EmotionReact />
      <EmotionStyled />
    </>
  );
}
