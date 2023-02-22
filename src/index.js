require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');

app.use(express.json());
app.use(helmet());
const transcribeRoutes = require('./infrastructure/rest/transcribe-controller');

app.use('/api/v1/transcribe', transcribeRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
