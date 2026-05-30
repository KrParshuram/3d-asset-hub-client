import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import ModelViewer from "../components/ModelViewer";

export default function PublicViewer() {
  const { id } = useParams();

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await api.get(
          `/models/public/${id}`
        );

        setModel(res.data);
      } catch (error) {
        setError("Model not found");
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <p>Loading model...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>{error}</h2>

        <Link
          className="btn-secondary"
          to="/"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="viewer-page">
      <div className="container">

        <div className="viewer-topbar">
          <Link
            className="btn-secondary"
            to="/"
          >
            ← Back to Gallery
          </Link>
        </div>

        <div className="viewer-info-card">

          <div>
            <h1>{model.originalName}</h1>

            <p className="muted">
              Public Model
            </p>

            <p className="muted">
              Uploaded on{" "}
              {new Date(
                model.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="viewer-actions">

            <a
              href={model.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Download
            </a>

          </div>

        </div>

        <ModelViewer
          modelUrl={model.fileUrl}
          cameraState={model.cameraState}
          onSaveView={() => {}}
        />

      </div>
    </div>
  );
}