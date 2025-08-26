import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import fileRoutes from "./routes/file.routes.js"
import userRoutes from "./routes/user.routes.js"
import path from 'path';
const __dirname = path.resolve();

import express from "express"
import cors from "cors"
import { File } from "./models/file.models.js";


dotenv.config();

const PORT = process.env.PORT || 6600;

// Validate required environment variables
const requiredEnvVars = [
    'MONGODB_URL',
    'JWT_SECRET',
    'AZURE_STORAGE_CONNECTION_STRING',
    'AZURE_CONTAINER_NAME',
    'BASE_URL'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars);
    console.error('Please set these environment variables in your Azure Web App configuration.');
    process.exit(1);
}

const startServer = async () => {
    try {
        await connectDB();

        // Register routes
        app.use("/api/files", fileRoutes);
        app.use("/api/users", userRoutes);

        // Health check endpoint
        app.get('/health', (req, res) => {
            res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development',
                port: PORT,
                baseUrl: process.env.BASE_URL,
                mongodb: process.env.MONGODB_URL ? 'Configured' : 'Missing',
                azure: process.env.AZURE_STORAGE_CONNECTION_STRING ? 'Configured' : 'Missing'
            });
        });

        // Serve static files from the React app in production
        if (process.env.NODE_ENV === 'production') {
            // Try multiple possible paths for the client build
            const possiblePaths = [
                path.join(__dirname, '../client/dist'),
                path.join(__dirname, '../../client/dist'),
                path.join(__dirname, 'client/dist'),
                path.join(__dirname, 'dist')
            ];
            
            let staticPath = null;
            for (const testPath of possiblePaths) {
                try {
                    const fs = await import('fs');
                    if (fs.existsSync(testPath)) {
                        staticPath = testPath;
                        break;
                    }
                } catch (error) {
                    console.log(`Path ${testPath} not found`);
                }
            }
            
            if (staticPath) {
                app.use(express.static(staticPath));
                
                // Handle React routing, return all requests to React app
                app.get('*', (req, res) => {
                    res.sendFile(path.join(staticPath, 'index.html'));
                });
            } else {
                console.log('No static files found, serving API only');
            }
        } else {
            app.use(express.static(path.join(__dirname, '/client')));
        }

        app.get('/f/:shortCode', async (req, res) => {

            const { shortCode } = req.params;
            if (!shortCode) {
                return res.status(400).send('Short code is required');
            }
            console.log("Short code:", shortCode);
            // Handle the download logic here
            try {
                const file = await File.findOne({ shortUrl: `${process.env.BASE_URL}/f/${shortCode}` });
                if (!file) {
                    return res.status(404).send('File not found');
                }
                // just return that all file info
                res.json(file);
            } catch (error) {
                console.error("Error fetching file:", error);
                res.status(500).send('Internal Server Error');
            }

        });

        app.listen(PORT, () => {
            console.log(`✅ Server is running at http://localhost:${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 Base URL: ${process.env.BASE_URL}`);
        });
    } catch (error) {
        console.error("❌ Error starting server:", error);
    }
};

startServer();