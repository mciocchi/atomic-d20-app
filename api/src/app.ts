import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import characterRoutes from './routes/characterRoutes';
import skillRoutes from './routes/skillRoutes';
import aspectRoutes from './routes/aspectRoutes';
import itemRoutes from './routes/itemRoutes';
import maneuverRoutes from './routes/maneuverRoutes';

dotenv.config();

interface AtomicApplication extends Application {
    server?: any;
}

const app: AtomicApplication = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/characters', characterRoutes);
app.use('/api/v1/skills', skillRoutes);
app.use('/api/v1/aspects', aspectRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/maneuvers', maneuverRoutes);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.server = server;

export default app;
