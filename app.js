require('dotenv').config();
const express = require('express');
const errorMiddleware = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});