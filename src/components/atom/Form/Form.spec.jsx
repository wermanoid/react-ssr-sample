// @flow
import React from 'react';
import { mount } from 'enzyme';
import { lifecycle } from 'recompose';
import asForm, { FormContextType } from './Form.hoc';

describe('Form HOC', () => {
  let sut;
  const Dummy = ({ children }: { children: React$Node }) => <div>{children}</div>;
  const DummyChild = lifecycle({
    componentDidMount() {
      this.context.register({ sample: 1 }, this.props.name);
    },
  })(() => <span />);
  DummyChild.contextTypes = FormContextType;

  beforeEach(() => {
    jest.useFakeTimers();
    const Sample = asForm(Dummy);
    sut = mount((
      <Sample>
        <DummyChild name="test" />
      </Sample>
    )).instance();
  });

  test('should create correct displayName', () => {
    expect(asForm(Dummy).displayName).toBe('asForm(Dummy)');
  });

  test('should provide correct child context', () => {
    const tmp = sut.getChildContext();
    expect(tmp.register).toBeDefined();
    expect(tmp.unregister).toBeDefined();
  });

  test('should single control correctly', () => {
    jest.runAllTimers();
    console.log(sut.state);
  });
});
