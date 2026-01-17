// ✅ src/designs/pages/DesignDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDesigns } from "../../services/designService";
import "./design-dashboard.css";

export default function DesignDashboard() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDesigns()
      .then((res) => setDesigns(res.data))
      .catch(() => alert("Failed to load designs"))
      .finally(() => setLoading(false));
  }, []);

  const openDesign = (id) => {
    navigate(`/design/${id}`);
  };

  if (loading) return <p>Loading designs...</p>;

  return (
    <div className="design-dashboard">
      <h2>My Designs</h2>

      {designs.length === 0 ? (
        <p>No designs found.</p>
      ) : (
        <div className="design-grid">
          {designs.map((d) => (
            <div
              key={d._id}
              className="design-card"
              onClick={() => openDesign(d._id)}
            >
              <div className="design-thumb">
                <img
                  src={d.imagePreview || "/placeholder.png"}
                  alt={d.name}
                />
              </div>

              <div className="design-meta">
                <strong>{d.name}</strong>
                <span>
                  {d.width} × {d.height}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

