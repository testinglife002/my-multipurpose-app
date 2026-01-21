// 📄 src/products/product.routes.jsx
import { Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage";

export default function ProductRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/create" element={<ProductCreatePage />} />
      <Route path="/edit/:id" element={<ProductEditPage />} />
    </Routes>
  );
}
