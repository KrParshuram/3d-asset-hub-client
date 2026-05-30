import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function PublicGallery() {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPublicModels();
  }, []);

  const fetchPublicModels = async () => {
    try {
      const res = await api.get("/models/public");
      setModels(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredModels = models.filter((model) =>
    model.originalName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="gallery-hero">
        <h1>Public 3D Gallery</h1>
        <p>
          Explore interactive 3D models shared by the community.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="card">
          <h2>{models.length}</h2>
          <p>Public Models</p>
        </div>

        <div className="card">
          <h2>
            {new Set(models.map((m) => m.user)).size}
          </h2>
          <p>Creators</p>
        </div>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search models..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredModels.map((model) => (
          <div
            className="gallery-card"
            key={model._id}
          >
            <div className="thumbnail-placeholder">
              3D
            </div>

            <div className="gallery-content">
              <h3>{model.originalName}</h3>

              <span className="badge-public">
                🌍 Public
              </span>

              <p className="muted">
                {new Date(
                  model.createdAt
                ).toLocaleDateString()}
              </p>

              <Link
                className="btn-primary"
                to={`/public-viewer/${model._id}`}
              >
                Open Viewer
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <p className="muted">
          No models found.
        </p>
      )}
    </div>
  );
}