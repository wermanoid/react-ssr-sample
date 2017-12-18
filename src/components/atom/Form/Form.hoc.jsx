// @flow
import React, { PureComponent } from 'react';
import Props from 'prop-types';
import type {
  FormControlType,
  AsFormPropsType,
  AsFormStateType,
} from './types';

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

    state = { controls: [] };

    getChildContext = () => ({
      register: (control: FormControlType) => {
        this.addContolsQueue.push(control);
        this.updateControls();
      },
      unregister: (control: FormControlType) => {
        this.remContolsQueue.push(control);
        this.updateControls();
      },
    });

    onSubmit = () => {};
    onReset = () => {};

    updateControls = () => {
      if (this.enqueueTimeoutId) {
        clearTimeout(this.enqueueTimeoutId);
      }
      this.enqueueTimeoutId = setTimeout(() => {
        const { controls } = this.state;
        this.setState({ controls: [...controls, ...this.addContolsQueue] });
        this.addContolsQueue = [];
        this.enqueueTimeoutId = null;
      });
    };

    enqueueTimeoutId: ?number = null;
    addContolsQueue: FormControlType[] = [];
    dequeueTimeoutId: ?number = null;
    remContolsQueue: FormControlType[] = [];

    render() {
      return <Wrapped {...this.props} onSubmit={this.onSubmit} onReset={this.onReset} />;
    }
  };
