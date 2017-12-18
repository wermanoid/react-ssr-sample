// @flow
import * as React from 'react';
import Btn from 'material-ui/Button';

type WelcomeProps = {
  children?: any,
}

const Button: React.SFC<WelcomeProps> = ({ children }) => (
  <Btn onClick={null}>{ children || 'sample'}</Btn>
);

// Button.defaultProps = {
//   children: null,
// };

export default Button;
