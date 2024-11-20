import styled from "styled-components";

const SortIcon = styled.span<{ nosort?: boolean }>`
  padding: 2px 12px;
  display: inline-block;
  font-weight: 800;
  font-size: 1rem;
  float: right;
  text-align: center;
  cursor: pointer;
  background-color: ${({ nosort }) => (nosort ? "#f4f4f4" : "#36454F")};
  color: ${({ nosort }) => (nosort ? "#000000" : "#ffffff")};
`;

export default SortIcon;
