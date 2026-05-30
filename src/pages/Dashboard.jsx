// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";


// this is the dashboard page 
// feature :
// 1. log out button 
// 2. protected route (only logged in user can access this page)
// 3. upload file (only .glb files allowed )
// 4 . list models uploaded by the user
export default function Dashboard() {

  // we need useState hook to manage the state of the uploaded files and the list of models uploaded by the user

  // files state will hold the file that the user selects for upload
  const [files , setFiles] = useState(null);

  // models state will hold the list of models uploaded by the user
  const [models , setModels] = useState([]);

  // useNavigate is a hook from react-router-dom that allows us to programmatically navigate to different routes in our application
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);


  //dashboard stats 
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
  try {
    const res = await api.get("/models/stats/overview");
    setStats(res.data);
  } catch (error) {
    console.error(error);
  }
};
  
  const deleteModel = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this model?");

  if (!confirmDelete) return;

  try {
    await api.delete(`/models/${id}`);
    fetchModels();
  } catch (error) {
    alert("Failed to delete model");
  }
};
  // this function will get the all models of users from DB , and set them into models state 
const fetchModels = async () => {
  try {
    setLoading(true);
    const response = await api.get("/models/my-models");
    setModels(response.data);
  } catch (error) {
    setError("Failed to fetch models");
  } finally {
    setLoading(false);
  }
};

  // fetchModels will be called when the component mounts to get the list of models uploaded by the user
  useEffect(() => {
    fetchModels();
    fetchStats();
  } , []); // empty dependency array means this effect will run only once when the component mounts



  // function to handle uploading of files
const uploadModel = async (e) => {
  e.preventDefault();

  if (!files) return alert("Please select a file to upload");

  const formData = new FormData();
  formData.append("model", files);

  try {
    setUploading(true);
    await api.post("/models/upload", formData);
    setFiles(null);
    fetchModels();
  } catch (error) {
    alert("Upload failed");
  } finally {
    setUploading(false);
  }
};

const updateVisibility = async (id, isPublic) => {
  try {
    await api.put(`/models/${id}/visibility`, {
      isPublic,
    });

    fetchModels();
    fetchStats();
  } catch (error) {
    console.error("Failed to update visibility", error);
  }
};

return (
  <div className="page">
    <div className="container">

        <div>
          <p className="subtitle">Upload, manage and view your GLB models.</p>
        </div>
        
        {stats && (
            <div className="stats-grid">
              <div className="card">
                <h3>{stats.totalModels}</h3>
                <p>Total Models</p>
              </div>

              <div className="card">
                <h3>{stats.publicModels}</h3>
                <p>Public Models</p>
              </div>

              <div className="card">
                <h3>{stats.privateModels}</h3>
                <p>Private Models</p>
              </div>

              <div className="card">
                <h3>
                  {stats.latestUpload?.originalName || "None"}
                </h3>
                <p>Latest Upload</p>
              </div>
            </div>
        )}


      <div className="card upload-box">
        <h2>Upload Model</h2>
        <p className="muted">Only .glb files are supported.</p>

        <form onSubmit={uploadModel}>
          <div className="drop-zone">
            <input
              type="file"
              accept=".glb"
              onChange={(e) => {
                const selectedFile = e.target.files[0];

                if (!selectedFile) return;

                const maxSize = 50 * 1024 * 1024;

                if (selectedFile.size > maxSize) {
                  alert("File too large. Please upload a file under 50MB.");
                  e.target.value = "";
                  return;
                }

                setFiles(selectedFile);
              }}
            />

            <p className="muted">Choose a .glb file to upload</p>

            {files && <p>Selected: {files.name}</p>}

            <button type="submit" disabled={uploading} className="btn-primary">
              {uploading ? "Uploading..." : "Upload Model"}
            </button>
          </div>
        </form>
      </div>
      <h2>Your Models</h2>
      

      {loading && <p className="muted">Loading models...</p>}
      {error && <p>{error}</p>}
      {!loading && models.length === 0 && (
        <p className="muted">No models uploaded yet.</p>
      )}



      <div className="models-grid">
       
          {models.map((model) => (
            <div className="card model-card" key={model._id}>
                <div className="model-header">
                  <h3>{model.originalName}</h3>


                        <span
                          className={
                            model.isPublic
                              ? "badge-public"
                              : "badge-private"
                          }
                        >
                          {model.isPublic
                            ? "🌍 Public"
                            : "🔒 Private"}
                        </span>
    </div>

    <p className="muted">
      Uploaded:
      {" "}
      {new Date(model.createdAt).toLocaleDateString()}
    </p>

    <div className="model-actions">
      <Link
        className="btn-primary"
        to={`/viewer/${model._id}`}
      >
        View
      </Link>



      <button
        className="btn-danger"
        onClick={() =>
          deleteModel(model._id)
        }
      >
        Delete
      </button>
      <div className="visibility-control">


  <button
    className="visibility-btn"
    onClick={() =>
      updateVisibility(model._id, !model.isPublic)
    }
  >
    {model.isPublic ? "Make Private" : "Make Public"}
  </button>
</div>
    </div>
            </div>
          ))}
      </div>
    </div>
  </div>
);
}