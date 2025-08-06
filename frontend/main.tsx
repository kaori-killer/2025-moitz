import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import IndexPage from '@pages/indexPage/IndexPage';
import NotFoundPage from '@pages/notFoundPage/NotFoundPage';
import ResultPage from '@pages/resultPage/ResultPage';

import App from './src/app/App';
import GlobalStyle from './src/shared/styles/GlobalStyle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'result',
        element: <ResultPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
