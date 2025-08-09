import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col justify-between">
      <div>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded-lg w-full h-48 object-cover"
        />
        <h2 className="text-lg font-semibold mt-3">{recipe.title}</h2>
      </div>
      <Link
        to={`/recipe/${recipe.id}`}
        className="mt-3 inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors self-start"
      >
        View Recipe
      </Link>
    </div>
  );
}
