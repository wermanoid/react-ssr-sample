// @flow
import React from 'react';
import { mount } from 'enzyme';
import { lifecycle } from 'recompose';
import asForm, { FormContextType } from './Form.hoc';

describe('Form HOC', () => {
  let sut;
  let counter = 0;
  const Dummy = ({ children }: { children: React$Node }) => <div>{children}</div>;
  const DummyFormControl = lifecycle({
    componentDidMount() {
      this.control = { sample: counter += 1, name: this.props.name };
      this.context.register(this.control);
    },
    componentWillUnmount() {
      this.context.unregister(this.control);
    }
  })(() => <span />);
  DummyFormControl.contextTypes = FormContextType;

  beforeEach(() => {
    counter = 0;
    jest.useFakeTimers();
    const SampleForm = asForm(Dummy);
    sut = mount((
      <SampleForm>
        <DummyFormControl name="test1" />
        <DummyFormControl name="test2" />
        <DummyFormControl name="test3" />
        <DummyFormControl name="test4" />
      </SampleForm>
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

  test('should register controls correctly', () => {
    jest.runAllTimers();
    expect(sut.state.controls).toHaveLength(4);
  });

  test('should unregister control correctly', () => {
    const SampleForm = asForm(Dummy);
    const Test = ({ childs }: { childs: React$ComponentType<*>[] }) => (
      <SampleForm>
        {childs.map((Child, idx) => <Child key={`item${idx + 1}`} name={`test${idx}`} />)}
      </SampleForm>
    );
    const childs = [DummyFormControl, DummyFormControl, DummyFormControl];
    sut = mount(<Test childs={childs} />);
    expect(sut.find(DummyFormControl)).toHaveLength(3);
    childs.pop();
    sut.setProps({ childs });
    expect(sut.find(DummyFormControl)).toHaveLength(2);
  });
});
