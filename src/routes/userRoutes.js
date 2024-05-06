import express from 'express';
import  userController from '../controllers/usercontrollers.js';

const userRoutes = express.Router();

/**
 * @openapi
 * /api/user/myaccount/{id}:
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
userRoutes.get('/myaccount/:id', userController.userGetAcc);
/**
 * @openapi
 * /api/user/signin:
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
userRoutes.post('/signin', userController.userSignIn);
/**
 * @openapi
 * /api/user/update:
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
userRoutes.put('/update', userController.userUpdateAcc);
/**
 * * /api/user/deleteaccount:
  * delete:
    * summary: Elimina la cuenta de usuario.
    * description: Elimina la cuenta de usuario identificada por el ID de usuario proporcionado.
    * requestBody:
      * required: true
      * content:
        * application/json:
          * schema:
            * type: object
            * properties:
              * userID:
                * type: string
                * description: ID del usuario cuya cuenta se desea eliminar.
              * userFName:
                * type: string
                * description: Nombre del usuario.
    * responses:
      * '200':
        * description: Cuenta eliminada exitosamente.
      * '400':
        * description: Datos de usuario incompletos o usuario no identificado.
      * '500':
        * description: Error del servidor.
 */
userRoutes.delete('/deletemaccount', userController.userDelete);

export default userRoutes;