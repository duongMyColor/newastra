export const boxStyles = {
  backgroundColor: '#fff',
  color: '#000000de',
  WebkitTransition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '4px',
  boxShadow:
    '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  overflow: 'hidden',
  marginTop: '1em',
};

export const disabledInputBackgroundStyle = {
  '& .MuiFilledInput-input': {
    background: '#f4f4f5c4',
  },
  '& .Mui-disabled': {
    WebkitTextFillColor: '#4d4d4d !important',
  },
};

export const textareaStyles = {
  width: '100%',
  height: 500,
  padding: '20px',
  borderRadius: 4,
  background: '#f8f8f8',
  fontSize: 16,
  overflow: 'auto',
};
