import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #f1fff9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  gap: 20px;
  min-width: 35%;
  width: 45%;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  opacity: 0.95;

  @media (max-width: 992px) and (min-width: 576px) {
    width: 65%;
  }

  @media (max-width: 576px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-top: 0;
`;

export const CardDescription = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const CardValue = styled.h3`
  font-size: 20px;
  color: #388e3c;
  margin-bottom: 20px;
`;
