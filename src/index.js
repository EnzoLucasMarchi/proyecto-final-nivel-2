import express from 'express';
import {PORT} from './configs/config.js'
import * as controller from './controller.js';
import { swaggerDocs } from './configs/swagger.js';

const app = express();

app.use(express.json());

//-----------------------------------------------------
/**
 * @openapi
 * /myaccount/{id}:
 *   get:
 *     summary: Obtiene información de la cuenta del usuario solicitante.
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
app.get('/myaccount/:id', controller.userGetAcc);
/**
 * @openapi
 * /accounts/{id}:
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
app.get('/accounts/:id', controller.userGetAccs);
/**
 * @openapi
 * /myposts/{id}:
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
app.get('/myposts/:id', controller.userGetPost);
/**
 * @openapi
 * /posts:
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
app.get('/posts', controller.userGetPosts);
/**
 * @openapi
 * /post/{title}:
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
app.get('/post/:title', controller.userGetTitle);
/**
 * @openapi
 * /categories:
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
app.get('/categories', controller.userGetCategories);
/**
 * @openapi
 * /category/{id}:
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
app.get('/category/:id', controller.userGetCategory);
//-----------------------------------------------------
/**
 * @openapi
 * /signin:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     description: Crea una nueva cuenta de usuario con el nombre, apellido y correo electrónico proporcionados.
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
 *         description: Cuenta creada exitosamente.
 *       '400':
 *         description: Datos de usuario incompletos.
 *       '500':
 *         description: Error del servidor.
 */
app.post('/signin', controller.userSignIn);
/**
 * @openapi
 * /posting:
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
app.post('/posting', controller.userPost);
/**
 * @openapi
 * /comment:
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
app.post('/comment', controller.userComment);
/**
 * @openapi
 * /newcategory:
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
app.post('/newcategory', controller.userPostCategory);
//-----------------------------------------------------
/**
 * @openapi
 * /updateaccount:
 *   put:
 *     summary: Actualiza la información de la cuenta de usuario.
 *     description: Actualiza la información de la cuenta de usuario (nombre, apellido, correo electrónico) proporcionada, identificada por el ID de usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID del usuario cuya cuenta se desea actualizar.
 *               userFName:
 *                 type: string
 *                 description: Nuevo nombre del usuario.
 *               userLName:
 *                 type: string
 *                 description: Nuevo apellido del usuario.
 *               userMail:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario.
 *     responses:
 *       '200':
 *         description: Cuenta actualizada exitosamente.
 *       '400':
 *         description: Datos de usuario incompletos o usuario no identificado.
 *       '500':
 *         description: Error del servidor.
 */
app.put('/updateaccount', controller.userUpdateAcc);
/**
 * @openapi
 * /editpost:
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
app.put('/editpost', controller.userUpdatePost);
/**
 * @openapi
 * /editcomments:
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
app.put('/editcomments', controller.userUpdateComment);
/**
 * @openapi
 * /editcategory:
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
app.put('/editcategory', controller.userUpdateCategory);
//-----------------------------------------------------
app.delete('/deleteaccount', controller.userDelete);
/**
 * @openapi
 *  paths:
 *  /deleteaccount:
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
app.delete('/deleteposts', controller.userDeletePost);
/**
 * @openapi
 * /deletecomments:
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
app.delete('/deletecomments', controller.userDeleteComment);
/**
 * @openapi
 * /deletecategories:
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
app.delete('/deletecategories', controller.userDeleteCategory);
//--------------------------------------------------------------
app.use(controller.handleError);

swaggerDocs(app);

app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`));