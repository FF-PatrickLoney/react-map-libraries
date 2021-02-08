import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '& .marker-button': {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transform: 'translate(-50%, 0%)',
    },
    '& .marker-button > img': {
      width: '30px',
      height: '30px',
    },
    '& .cluster-marker': {
      color: '#1978c8',
      background: '#fff',
      borderRadius: '50%',
      padding: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
  },
}));
