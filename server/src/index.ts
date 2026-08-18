import express from 'express';

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Presight API is running',
  });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});