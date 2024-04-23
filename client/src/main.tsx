import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import theme from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';

import Home from '@/pages/Home';
import Test from '@/pages/Test';
import Error from '@/pages/Error';
import Survey from '@/pages/Survey';
import Training from '@/pages/Training';
import UserInfo from '@/pages/UserInfo';
import Instructions from '@/pages/Instructions';
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
    path: '/user/info',
    element: <UserInfo />
  },
  {
    path: '/user/survey',
    element: <Survey />
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
