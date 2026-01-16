import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill
} from "../services/api";

function Skill() {
  const [skills, setSkills] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  // useEffect(() => {
    
  //   loadSkills();
  // }, []);

  // const loadSkills = async () => {
  //   try {
  //     const res = await getSkills();
  //     setSkills(res.data);
  //   } catch {
  //     toast("error", "Failed to load skills");
  //   }
  // };


const loadSkills = useCallback(async () => {
  try {
    const res = await getSkills();
    setSkills(res.data);
  } catch {
    toast("error", "Failed to load skills");
  }
}, []);

useEffect(() => {
  loadSkills();
}, [loadSkills]);


  const toast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast("warning", "Skill name required");
      return;
    }

    const data = { id, name };

    try {
      if (id === 0) {
        await addSkill(data);
        toast("success", "Skill added");
      } else {
        await updateSkill(data);
        toast("success", "Skill updated");
      }

      resetForm();
      loadSkills();
    } catch {
      toast("error", "Something went wrong");
    }
  };

  const handleEdit = (skill) => {
    setId(skill.id);
    setName(skill.name);
  };

  const resetForm = () => {
    setId(0);
    setName("");
  };

  const handleDelete = (skillId) => {
    Swal.fire({
      title: "Delete Skill?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSkill(skillId);
          toast("success", "Skill deleted");
          loadSkills();
        } catch {
          toast("error", "Delete failed");
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Manage Skills</h4>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Enter skill name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <button
                className="btn btn-success me-2"
                onClick={handleSave}
              >
                {id === 0 ? "Save" : "Update"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </div>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th width="180">Actions</th>
              </tr>
            </thead>

            <tbody>
              {skills.length > 0 ? (
                skills.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(s)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No skills found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Skill;
