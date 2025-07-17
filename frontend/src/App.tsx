import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/global.css';
import '@/utils/logger';
import React from 'react';
import { join } from 'path';
import express from 'express';
import fs from 'fs';
import { css } from '@emotion/react';

export default function App() {
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
    ></div>
  );
}
