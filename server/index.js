require("dotenv").config();
const app = require('./app')
const connectDB = require('./config/db')

const port = process.env.port || 3000;
connectDB();

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
