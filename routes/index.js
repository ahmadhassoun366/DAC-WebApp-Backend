import authRoutes from "./authRoutes.js";

export const mountRoutes = (app) => {

    app.use("/auth", authRoutes);

};


