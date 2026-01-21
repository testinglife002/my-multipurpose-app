// src/sales/components/AutomatedFollowUps.jsx

export default function AutomatedFollowUps({ data }) {
  return (
    <div>
      <h3>Automated Follow-Ups</h3>

      <table width="100%" border="1">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Channel</th>
            <th>Scheduled</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((f, i) => (
            <tr key={i}>
              <td>{f.customer}</td>
              <td>{f.channel}</td>
              <td>{f.date}</td>
              <td>{f.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
