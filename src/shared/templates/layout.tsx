import { jsx } from '@emotion/core';

export interface LayoutProps {
  header?: React.ComponentType;
  footer?: React.ComponentType;
}

const Layout: React.SFC<LayoutProps> = ({ children, header, footer }) => (
  <div
    css={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {header && <section>{jsx(header, null)}</section>}
    <section css={{ flex: '1', overflow: 'auto', border: '1px solid red' }}>
      <div css={{ height: '2000px' }}>
        {children}
        {footer && jsx(footer, null)}
      </div>
    </section>
  </div>
);

export default Layout;
