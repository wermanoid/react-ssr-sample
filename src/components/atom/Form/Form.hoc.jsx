// @flow
import React, { PureComponent } from 'react';
import Props from 'prop-types';

type FormControlType = Object;

type AsFormStateType = {
  controls: FormControlType[],
};

type AsFormPropsType = {
  array?: boolean,
  validators?: Function[],
  name?: string,
};

export const FormContextType = {
  register: Props.func,
  unregister: Props.func,
};

export default (Wrapped: React$ComponentType<*>) =>
  class extends PureComponent<AsFormPropsType, AsFormStateType> {
    static defaultProps = {
      array: false,
    };
    static displayName = `asForm(${Wrapped.displayName || Wrapped.name || 'Component'})`;
    static childContextTypes = FormContextType;

    constructor(props: AsFormPropsType, ctx: Object) {
      super(props, ctx);
      this.state = { controls: [] };
    }

    getChildContext = () => ({
      register: (control: FormControlType, name?: string) => {
        setTimeout(() => {
          const { controls } = this.state;
          const { array } = this.props;
          this.setState({
            controls: [...controls, array || !name ? control : { [name]: control }],
          });
        });
      },
      unregister: () => {},
    });

    onSubmit = () => {};
    onReset = () => {};

    render() {
      return <Wrapped {...this.props} onSubmit={this.onSubmit} onReset={this.onReset} />;
    }
  };
