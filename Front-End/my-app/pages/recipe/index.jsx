import { useState } from 'react';
import Layout from '../../components/Layout';
import RecipeCard from '../../components/RecipeCard';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Recipes({ initialRecipes }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState('');

  const handleSearch = async () => {
    const res = await fetch(`/api/recipes?search=${search}`);
    const data = await res.json();
    setRecipes(data);
  };

  return (
    <Layout title="Recipes">
      <h1>Recipes</h1>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
    },
  });

  return {
    props: {
      initialRecipes: recipes,
    },
  };
}