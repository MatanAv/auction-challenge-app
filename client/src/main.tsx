import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import theme from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';

import End from '@/pages/End';
import Home from '@/pages/Home';
import Game from '@/pages/Game';
import Error from '@/pages/Error';
import Survey from '@/pages/Survey';
import UserInfo from '@/pages/UserInfo';
import GameResults from '@/pages/Game/GameResults';
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
    element: <Game gameType='training' />
  },
  {
    path: '/game',
    element: <Game />
  },
  {
    path: '/results',
    element: <GameResults />
  },
  {
    path: '/end',
    element: <End />
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
