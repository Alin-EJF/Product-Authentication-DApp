import express, { Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { pool } from "./db";
import authRoutes from "./routes/authRoutes";
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const cookieParser = require("cookie-parser");
const allowedOrigins = ["http://127.0.0.1:5173", "http://localhost:5173"];

const corsOptions: CorsOptions = {
  credentials: true,
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use('/nominatim', createProxyMiddleware({   //location request
  target: 'https://nominatim.openstreetmap.org/',
  changeOrigin: true,
  pathRewrite: {
      '^/nominatim': ''
  },
  onProxyRes: function (proxyRes:any, req:Request, res:Response) {
    proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
  }
}));


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Check the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgreSQL database!");
});
