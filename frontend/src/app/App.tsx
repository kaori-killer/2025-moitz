import { Outlet } from 'react-router';

import Layout from '@shared/components/layout/Layout';

export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
