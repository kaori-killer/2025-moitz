import React from "react";
import ReactDOM from "react-dom/client";
import { css } from "@emotion/react";

import { BottomSheet } from "./index";

function App() {
  return (
    <div
      css={css`
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        position: relative;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          text-align: center;
          padding: 20px;
          z-index: 1;
        `}
      >
        <h1>Bottom Sheet Demo</h1>
        <p style={{ marginTop: "10px", opacity: 0.9 }}>
          드래그하여 바텀시트를 움직여보세요
        </p>
      </div>

      <BottomSheet snapPoints={[20, 60, 90]} initialSnapPoint={60}>
        <div
          css={css`
            padding: 20px;
          `}
        >
          <h2 style={{ color: "#000" }}>Bottom Sheet Content</h2>
          <p style={{ marginTop: "10px", color: "#000" }}>
            드래그하여 높이를 조절할 수 있습니다.
          </p>
          <ul
            style={{
              marginTop: "20px",
              color: "#000",
              listStyle: "none",
              padding: 0,
            }}
          >
            <li>스냅 포인트: 20%, 60%, 90%</li>
          </ul>
        </div>
      </BottomSheet>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
