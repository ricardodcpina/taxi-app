import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 30px auto;
  padding: 20px;
  background-color: #f1fff9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  opacity: 0.95;
  overflow-x: auto;
  min-width: 340px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

export const TableHeader = styled.thead`
  background-color: #487549;
  color: white;
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
`;
