import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipeDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`
      );
      const data = await res.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-transparent border-t-orange-500 border-b-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <p className="text-center mt-10 text-lg text-gray-300">
        Recipe not found 😔
      </p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg md:mt-8 text-white border border-white/20">
      {/* Image */}
      <div className="overflow-hidden rounded-xl shadow-md">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mt-6 mb-4 text-orange-400 drop-shadow">
        {recipe.title}
      </h1>

      {/* Ingredients */}
      <h2 className="text-2xl font-semibold mb-3 border-b border-white/20 pb-2">
        Ingredients
      </h2>
      <ul className="list-disc list-inside space-y-1 mb-6 text-gray-200">
        {recipe.extendedIngredients?.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-semibold mb-3 border-b border-white/20 pb-2">
        Instructions
      </h2>
      {recipe.instructions ? (
        <div
          className="prose prose-invert max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        ></div>
      ) : (
        <p className="text-gray-300 italic">No instructions available.</p>
      )}

      {/* Back Button */}
      <Link
        to="/"
        className="inline-block mt-8 bg-orange-500 px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
