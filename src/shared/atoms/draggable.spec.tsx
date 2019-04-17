import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { mount } from 'enzyme';

import Draggable from './draggable';

const Btn = styled.button<{ width: number }>`
  color: red;
  ${(props: { width: number }) => css`
    width: ${props.width};
  `};
`;

const Sample = () => (
  <div css={{ background: 'rgba(255,255,255, 0.4)' }}>
    <Btn width={234}>lol</Btn>
  </div>
);

describe('sample', () => {
  it('sjoudl', () => {
    const wrap = mount(
      <Draggable id="324" render="div">
        <Sample />
      </Draggable>
    );
    expect(wrap).toMatchSnapshot();
  });
});
