import React from 'react';

import { typography } from '@shared/styles/default.styled';

import * as input from './input.styled';
interface InputProps {
  id?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Input({ id, placeholder, value, onChange, onKeyDown }: InputProps) {
  return (
    <input
      id={id}
      css={[input.base(), typography.b1]}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default Input;
