import React from 'react';
import ReactDOM from 'react-dom/client';

import theme from '@/styles/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home.tsx';
import Instructions from '@/pages/Instructions.tsx';
import Training from '@/pages/Training.tsx';
import Test from '@/pages/Test.tsx';
import ErrorPage from '@/pages/Error.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/instructions',
    element: <Instructions />
  },
  {
    path: '/training',
    element: <Training />
  },
  {
    path: '/test',
    element: <Test />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
