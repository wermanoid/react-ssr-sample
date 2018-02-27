
import styledComponents, { injectGlobal } from 'styled-components';
const styled = styledComponents;

injectGlobal`
  body {
    margin: 0;
  }
`;

export default (app: React.SFC) => styled(app)`
  background-color: #eee;
`;
