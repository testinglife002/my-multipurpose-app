// src/sales/components/activity/ActivityTimeline.jsx

import useSalesActivities from "../../hooks/useSalesActivities";
import ActivityItem from "./ActivityItem";

export default function ActivityTimeline() {
  const { activities, loading } = useSalesActivities();

  if (loading) return <p>Loading activity timeline...</p>;
  if (!activities.length) return <p>No activity yet.</p>;

  return (
    <div style={{ marginTop: 32 }}>
      <h3>Sales Activity Timeline</h3>

      {activities.map((activity) => (
        <ActivityItem key={activity._id} activity={activity} />
      ))}
    </div>
  );
}
