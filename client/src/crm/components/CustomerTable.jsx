// 📄 src/crm/components/CustomerTable.jsx
export default function CustomerTable({ customers }) {
  return (
    <table border="1" cellPadding="8" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((c) => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
