import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import open from 'open';  // Import the open package
import cors from 'cors'; // Import the cors package

// Load environment variables from .env file
dotenv.config();

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors()); // Add this line to enable CORS for all routes

// Load the swagger.yaml file
const swaggerDocument = YAML.load(path.join(__dirname, '../config', 'swagger.yaml'));

// Function to dynamically import all route files in the routes directory
const loadRoutes = async (app) => {
  const routesPath = path.join(__dirname, 'routes');
  try {
    const files = await fs.readdir(routesPath);
    for (const file of files) {
      if (file.endsWith('.js')) {
        const routePath = pathToFileURL(path.join(routesPath, file)).href;
        const route = await import(routePath);
        // Manually define base paths
        const routeBase = `/library-api/${file.replace('Routes.js', '').toLowerCase()}`; // will return "/books" and other routes for example.
        app.use(routeBase, route.default);
      }
    }
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

// Load routes before defining the catch-all route
loadRoutes(app).then(() => {
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Serve the React frontend
  const buildPath = path.join(__dirname, '../frontend', 'build');
  app.use(express.static(buildPath));

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    //open(`http://localhost:${port}/api-docs`); // Open the Swagger UI in the default web browser
  });
}).catch(error => {
  console.error('Failed to load routes:', error);
});
