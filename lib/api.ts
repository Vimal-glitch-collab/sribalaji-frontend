// lib/api.ts — Axios API client
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

// Inject token
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// ─── Public API helpers ───────────────────────────────
export const publicApi = {
  submitInquiry: (data: object) => api.post("/inquiries", data),
  getMachinery: (params?: object) => api.get("/machinery", { params }),
  getProjects: (params?: object) => api.get("/projects", { params }),
  getTestimonials: () => api.get("/testimonials"),
  getGallery: (params?: object) => api.get("/gallery", { params }),
  getSettings: () => api.get("/settings"),
};

// ─── Admin API helpers ────────────────────────────────
export const adminApi = {
  login: (email: string, password: string) => api.post("/auth/login", { email, password }),
  getMe: () => api.get("/auth/me"),
  getDashboard: () => api.get("/dashboard/stats"),
  getInquiriesChart: () => api.get("/dashboard/inquiries-chart"),

  // Inquiries
  getInquiries: (params?: object) => api.get("/inquiries", { params }),
  updateInquiry: (id: string, data: object) => api.patch(`/inquiries/${id}`, data),
  deleteInquiry: (id: string) => api.delete(`/inquiries/${id}`),

  // Machinery
  getMachinery: () => api.get("/machinery/all"),
  createMachinery: (data: FormData) => api.post("/machinery", data, { headers: { "Content-Type": "multipart/form-data" } }),
  updateMachinery: (id: string, data: FormData) => api.patch(`/machinery/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteMachinery: (id: string) => api.delete(`/machinery/${id}`),

  // Projects
  getProjects: () => api.get("/projects"),
  createProject: (data: FormData) => api.post("/projects", data, { headers: { "Content-Type": "multipart/form-data" } }),
  updateProject: (id: string, data: FormData) => api.patch(`/projects/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),

  // Testimonials
  getTestimonials: () => api.get("/testimonials/all"),
  createTestimonial: (data: object) => api.post("/testimonials", data),
  updateTestimonial: (id: string, data: object) => api.patch(`/testimonials/${id}`, data),
  deleteTestimonial: (id: string) => api.delete(`/testimonials/${id}`),

  // Gallery
  getGallery: () => api.get("/gallery/all"),
  uploadGallery: (data: FormData) => api.post("/gallery", data, { headers: { "Content-Type": "multipart/form-data" } }),
  updateGallery: (id: string, data: FormData | object) => {
    if (data instanceof FormData) {
      return api.patch(`/gallery/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
    }
    return api.patch(`/gallery/${id}`, data);
  },
  deleteGallery: (id: string) => api.delete(`/gallery/${id}`),

  // Settings
  getSettings: () => api.get("/settings"),
  updateSettings: (data: object) => api.post("/settings", data),
};
