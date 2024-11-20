import styled from "styled-components";

const ButtonPrimary = styled.div<{ position?: string }>`
  padding: 0.5rem;
  display: inline-block;
  cursor: pointer;
  background-color: #36454f;
  color: #ffffff;
  font-family: Arial, sans-serif;
  position: ${({ position }) =>
    position === "right-top" ? "absolute" : "initial"};
  right: 0;
  top: 0;
  margin: 5px 5px;
`;

export default ButtonPrimary;
