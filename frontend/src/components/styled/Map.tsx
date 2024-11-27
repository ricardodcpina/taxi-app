import styled from 'styled-components';

export const MapContainerWrapper = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 35%;
  margin: 0 auto 20px auto;
  background-color: #f1fff9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  opacity: 0.85;

  &:hover {
    opacity: 1;
    transition: opacity 0.5s;
  }

  @media (max-width: 576px) {
    width: 100%;
    margin: 0 0 20px auto;
    border-radius: 0;
  }
`;

export const MapImage = styled.img`
  width: 95%;
  height: 95%;
  object-fit: cover;
  border-radius: 10px;
`;
