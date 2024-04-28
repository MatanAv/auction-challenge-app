import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { logoutUser } from '@/services/api/users';

import theme from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';

import Home from '@/pages/Home';
import Test from '@/pages/Test';
import Error from '@/pages/Error';
import Survey from '@/pages/Survey';
import Training from '@/pages/Training';
import UserInfo from '@/pages/UserInfo';
import GameResults from '@/pages/GameResults';
import Instructions from '@/pages/Instructions/Instructions';
import InstructionsSummary from '@/pages/Instructions/Summary';

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
    path: '/instructions/training',
    element: <Instructions type='training' />
  },
  {
    path: '/instructions/game',
    element: <Instructions type='game' />
  },
  {
    path: '/instructions/summary',
    element: <InstructionsSummary />
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
    path: '/training',
    element: <Training />
  },
  {
    path: '/game',
    element: <Test />
  },
  {
    path: '/results',
    element: <GameResults />
  }
]);

window.addEventListener('unload', () => {
  logoutUser();
});

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
