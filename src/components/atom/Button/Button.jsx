// @flow
import React from 'react';
import Btn from 'material-ui/Button';

type PropsType = {
  children: React$Node,
}

const Button = ({ children }: PropsType) => (
  <Btn onClick={null}>{ children || 'sample'}</Btn>
);

export default Button;
