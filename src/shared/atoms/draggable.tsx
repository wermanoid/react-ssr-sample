import React from 'react';

export type DraggableHtml = Pick<
  React.HTMLAttributes<HTMLElement>,
  'draggable' | 'onDragStart'
>;

export interface DraggableProps<T extends DraggableHtml = any> {
  id: string;
  children?: React.ReactChild;
  render?: keyof JSX.IntrinsicElements | React.ComponentType<T>;
}

const createHandler = (id: string): React.DragEventHandler<Element> => e => {
  e.dataTransfer.setData('text/plain', id);
};

const Draggable = <T extends DraggableHtml, _ = {}>({
  id,
  children,
  render = 'div',
  draggable = true,
  ...rest
}: T & DraggableProps<T>) =>
  React.createElement(
    render as any,
    {
      ...rest,
      draggable,
      onDragStart: createHandler(id),
    },
    children
  );

export default Draggable;
