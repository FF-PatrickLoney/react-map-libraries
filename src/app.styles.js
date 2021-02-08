import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    flex: 'auto',
    padding: '0px 20px',
    '& .site-layout-content': {
      display: 'flex',
      flex: '1',
      backgroundColor: 'white',
      padding: '8px 25px',
      marginTop: '16px',
    },
  },
}));
