// @flow
import * as React from 'react';
import Btn from 'material-ui/Button';

type WelcomeProps = {
  children?: any;
  onClick?: () => void;
};

const Button: React.SFC<WelcomeProps> = ({ children, onClick }) => (
  <Btn color="secondary" onClick={onClick}>
    {children || 'sample'}
  </Btn>
);

// Button.defaultProps = {
//   children: null,
// };

export default Button;
