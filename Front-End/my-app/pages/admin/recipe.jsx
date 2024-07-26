import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import Layout from '../../components/Layout';

export default function ManageRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const res = await fetch('/api/recipes');
    const data = await res.json();
    setRecipes(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchRecipes();
    } else {
      alert('Error deleting recipe');
    }
  };

  return (
    <Layout title="Manage Recipes">
      <AdminLayout>
        <h1>Manage Recipes</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.id}</td>
                <td>{recipe.title}</td>
                <td>
                  <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminLayout>
    </Layout>
  );
}