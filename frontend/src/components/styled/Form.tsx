import styled from 'styled-components';

import { FormProps } from '../../types/reactProps';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #f1fff9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  gap: 15px;
  min-width: 35%;
  padding: 20px 10px;
  border-radius: 10px;
  opacity: 0.95;

  @media (max-width: 576px) {
    width: 100%;
    border-radius: 0;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

const Form = ({ children, title, ...props }: FormProps) => {
  return (
    <FormContainer {...props}>
      <FormTitle>{title}</FormTitle>
      {children}
    </FormContainer>
  );
};

export default Form;
