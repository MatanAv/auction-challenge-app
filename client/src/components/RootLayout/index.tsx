import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';

import theme from '@/styles/theme';
import { pageStyle } from '@/styles';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Header title='Choice Challenge App' />

      <Box component='section' sx={pageStyle}>
        <Box sx={theme.mixins.toolbar} />
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
