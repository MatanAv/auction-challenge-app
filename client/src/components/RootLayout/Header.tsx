import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <AppBar position='fixed' color='primary' elevation={0}>
    <Toolbar>
      <Typography variant='h5'>{title}</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
