import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { search } = req.query;

    try {
      const recipes = await prisma.recipe.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { ingredients: { has: search } },
          ],
        },
        include: { author: true, ratings: true },
      });

      res.status(200).json(recipes);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching recipes', error });
    }
  } else if (req.method === 'POST') {
    // Add authentication middleware here
    const { title, description, ingredients, steps, image, authorId } = req.body;

    try {
      const recipe = await prisma.recipe.create({
        data: {
          title,
          description,
          ingredients,
          steps,
          image,
          authorId,
        },
      });

      res.status(201).json({ message: 'Recipe created successfully', recipe });
    } catch (error) {
      res.status(400).json({ message: 'Error creating recipe', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}