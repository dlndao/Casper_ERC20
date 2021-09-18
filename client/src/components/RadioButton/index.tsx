import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

const DLNRadio = withStyles({
  root: {
    color: '#656363',
    '&$checked': {
      color: '#6ab83a',
    },
  },
  checked: {},
})((props) => <Radio color='default' {...props} />);

export { DLNRadio };
