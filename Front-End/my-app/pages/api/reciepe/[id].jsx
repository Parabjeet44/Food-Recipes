import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { id: Number(id) },
        include: { author: true, ratings: true },
      });

      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching recipe', error });
    }
  } else if (req.method === 'PUT') {
    // Add authentication middleware here
    const { title, description, ingredients, steps, image } = req.body;

    try {
      const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          ingredients,
          steps,
          image,
        },
      });

      res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
      res.status(400).json({ message: 'Error updating recipe', error });
    }
  } else if (req.method === 'DELETE') {
    // Add authentication middleware here
    try {
      await prisma.recipe.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting recipe', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}