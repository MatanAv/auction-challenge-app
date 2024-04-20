import theme from './theme';

const pageStyle = {
  textAlign: 'center',
  width: '100%',
  padding: theme.spacing(3)
};

const listStyle = {
  p: 0,
  width: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' }
};

const listItemStyle = { justifyContent: 'center' };

const buttonStyle = { minWidth: 30 };

const pageButtonStyle = { minWidth: 40, borderRadius: 8 };

export { pageStyle, listStyle, listItemStyle, buttonStyle, pageButtonStyle };
