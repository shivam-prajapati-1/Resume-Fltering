import axios from "axios";

const baseUrl = "https://localhost:7094/api";

/* ================= AUTH ================= */
export const loginUser = (data) =>
  axios.post(`${baseUrl}/auth/login`, data);

/* ================= SKILLS ================= */
export const getSkills = () => axios.get(`${baseUrl}/Skills`);


export const addSkill = (data) =>
  axios.post(`${baseUrl}/Skills`, data);

export const updateSkill = (data) =>
  axios.put(`${baseUrl}/Skills`, data);

export const deleteSkill = (id) =>
  axios.delete(`${baseUrl}/Skills/${id}`);

// Category

export const getCategories = () => axios.get(`${baseUrl}/Categories`);


export const addCategory = (data) =>
  axios.post(`${baseUrl}/Categories`, data);

export const updateCategory = (data) =>
  axios.put(`${baseUrl}/Categories`, data);

export const deleteCategory = (id) =>
  axios.delete(`${baseUrl}/Categories/${id}`);



// Resume APIs
export const getResumes = (categoryId, skillId) =>
  axios.get(`${baseUrl}/Resumes`, {
    params: { CategoryId: categoryId, SkillId: skillId }
  });

export const getAllResumes = (categoryId, skillId) =>
  axios.get(`${baseUrl}/Resumes`, {
    params: { CategoryId: categoryId, SkillId: skillId }
  });

export const addResume = (formData) =>
  axios.post(`${baseUrl}/Resumes`, formData);


//jobs

/* ===== Job API ===== */
export const addJob = (jobData) =>
  axios.post(`${baseUrl}/Jobs`, jobData);

export default baseUrl;
