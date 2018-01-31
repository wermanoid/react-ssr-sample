
import sc, { injectGlobal } from 'styled-components';
const styled = sc;

injectGlobal`
  body {
    margin: 0;
  }
`;

export default (App) => styled(App)`
  background-color: #eee;
`;
