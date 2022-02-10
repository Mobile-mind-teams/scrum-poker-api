const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const routerApi = require("./routes/index")
const app = express();

// Configuring Express
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

//Creating endpoints
routerApi(app)

const PORT = process.env.PORT || 5000;

// Listen for URIs on a port
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
