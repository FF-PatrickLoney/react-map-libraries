import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    flex: 'auto',
    '& .site-layout-content': {
      display: 'flex',
      flex: '1',
      backgroundColor: 'white',
      padding: '8px 8px',
      marginTop: '16px',
    },
  },
}));
