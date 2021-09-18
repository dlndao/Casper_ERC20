import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const DLNCheckbox = withStyles({
  root: {
    'color': '#6ab83a',
    '&$checked': {
      color: '#6ab83a'
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color='default' {...props} />);

export { DLNCheckbox };
