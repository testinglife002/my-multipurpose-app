// src/sales/components/activity/ActivityItem.jsx

export default function ActivityItem({ activity }) {
  return (
    <div
      style={{
        padding: 12,
        borderLeft: "3px solid #4f46e5",
        marginBottom: 12,
        background: "#f9fafb",
        borderRadius: 6,
      }}
    >
      <strong>{activity.type.toUpperCase()}</strong>
      <p>{activity.message || "No details"}</p>

      <small>
        {new Date(activity.createdAt).toLocaleString()}
      </small>
    </div>
  );
}
