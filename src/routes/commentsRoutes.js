import express from 'express';
import commentController from '../controllers/commentcontrollers.js';

const commentsRoutes = express.Router();

/**
 * @openapi
 * /new:
 *   post:
 *     summary: Publica un nuevo comentario en un post.
 *     description: Publica un nuevo comentario en un post específico identificado por el ID de usuario y el ID de post proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID del usuario que realiza el comentario.
 *               postID:
 *                 type: string
 *                 description: ID del post en el que se realiza el comentario.
 *               commentContent:
 *                 type: string
 *                 description: Contenido del comentario.
 *     responses:
 *       '200':
 *         description: Comentario publicado exitosamente.
 *       '400':
 *         description: Datos incompletos para publicar el comentario.
 *       '500':
 *         description: Error del servidor.
 */
commentsRoutes.post('/new', commentController.postComment);

/**
 * @openapi
 * /edit:
 *   put:
 *     summary: Actualiza un comentario existente.
 *     description: Actualiza el contenido de un comentario existente identificado por su ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentID:
 *                 type: string
 *                 description: ID del comentario que se desea actualizar.
 *               commentContent:
 *                 type: string
 *                 description: Nuevo contenido del comentario.
 *     responses:
 *       '200':
 *         description: Comentario actualizado exitosamente.
 *       '400':
 *         description: Datos incompletos o comentario no identificado.
 *       '500':
 *         description: Error del servidor.
 */
commentsRoutes.put('/edit', commentController.updateComment);

/**
 * @openapi
 * /delete:
 *   delete:
 *     summary: Elimina un comentario.
 *     description: Elimina un comentario identificado por su ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentID:
 *                 type: string
 *                 description: ID del comentario que se desea eliminar.
 *     responses:
 *       '200':
 *         description: Comentario eliminado exitosamente.
 *       '400':
 *         description: Datos incompletos o comentario no identificado.
 *       '500':
 *         description: Error del servidor.
 */
commentsRoutes.delete('/delete', commentController.deleteComment);

export default commentsRoutes;