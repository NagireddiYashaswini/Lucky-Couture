import api from "./api";

// These calls target the future backend at /api/auth/*.
// Until the backend exists, callers should catch errors and fall back
// to local/demo behaviour (handled in AuthContext).

export const authService = {
  login: (payload) => api.post("/auth/login", payload),
  signup: (payload) => api.post("/auth/signup", payload),
  forgotPassword: (payload) => api.post("/auth/forgot-password", payload),
  getProfile: () => api.get("/auth/me"),
};

export const orderService = {
  createTailoringOrder: (payload) => api.post("/tailoring-orders", payload),
  getMyOrders: () => api.get("/orders/me"),
};

export const productService = {
  getProducts: (params) => api.get("/products", { params }),
  getProductById: (id) => api.get(`/products/${id}`),
};

export default authService;
