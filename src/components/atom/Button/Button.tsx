/**
 * Provides basic button
 * @module #atom/Button
 */
import * as React from 'react';
import Btn from 'material-ui/Button';

interface IButton {
  onClick?: () => void;
};

/**
 * Provides basic button component
 */
const Button: React.SFC<IButton> = ({ children, onClick }) => (
  <Btn color="primary" onClick={onClick}>
    {children || 'sample'}
  </Btn>
);

export default Button;
