import express from 'express';
import adminController from '../controllers/onlyadmincontrollers.js';

const adminRoutes = express.Router();


/**
 * @openapi
 * /{id}/accounts:
 *   get:
 *     summary: Obtiene información de la cuenta de un usuario por su ID.
 *     description: Retorna los datos de la cuenta del usuario correspondientes al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Datos de la cuenta del usuario.
 *       '400':
 *         description: ID inválido.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error del servidor.
 */
adminRoutes.get('/:id/accounts/', adminController.getUserAccs);
/**
 * @openapi
 * categories/new:
 *   post:
 *     summary: Crea una nueva categoría.
 *     description: Crea una nueva categoría con el título y la descripción proporcionados, solo si el usuario tiene permisos de administrador.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID del usuario que está creando la categoría.
 *               categoryTitle:
 *                 type: string
 *                 description: Título de la categoría.
 *               categoryDesc:
 *                 type: string
 *                 description: Descripción de la categoría.
 *     responses:
 *       '200':
 *         description: Categoría creada exitosamente.
 *       '400':
 *         description: Datos incompletos para crear la categoría o usuario no identificado.
 *       '404':
 *         description: Usuario no encontrado o usuario no autorizado para crear categorías.
 *       '500':
 *         description: Error del servidor.
 */
adminRoutes.post('categories/new', adminController.postCategory);
/**
 * @openapi
 * categories/edit:
 *   put:
 *     summary: Actualiza una categoría existente.
 *     description: Actualiza el título y/o la descripción de una categoría existente identificada por su ID, solo si el usuario tiene permisos de administrador.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID del usuario que está actualizando la categoría.
 *               categoryID:
 *                 type: string
 *                 description: ID de la categoría que se desea actualizar.
 *               categoryTitle:
 *                 type: string
 *                 description: Nuevo título de la categoría.
 *               categoryDesc:
 *                 type: string
 *                 description: Nueva descripción de la categoría.
 *     responses:
 *       '200':
 *         description: Categoría actualizada exitosamente.
 *       '400':
 *         description: Datos incompletos o categoría no identificada.
 *       '404':
 *         description: Usuario no encontrado o usuario no autorizado para actualizar categorías.
 *       '500':
 *         description: Error del servidor.
 */
adminRoutes.put('categories/edit', adminController.updateCategory);
/**
 * @openapi
 * categories/delete:
 *   delete:
 *     summary: Elimina una categoría.
 *     description: Elimina una categoría identificada por su ID, solo si el usuario tiene permisos de administrador.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID del usuario que está eliminando la categoría.
 *               categoryID:
 *                 type: string
 *                 description: ID de la categoría que se desea eliminar.
 *               categoryTitle:
 *                 type: string
 *                 description: Título de la categoría que se va a eliminar (para referencia).
 *     responses:
 *       '200':
 *         description: Categoría eliminada exitosamente.
 *       '400':
 *         description: Datos incompletos o categoría no identificada.
 *       '404':
 *         description: Usuario no encontrado o usuario no autorizado para eliminar categorías.
 *       '500':
 *         description: Error del servidor.
 */
adminRoutes.delete('categories/delete', adminController.deleteCategory);

export default adminRoutes;