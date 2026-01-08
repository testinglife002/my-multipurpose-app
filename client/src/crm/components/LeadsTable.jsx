// 📄 src/crm/components/LeadsTable.jsx
export default function LeadsTable({ leads, onConvert }) {
  return (
    <table border="1" cellPadding="8" width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Source</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <tr key={lead._id}>
            <td>{lead.name}</td>
            <td>{lead.source}</td>
            <td>{lead.status}</td>
            <td>
              {!lead.isConverted && (
                <button onClick={() => onConvert(lead._id)}>
                  Convert to Customer
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


