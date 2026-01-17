// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { addJob, getCategories, getSkills } from "../services/api";

// function JobPost() {
//   const [title, setTitle] = useState("");
//   const [categoryId, setCategoryId] = useState(0);
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   const [categories, setCategories] = useState([]);
//   const [allSkills, setAllSkills] = useState([]);

//   // Load dropdown data
//   useEffect(() => {
//     loadCategories();
//     loadSkills();
//   }, []);

//   const loadCategories = async () => {
//     const res = await getCategories();
//     setCategories(res.data);
//   };

//   const loadSkills = async () => {
//     const res = await getSkills();
//     setAllSkills(res.data);
//   };

//   const handleSkillChange = (skillId) => {
//     if (selectedSkills.includes(skillId)) {
//       setSelectedSkills(selectedSkills.filter(id => id !== skillId));
//     } else {
//       setSelectedSkills([...selectedSkills, skillId]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || categoryId === 0 || selectedSkills.length === 0) {
//       Swal.fire("Warning", "All fields are required", "warning");
//       return;
//     }

//     const jobData = {
//       title,
//       categoryId,
//       skillIds: selectedSkills
//     };

//     try {
//       await addJob(jobData);
//       Swal.fire("Success", "Job added successfully", "success");
//       resetForm();
//     } catch (err) {
//       console.error(err.response?.data);
//       Swal.fire("Error", "Failed to add job", "error");
//     }
//   };

//   const resetForm = () => {
//     setTitle("");
//     setCategoryId(0);
//     setSelectedSkills([]);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card shadow">
//         <div className="card-header bg-primary text-white">
//           <h4>Add Job</h4>
//         </div>

//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             {/* Job Title */}
//             <div className="mb-3">
//               <label className="form-label">Job Title</label>
//               <input
//                 className="form-control"
//                 placeholder="Enter job title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>

//             {/* Category */}
//             <div className="mb-3">
//               <label className="form-label">Category</label>
//               <select
//                 className="form-select"
//                 value={categoryId}
//                 onChange={(e) => setCategoryId(Number(e.target.value))}
//               >
//                 <option value="0">Select Category</option>
//                 {categories.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Skills (Multi Select) */}
//             <div className="mb-3">
//               <label className="form-label">Skills</label>
//               <div className="row">
//                 {allSkills.map((s) => (
//                   <div className="col-md-4" key={s.id}>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={selectedSkills.includes(s.id)}
//                         onChange={() => handleSkillChange(s.id)}
//                       />
//                       <label className="form-check-label">
//                         {s.name}
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <button className="btn btn-success">
//               Add Job
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobPost;






import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { addJob, getCategories, getSkills } from "../services/api";

function JobPost() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [categories, setCategories] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  // load categories
  const loadCategories = useCallback(async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
      Swal.fire("Error", "Failed to load categories", "error");
    }
  }, []);

  // load skills
  const loadSkills = useCallback(async () => {
    try {
      const res = await getSkills();
      setAllSkills(res.data);
    } catch {
      Swal.fire("Error", "Failed to load skills", "error");
    }
  }, []);

  // Load dropdown data
  useEffect(() => {
    loadCategories();
    loadSkills();
  }, [loadCategories, loadSkills]);

  const handleSkillChange = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || categoryId === 0 || selectedSkills.length === 0) {
      Swal.fire("Warning", "All fields are required", "warning");
      return;
    }

    const jobData = {
      title,
      categoryId,
      skillIds: selectedSkills,
    };

    try {
      await addJob(jobData);
      Swal.fire("Success", "Job added successfully", "success");
      resetForm();
    } catch {
      Swal.fire("Error", "Failed to add job", "error");
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategoryId(0);
    setSelectedSkills([]);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Add Job</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Job Title */}
            <div className="mb-3">
              <label className="form-label">Job Title</label>
              <input
                className="form-control"
                placeholder="Enter job title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
              >
                <option value="0">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div className="mb-3">
              <label className="form-label">Skills</label>
              <div className="row">
                {allSkills.map((s) => (
                  <div className="col-md-4" key={s.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedSkills.includes(s.id)}
                        onChange={() => handleSkillChange(s.id)}
                      />
                      <label className="form-check-label">
                        {s.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-success">
              Add Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobPost;
