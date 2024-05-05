import express from 'express';
import {PORT} from './configs/config.js'
import {handleError} from './controllers/controller.js';
import { swaggerDocs } from './configs/swagger.js';
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/onlyAdminRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentsRoutes from './routes/commentsRoutes.js'
import categoriesRoutes from './routes/categoriesRoutes.js'

const app = express();

app.use('api/user', userRoutes);

app.use('api/admin', adminRoutes);

app.use('api/post', postRoutes);

app.use('api/comments', commentsRoutes);

app.use('api/categories', categoriesRoutes);

app.use(express.json());

app.use(handleError);

swaggerDocs(app);

app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`));