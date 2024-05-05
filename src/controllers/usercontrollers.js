import {pool} from '../configs/db.js';

export async function userGetAcc(req, res){
    try {
        const userID = req.params.id;
        if(!userID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        const [data] = await pool.query('SELECT * FROM users WHERE userID = ? ', [userID]);
        if (data.length ===0) {
            return res.status(404).json({message : 'Usuario no encontrado'})
        }
        res.json(data);         
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function userSignIn(req, res){
    try {
        const { userFName, userLName, userMail} = req.body;
        if (!userFName) {
            return res.status(400).json({ message: 'No hay nombre' });
        }
        if (!userLName) {
            return res.status(400).json({ message: 'No hay apellido' });
        }
        if (!userMail) {
            return res.status(400).json({ message: 'No hay mail' });
        }
        await pool.query('INSERT INTO users (userFName, userLName, userMail, userRol) VALUES (?, ?, ?, ?)', [userFName, userLName, userMail, 2]);
        res.json({'Bienvenido! Tu cuenta:' : userFName});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function userUpdateAcc(req, res){
    try {
        const { userID, userFName, userLName, userMail} = req.body;
        if(!userID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        if(userFName){
            await pool.query('UPDATE users SET userFName = ? WHERE userID = ?', [userFName, userID]);
        }
        if(userLName){
            await pool.query('UPDATE users SET userLName = ? WHERE userID = ?', [userLName, userID]);
        }
        if(userMail){
            await pool.query('UPDATE users SET userMail = ? WHERE userID = ?', [userMail, userID]);
        }
        res.json({'Se actualizo tu cuenta ' : userFName});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function userDelete(req, res){
    try {
        const { userID, userFName} = req.body;
        if(!userID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        await pool.query('DELETE FROM users WHERE userID = ?', [userID]);
        res.json({':( Adios ' : userFName});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

const userController = {
    userGetAcc,
    userSignIn,
    userUpdateAcc,
    userDelete
};

export default userController;