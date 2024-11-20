import styled from "styled-components";

const TablePrimary = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
    &:nth-child(2){
    cursor: pointer;
    }
    &:nth-child(2):hover {
    background-color: #e2e2e2;
    }


  }

  th {
    cursor: pointer;
    background-color: #f4f4f4;
    position: relative;

    &:hover {
      background-color: #e2e2e2;
    }
  }

  td {
    background-color: #fff;
  }
`;
export default TablePrimary;
