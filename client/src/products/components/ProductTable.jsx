// 📄 ProductTable.jsx
import './ProductTable.css'


export default function ProductTable({ products }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        placeholder="Search product..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="table-search"
      />

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p=>(
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
