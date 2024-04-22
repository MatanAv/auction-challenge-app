const pageStyle = {
  textAlign: 'center',
  width: '100%',
  p: 5
};

const listBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3
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

export { pageStyle, listBoxStyle, listStyle, listItemStyle, buttonStyle, pageButtonStyle };
