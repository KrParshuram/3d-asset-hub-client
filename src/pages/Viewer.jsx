import { useEffect, useState } from "react";
import api from "../api/axios";
import ModelViewer from "../components/ModelViewer";
import { Link, useParams } from "react-router-dom";


export default function Viewer() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const saveView = async (state) => {
  const res = await api.put(`/models/${id}/state`, state);
  setModel(res.data);
  // alert("View saved");
};

const saveThumbnail = async (thumbnail) => {
  try {
    await api.put(
      `/models/${id}/thumbnail`,
      {
        thumbnail,
      }
    );
  } catch (error) {
    console.error(error);
  }
};



useEffect(() => {
  const fetchModel = async () => {
    try {
      const res = await api.get(`/models/${id}`);
      setModel(res.data);
    } catch (error) {
      setError("Failed to load model");
    } finally {
      setLoading(false);
    }
  };

  fetchModel();
}, [id]);

  if (loading) return <p>Loading model...</p>;
  if (error) return <p>{error}</p>;

return (
  <div className="viewer-page">
    <div className="viewer-container">

      <div className="viewer-topbar">

        <Link
          className="btn-secondary"
          to="/dashboard"
        >
          ← Dashboard
        </Link>

      </div>

      <div className="viewer-info-card">

        <div>
          <h1>{model.originalName}</h1>

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
        onSaveView={saveView}
        onThumbnailGenerated={saveThumbnail}
      />

    </div>
  </div>
);
}