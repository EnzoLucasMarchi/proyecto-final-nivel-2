import express from 'express';
import categoryController from '../controllers/categorycontrollers.js';

const categoriesRoutes = express.Router();

//------------------------------------------------------------------------
/**
 * @openapi
 * /all:
 *   get:
 *     summary: Obtiene todas las categorías de los posts.
 *     description: Retorna todas las categorías de los posts disponibles en la base de datos.
 *     responses:
 *       '200':
 *         description: Categorías de los posts.
 *       '404':
 *         description: Categorías no encontradas.
 *       '500':
 *         description: Error del servidor.
 */
categoriesRoutes.get('/all',categoryController.getCategories);
/**
 * @openapi
 * /search/{id}:
 *   get:
 *     summary: Obtiene los posts asociados a una categoría por su ID.
 *     description: Retorna los posts asociados a la categoría correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la categoría.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Posts asociados a la categoría.
 *       '400':
 *         description: ID no identificado.
 *       '404':
 *         description: Categoría no encontrada.
 *       '500':
 *         description: Error del servidor.
 */
categoriesRoutes.get('/search/:id', categoryController.getCategory);

export default categoriesRoutes;