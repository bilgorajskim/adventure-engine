import styled from "styled-components";

export const Button = styled.button`
  font-family: "Cinzel Decorative", cursive;
  color: gold;
  font-size: 1.25rem;
  text-align: center;
  padding: 2px 8px;
  background: #555;
  border-radius: 5px;
  &:disabled {
    background: #777;
    color: #ccc;
  }
`;
