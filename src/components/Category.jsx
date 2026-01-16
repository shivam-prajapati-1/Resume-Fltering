import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from "../services/api";

function Category() {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  // useEffect(() => {
  //   loadCategories();
  // }, []);

  // const loadCategories = async () => {
  //   try {
  //     const res = await getCategories();
  //     setCategories(res.data);
  //   } catch {
  //     toast("error", "Failed to load Categories");
  //   }
  // };


  const loadCategories = useCallback(async () => {
  try {
    const res = await getCategories();
    setCategories(res.data);
  } catch {
    toast("error", "Failed to load Categories");
  }
}, []);

useEffect(() => {
  loadCategories();
}, [loadCategories]);

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
      toast("warning", "Category name required");
      return;
    }

    const data = { id, name };

    try {
      if (id === 0) {
        await addCategory(data);
        toast("success", "Category added");
      } else {
        await updateCategory(data);
        toast("success", "Category updated");
      }

      resetForm();
      loadCategories();
    } catch {
      toast("error", "Something went wrong");
    }
  };

  const handleEdit = (s) => {
    setId(s.id);
    setName(s.name);
  };

  const resetForm = () => {
    setId(0);
    setName("");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(id);
          toast("success", "Category deleted");
          loadCategories();
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
          <h4>Manage Category</h4>
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
              {categories.length > 0 ? (
                categories.map((s) => (
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
                    No categories found
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

export default Category;
