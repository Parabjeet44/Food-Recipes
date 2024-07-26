import Link from 'next/link';
import Image from 'next/image';

export default function RecipeCard({ id, title, description, image }) {
  return (
    <Link href={`/recipes/${id}`}>
      <div className="recipe-card">
        <Image src={image} alt={title} width={300} height={200} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}