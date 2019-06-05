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
  border: solid 2px #3a3a3a;
  &:focus {
    outline: none;
    border: solid 2px goldenrod;
  }
  ${props =>
    props.highlighted
      ? `
  transition: box-shadow ease-in-out 0.15s;
  box-shadow: 0 1px 10px 3px goldenrod;
    &:hover, &:focus {
      box-shadow: 0 1px 20px 8px goldenrod;
    }
  `
      : null}
`;
