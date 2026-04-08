import express from 'express';
import dotenv from 'dotenv';
import schoolRoutes from './routes/school.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});