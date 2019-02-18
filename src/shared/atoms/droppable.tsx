import React from 'react';

export type DroppableHtml = Pick<
  React.HTMLAttributes<HTMLElement>,
  'onDrop' | 'onDragOver' | 'onDragEnter'
>;

export interface DroppableProps<T extends DroppableHtml = any> {
  children?: React.ReactChild;
  render?: keyof JSX.IntrinsicElements | React.ComponentType<T>;
}

const createOnDropHandler = (
  callback: (val: string) => void,
): React.DragEventHandler<Element> => (e) => {
  e.preventDefault();
  callback(e.dataTransfer.getData('text/plain'));
};

const stub: React.DragEventHandler<Element> = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const { log } = console;

const Droppable = <T extends DroppableHtml, _ = {}>({
  children,
  render = 'div',
  ...rest
}: T & DroppableProps<T>) =>
  React.createElement(
    render as any,
    {
      onDragOver: stub,
      onDragEnter: stub,
      onDrop: createOnDropHandler(log),
      ...rest,
    },
    children,
  );

export default Droppable;
