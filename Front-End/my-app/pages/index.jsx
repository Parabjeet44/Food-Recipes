import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function Home({ recipes }) {
  return (
    <Layout title="Home">
      <h1>Welcome to Recipe App</h1>
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
    take: 6,
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
    },
  });

  return {
    props: {
      recipes,
    },
  };
}