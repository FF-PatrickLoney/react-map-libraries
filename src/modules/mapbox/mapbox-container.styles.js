import { createUseStyles } from 'react-jss';

export const useStyles = createUseStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    height: '100%',
    '& .ant-tabs.ant-tabs-top': {
      height: '100%',
      '& .ant-tabs-content.ant-tabs-content-top': {
        height: '100%',
      },
    },
  },
}));
