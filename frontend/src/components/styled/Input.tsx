import styled from 'styled-components';

import type { InputProps } from '../../types/reactProps';

const Input = styled.input<InputProps>`
  width: ${({ width }) => width || '90%'};
  background-color: transparent;
  border: 2px solid #d3ddd3;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #388e3c;
    box-shadow: 0 0 5px rgba(72, 175, 72, 0.5);
  }

  &:hover {
    border-color: #388e3c;
  }

  &::placeholder {
    opacity: 0.7;
  }
`;

export default Input;
