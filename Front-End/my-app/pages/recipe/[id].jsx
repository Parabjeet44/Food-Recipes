import { useState } from 'react';
import Layout from '../../components/Layout';
import { PrismaClient } from '@prisma/client';
import Head from 'next/head';

const prisma = new PrismaClient();

export default function Recipe({ recipe }) {
  const [rating, setRating] = useState(0);
  const averageRating = recipe.ratings.reduce((sum, rating) => sum + rating.value, 0) / recipe.ratings.length;

  const handleRating = async () => {
    const res = await fetch(`/api/recipes/${recipe.id}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: rating }),
    });

    if (res.ok) {
      alert('Rating submitted successfully!');
      // Optionally, refresh the page or update the ratings state
    }
  };

  return (
    <Layout title={recipe.title}>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "name": recipe.title,
            "image": recipe.image,
            "description": recipe.description,
            "author": {
              "@type": "Person",
              "name": recipe.author.name
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating.toFixed(1),
              "reviewCount": recipe.ratings.length
            }
          })}
        </script>
      </Head>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p>Average Rating: {averageRating.toFixed(1)} ({recipe.ratings.length} ratings)</p>
      <div>
        <h3>Rate this recipe:</h3>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="0">Select rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button onClick={handleRating}>Submit Rating</button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(id) },
    include: {
      author: {
        select: { name: true },
      },
      ratings: true,
    },
  });

  if (!recipe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe,
    },
  };
}