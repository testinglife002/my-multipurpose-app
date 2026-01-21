// src/sales/components/SalesRepLeaderboard.jsx

export default function SalesRepLeaderboard({ data }) {
  return (
    <div>
      <h3>Sales Rep Leaderboard</h3>

      <table width="100%" border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Sales Rep</th>
            <th>Total Sales</th>
            <th>Invoices Closed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rep, i) => (
            <tr key={rep.userId}>
              <td>{i + 1}</td>
              <td>{rep.name}</td>
              <td>{rep.totalSales}</td>
              <td>{rep.invoicesClosed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
