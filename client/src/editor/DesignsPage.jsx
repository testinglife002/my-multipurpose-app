// 2️⃣ src/editor/DesignsPage.jsx (React version)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserDesigns,
  getAllDesigns,
  deleteDesign,
} from "../services/design-service";
import { Loader2, Plus, Trash2 } from "lucide-react";
import "./designs.css";
// import RecentDesigns from "../components/RecentDesigns";

// import DesignModal from "./components/DesignModal";
// import RecentDesigns from "./components/RecentDesigns";
import { useEditorStore } from "../store";

export default function DesignsPage({ user }) {
  const navigate = useNavigate();

  const {
    setUserDesigns,
    userDesigns,
    setUserDesignsLoading,
    userDesignsLoading,
    showDesignsModal,
    setShowDesignsModal,
  } = useEditorStore();

  const [myDesigns, setMyDesigns] = useState([]);
  const [allDesigns, setAllDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDesigns();
    fetchUserDesigns();
  }, []);

  const loadDesigns = async () => {
    try {
      const [myRes, allRes] = await Promise.all([
        getUserDesigns(),
        getAllDesigns(),
      ]);

      setMyDesigns(myRes.data || []);
      setAllDesigns(allRes.data || []);
    } finally {
      setLoading(false);
    }
  };

  async function fetchUserDesigns() {
    setUserDesignsLoading(true);
    const result = await getUserDesigns();
    if (result?.success) setUserDesigns(result.data);
    setUserDesignsLoading(false);
  }

  const openDesign = (id) => navigate(`/editor/${id}`);

  const deleteMyDesign = async (id) => {
    if (!confirm("Delete this design?")) return;
    await deleteDesign(id);
    setMyDesigns((prev) => prev.filter((d) => d._id !== id));
  };

  if (loading) {
    return (
      <div className="loading">
        <Loader2 className="spin" />
      </div>
    );
  }

  return (
    <div className="designs-page">
      <div className="designs-header">
        <h1>Designs</h1>
        <button onClick={() => navigate("/editor/new")} className="create-btn">
          <Plus size={16} /> Create Design
        </button>
      </div>

      {/* MY DESIGNS */}
      <section>
        <h2>My Designs</h2>

        {myDesigns.length === 0 ? (
          <p className="empty-text">You have no designs yet</p>
        ) : (
          <div className="design-grid">
            {myDesigns.map((design) => (
              <div key={design._id} className="design-card">
                <div
                  className="design-preview"
                  onClick={() => openDesign(design._id)}
                >
                  <div className="preview-placeholder">
                    {design.width} × {design.height}
                  </div>
                </div>

                <div className="design-info">
                  <strong>{design.name}</strong>
                  <small>
                    Updated {new Date(design.updatedAt).toLocaleDateString()}
                  </small>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => deleteMyDesign(design._id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ALL DESIGNS */}
      <section>
        <h2>All Designs</h2>
        <div className="design-grid">
          {allDesigns.map((design) => (
            <div
              key={design._id}
              className="design-card readonly"
              onClick={() => openDesign(design._id)}
            >
              <div className="design-preview">
                <div className="preview-placeholder">
                  {design.width} × {design.height}
                </div>
              </div>

              <div className="design-info">
                <strong>{design.name}</strong>
                <small>by {design.userId?.username || "Unknown"}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/*<RecentDesigns />

      <DesignModal
        isOpen={showDesignsModal}
        onClose={setShowDesignsModal}
        userDesigns={userDesigns}
        userDesignsLoading={userDesignsLoading}
      />*/}
    </div>
  );
}
