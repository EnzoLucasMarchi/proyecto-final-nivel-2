import express from 'express';
import postController from '../controllers/postcontroller.js';

const postsRoutes = express.Router();

/**
 * @openapi
 * /myposts/u/{id}:
 *   get:
 *     summary: Obtiene los posts del usuario por su ID.
 *     description: Retorna los posts del usuario correspondientes al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario cuyos posts se desean obtener.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Posts del usuario.
 *       '400':
 *         description: ID inválido.
 *       '404':
 *         description: Posts no encontrados.
 *       '500':
 *         description: Error del servidor.
 */
postsRoutes.get('/myposts/u/:id', postController.userGetPosts);
/**
 * @openapi
 * /all:
 *   get:
 *     summary: Obtiene todos los posts y sus comentarios.
 *     description: Retorna todos los posts y sus comentarios en orden ascendente por título del post.
 *     responses:
 *       '200':
 *         description: Publicaciones y sus comentarios.
 *       '404':
 *         description: No se encuentran publicaciones.
 *       '500':
 *         description: Error del servidor.
 */
postsRoutes.get('/all', postController.getAllPosts);
/**
 * @openapi
 * /{title}:
 *   get:
 *     summary: Obtiene un post por su título.
 *     description: Retorna el post correspondiente al título proporcionado.
 *     parameters:
 *       - in: path
 *         name: title
 *         description: Título del post.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Post encontrado.
 *       '400':
 *         description: Título no identificado.
 *       '404':
 *         description: Título no encontrado.
 *       '500':
 *         description: Error del servidor.
 */
postsRoutes.get('/:title', postController.getPostTitle);
/**
 * @openapi
 * /new:
 *   post:
 *     summary: Publica un nuevo contenido.
 *     description: Publica un nuevo contenido con el nombre, apellido y correo electrónico proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userFName:
 *                 type: string
 *                 description: Nombre del usuario.
 *               userLName:
 *                 type: string
 *                 description: Apellido del usuario.
 *               userMail:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *     responses:
 *       '200':
 *         description: Contenido publicado exitosamente.
 *       '400':
 *         description: Datos de usuario incompletos.
 *       '500':
 *         description: Error del servidor.
 */
postsRoutes.post('/new', postController.newPost);
/**
 * @openapi
 * /edit:
 *   put:
 *     summary: Actualiza un post existente.
 *     description: Actualiza el título y/o contenido de un post existente identificado por su ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postID:
 *                 type: string
 *                 description: ID del post que se desea actualizar.
 *               postTitle:
 *                 type: string
 *                 description: Nuevo título del post.
 *               postContent:
 *                 type: string
 *                 description: Nuevo contenido del post.
 *     responses:
 *       '200':
 *         description: Post actualizado exitosamente.
 *       '400':
 *         description: Datos incompletos para actualizar el post o publicación no identificada.
 *       '500':
 *         description: Error del servidor.
 */
postsRoutes.put('/edit', postController.updatePost);
/**
 * @openapi
 *  paths:
 *  /delete:
 *   delete:
 *     summary: Elimina una cuenta de usuario.
 *     description: Elimina la cuenta de usuario identificada por su ID, junto con todos los datos asociados.
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la cuenta de usuario que se desea eliminar.
 *       - in: query
 *         name: userFName
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del usuario asociado a la cuenta.
 *     responses:
 *       '200':
 *         description: Cuenta de usuario eliminada exitosamente.
 *       '400':
 *         description: Datos incompletos o usuario no identificado.
 *       '500':
 *         description: Error del servidor.
 */
postsRoutes.delete('/delete', postController.deletePost);

export default postsRoutes;