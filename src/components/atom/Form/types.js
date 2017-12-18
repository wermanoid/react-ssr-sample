// @flow

export type ValidationResultType<T> = {
  value: T,
  error: string,
};

export type FormControlType = {
  name?: string,
  validate: () => ValidationResultType<*>,
};

export type AsFormStateType = {
  controls: FormControlType[],
};

export type AsFormPropsType = {
  name?: string,
  array?: boolean,
  validators?: Function[],
};
