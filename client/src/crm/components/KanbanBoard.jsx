// 📄 src/crm/components/KanbanBoard.jsx
import './KanbanBoard.css'

const columns = {
  leads: "Leads",
  contacted: "Contacted",
  qualified: "Qualified",
  closed: "Closed",
};

export default function KanbanBoard({ data }) {
  return (
    <div className="kanban-board">
      {Object.keys(columns).map((key) => (
        <div className="kanban-column" key={key}>
          <h4>{columns[key]}</h4>
          {data.filter(d => d.status === key).map(card => (
            <div className="kanban-card" key={card.id}>
              <strong>{card.name}</strong>
              <small>{card.email}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
