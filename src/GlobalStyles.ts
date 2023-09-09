import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    font-family: 'Nanum Gothic', sans-serif;
  }
  
`;

export default GlobalStyles;
