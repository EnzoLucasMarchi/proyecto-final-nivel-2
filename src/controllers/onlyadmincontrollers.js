import {pool} from '../configs/db.js';

export async function getUserAccs(req, res){
    try {
        const userID = req.params.id;
        if(!userID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        const [userRol] = await pool.query('SELECT userRol FROM users WHERE userID = ? ', [userID]);
        if (userRol.length ===0) {
            return res.status(404).json({message : 'Usuario no encontrado'})
        }
        if(data[0].userRol === 1){
            const [data] = await pool.query('SELECT * FROM users');
            res.json(data);  
        }else{
            res.status(404).json({message:'Usuario no autorizado'})
        };

    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function postCategory(req, res){
    try {
        const {userID} = req.body;
        if(!userID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        const [data] = await pool.query('SELECT userRol FROM users WHERE userID = ? ', [userID]);
        if (data.length ===0) {
            return res.status(404).json({message : 'Usuario no encontrado'})
        }
        if(data[0].userRol === 1){
            const {categoryTitle, categoryDesc} = req.body;
            if (!categoryTitle) {
                return res.status(400).json({ message: 'La categoria no tiene titulo' });
            }
            await pool.query('INSERT INTO categories (categoryTitle, categoryDesc) VALUES (?, ?)', [categoryTitle, categoryDesc]);
            res.json({'Nueva categoria' : categoryTitle});  
        }else{
             res.status(404).json({message:'Usuario no autorizado'})
        };
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function updateCategory(req, res){
    try {
        const {userID} = req.body;
        if(!userID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        const [data] = await pool.query('SELECT userRol FROM users WHERE userID = ? ', [userID]);
        if (data.length ===0) {
            return res.status(404).json({message : 'Usuario no encontrado'})
        }
        if(data[0].userRol === 1){
            const { categoryID, categoryTitle, categoryDesc} = req.body;
            if(categoryTitle){
                await pool.query('UPDATE categories SET categoryTitle = ? WHERE categoryID = ?', [categoryTitle, categoryID]);
            };
            if(categoryDesc){
                await pool.query('UPDATE categories SET categoryDesc = ? WHERE categoryID = ?', [categoryDesc, categoryID]);
            };
            res.json({'Se actualizo la categoria ' : categoryTitle});  
        }else{
            res.status(404).json({message:'Usuario no autorizado'})
        };
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function deleteCategory(req, res){
    try {
        const {userID} = req.body;
        if(!userID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        const [data] = await pool.query('SELECT userRol FROM users WHERE userID = ? ', [userID]);
        if (data.length ===0) {
            return res.status(404).json({message : 'Usuario no encontrado'})
        }
        if(data[0].userRol === 1){
            const {categoryID, categoryTitle} = req.body;
            if(!categoryID){
                return res.status(400).json({message : 'Categoria no identificada'})
            }
            await pool.query('DELETE FROM categories WHERE  categoryID = ?', [categoryID]);
            res.json({'Se elimino la categoria categoria' : categoryTitle});  
        }else{
            res.status(404).json({message:'Usuario no autorizado'})
        };
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

const adminController = {
    getUserAccs,
    postCategory,
    updateCategory,
    deleteCategory
};

export default adminController;