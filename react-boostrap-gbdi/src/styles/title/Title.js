import styled from "styled-components";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
const Title = styled.h1`
  font-size: ${props => props.size || 3}em;
  text-align: center;
  color: ${props => props.primary ? "#2797b6": "purple"};
`;

export default Title;