import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fs from 'fs/promises';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load the swagger.yaml file
const swaggerDocument = YAML.load(path.join(__dirname, 'config', 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
        const routeBase = `/${file.replace('Routes.js', '').toLowerCase()}s`; // will return "/books" and other routes for example.
        app.use(routeBase, route.default);
      }
    }
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

// load routes and start the server
loadRoutes(app).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to load routes:', error);
});

