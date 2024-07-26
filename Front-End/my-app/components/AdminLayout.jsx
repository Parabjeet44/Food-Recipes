import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <nav>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/recipes">Manage Recipes</Link>
        <Link href="/admin/users">Manage Users</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}