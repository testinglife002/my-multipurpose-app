// 📄 src/products/pages/ProductListPage.jsx
import { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import { Link } from "react-router-dom";
import ProductTable from "../components/ProductTable";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    newRequest.get("/products").then(res => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
        <div>
      <h2>Products</h2>
      <Link to="/products/create">➕ Add Product</Link>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.unit}</td>
              <td>
                <Link to={`/products/edit/${p._id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
        <ProductTable products={products} />
    </div>
    </div>
  );
}
