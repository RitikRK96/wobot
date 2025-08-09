import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const RESULTS_PER_PAGE = 9;

  const fetchRecipes = async (query = "", reset = false, currentOffset = 0) => {
    setLoading(true);
    try {
      const url = query
        ? `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${RESULTS_PER_PAGE}&offset=${currentOffset}&apiKey=${import.meta.env.VITE_API_KEY}`
        : `https://api.spoonacular.com/recipes/complexSearch?number=${RESULTS_PER_PAGE}&offset=${currentOffset}&apiKey=${import.meta.env.VITE_API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      if (reset) {
        setRecipes(data.results || []);
      } else {
        setRecipes((prev) => [...prev, ...(data.results || [])]);
      }

      if (!data.results || data.results.length < RESULTS_PER_PAGE) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes("", true, 0);
  }, []);

  const handleSearch = () => {
    if (search.trim() === "") {
      setOffset(0);
      fetchRecipes("", true, 0);
      return;
    }
    setOffset(0);
    fetchRecipes(search, true, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const loadMore = () => {
    const newOffset = offset + RESULTS_PER_PAGE;
    setOffset(newOffset);
    fetchRecipes(search, false, newOffset);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-orange-600 mb-4 text-center drop-shadow-md">
        🍳 Recipe Book
      </h1>
      <h2 className="text-xl text-white mb-8 text-center max-w-md mx-auto">
        Discover delicious recipes and find cooking inspiration.
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.trim() === "") {
              setOffset(0);
              fetchRecipes("", true, 0);
            }
          }}
          onKeyDown={handleKeyDown}
          className="p-3 rounded-lg border border-gray-400 text-black w-full bg-white/90 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-500 px-5 py-3 rounded-lg text-white font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          Search
        </button>
      </div>

      <h3 className="text-2xl font-semibold text-gray-100 mb-5 border-b border-orange-400 pb-2 max-w-max mx-auto">
        Recipes
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {hasMore && !loading && recipes.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="bg-orange-500 px-8 py-3 rounded-lg text-white font-semibold shadow-lg hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Load More...
          </button>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-12">
          <div className="w-12 h-12 border-4 border-transparent border-t-orange-500 border-b-orange-500 rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && recipes.length === 0 && (
        <p className="text-center text-gray-500 mt-8 text-lg">
          No recipes found 🍽️. API limit exceeded — please try again tomorrow.
        </p>
      )}
    </>
  );
}
