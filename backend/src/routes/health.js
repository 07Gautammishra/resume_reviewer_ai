import express from "express";
import mongoose from "mongoose";


const router = express.Router();
router.get("/", (req, res) => {
    const status = ["disconnected", "connected", "connecting", "disconnecting"];
    res.json({
        status: "ok",
        uptime: Math.floor(process.uptime()),
        environment: process.env.NODE_ENV || "development",
        db: status[mongoose.connection.readyState] || "unknown",
        timestamp: new Date().toISOString(),
    });
});


export default router;