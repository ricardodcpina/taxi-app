import styled from 'styled-components';

const Button = styled.button`
  color: #487549; 
  background-color: transparent;
  border: 2px solid #487549;
  padding: 12px 18px;
  border-radius: 30px;
  font-size: 1rem;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #487549;
    color: white;
  }

  &:active {
    background-color: rgb(126, 158, 127);
    color: white;
  }
`;

export default Button;
