import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./src/index.js','./src/routes/userRoutes.js','./src/routes/postRoutes.js','./src/routes/onlyAdminRoutes.js', './src/routes/commentsRoutes.js', './src/routes/categoriesRoutes.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

 export const swaggerDocs = (app) => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));