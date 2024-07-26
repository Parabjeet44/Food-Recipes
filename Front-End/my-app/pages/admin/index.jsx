import AdminLayout from '../../components/AdminLayout';
import Layout from '../../components/Layout';

export default function AdminDashboard() {
  return (
    <Layout title="Admin Dashboard">
      <AdminLayout>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin area. Use the navigation to manage content.</p>
      </AdminLayout>
    </Layout>
  );
}