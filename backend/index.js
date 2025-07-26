const express = require('express'); 
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc');
const models = require('./Models/db'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const app = express();
const PORT = process.env.PORT || 5000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'This is a sample API using Express and Swagger',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./Routes/*.js'], // ✅ Adjust path to where your route files are
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// ✅ Swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/ping',(req,res) =>{
    res.send('pong');
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter)
app.use('/products', ProductRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})