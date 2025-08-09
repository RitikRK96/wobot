import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
