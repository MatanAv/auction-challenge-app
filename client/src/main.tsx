import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import theme from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';

import Home from '@/pages/Home.tsx';
import Test from '@/pages/Test.tsx';
import Error from '@/pages/Error.tsx';
import Training from '@/pages/Training.tsx';
import Instructions from '@/pages/Instructions.tsx';
import Layout from '@/components/RootLayout';
import CssBaseline from '@mui/material/CssBaseline';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
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
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>
);
