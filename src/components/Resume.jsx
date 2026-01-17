import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  getCategories,
  getSkills,
  getResumes,
  addResume
} from "../services/api";

function Resume() {

  /* ================= MASTER DATA ================= */
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumes, setResumes] = useState([]);

  /* ================= FILTER ================= */
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [filterSkillId, setFilterSkillId] = useState("");

  /* ================= UPLOAD ================= */
  const [name, setName] = useState("");
  const [uploadCategoryId, setUploadCategoryId] = useState("");
  const [uploadSkillId, setUploadSkillId] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);

 

  // const loadCategories = async () => {
  //   const res = await getCategories();
  //   setCategories(res.data);
  // };

  // const loadSkills = async () => {
  //   const res = await getSkills();
  //   setSkills(res.data);
  // };

  // const loadAllResumes = async () => {
  //   const res = await getResumes(null, null);
  //   setResumes(res.data);
  // };


  const loadCategories = useCallback(async () => {
  const res = await getCategories();
  setCategories(res.data);
}, []);

const loadSkills = useCallback(async () => {
  const res = await getSkills();
  setSkills(res.data);
}, []);

const loadAllResumes = useCallback(async () => {
  const res = await getResumes(null, null);
  setResumes(res.data);
}, []);


  // useEffect(() => {
  //   loadCategories();
  //   loadSkills();
  //   loadAllResumes();
  // }, []);

  useEffect(() => {
  loadCategories();
  loadSkills();
  loadAllResumes();
}, [loadCategories, loadSkills, loadAllResumes]);


  /* ================= FILTER ================= */
  const handleFilter = async () => {
    const res = await getResumes(
      filterCategoryId || null,
      filterSkillId || null
    );
    setResumes(res.data);
  };

  /* ================= UPLOAD ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !uploadCategoryId || !uploadSkillId || !experience || !image) {
      Swal.fire("Warning", "All fields are required", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("CategoryId", uploadCategoryId);
    formData.append("SkillId", uploadSkillId);
    formData.append("Experience", experience);
    formData.append("Image", image);

    try {
      await addResume(formData);
      Swal.fire("Success", "Resume uploaded successfully", "success");

      document.getElementById("closeResumeModal").click();
      resetForm();
      loadAllResumes();
    } catch {
      Swal.fire("Error", "Upload failed", "error");
    }
  };

  const resetForm = () => {
    setName("");
    setUploadCategoryId("");
    setUploadSkillId("");
    setExperience("");
    setImage(null);
  };

  const getCategoryName = (id) =>
    categories.find(c => c.id === id)?.name || "N/A";

  const getSkillName = (id) =>
    skills.find(s => s.id === id)?.name || "N/A";

  return (
    <div className="container mt-4">

      {/* ===== TOP BAR ===== */}
      <div className="d-flex justify-content-between mb-3">
        <h4>Resumes</h4>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#uploadResumeModal"
          onClick={() => {
            setUploadCategoryId("");
            setUploadSkillId("");
          }}
        >
          + Upload Resume
        </button>
      </div>

      {/* ===== FILTER ===== */}
      <div className="card mb-3">
        <div className="card-body row">
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterCategoryId}
              onChange={(e) => setFilterCategoryId(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={filterSkillId}
              onChange={(e) => setFilterSkillId(e.target.value)}
            >
              <option value="">All Skills</option>
              {skills.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <button className="btn btn-primary w-100" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* ===== RESUME LIST ===== */}
      <table className="table table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>Name</th>
            <th>Experience</th>
            <th>Category</th>
            <th>Skill</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {resumes.length > 0 ? resumes.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.experience}</td>
              <td>{getCategoryName(r.categoryId)}</td>
              <td>{getSkillName(r.skillId)}</td>
              <td>
                <a
                  href={`https://localhost:7094/Uploads/${r.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="text-center">
                No resumes found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ===== UPLOAD MODAL ===== */}
      <div className="modal fade" id="uploadResumeModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Upload Resume</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                id="closeResumeModal"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      placeholder="Candidate Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={uploadCategoryId}
                      onChange={(e) => setUploadCategoryId(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={uploadSkillId}
                      onChange={(e) => setUploadSkillId(e.target.value)}
                    >
                      <option value="">Select Skill</option>
                      {skills.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>

                <button className="btn btn-success w-100">
                  Upload Resume
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Resume;
