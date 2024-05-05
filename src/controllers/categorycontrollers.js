import {pool} from '../configs/db.js';

export async function getCategories(req, res){
    try {
        const [data] = await pool.query('SELECT p.postTitle, p.postContent, p.postLikes, p.postDate, c.categoryTitle, c.categoryDesc FROM posts p INNER JOIN postcategory pc ON p.postID = pc.postID INNER JOIN categories c ON pc.categoryID = c.categoryID ORDER BY pc.categoryID ASC;');
        if (data.length ===0) {
            return res.status(404).json({message : 'Categorias no encontradas'})
        }
        res.json(data);     
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function getCategory(req, res){
    try {
        const categoryID = req.params.id;
        if(!categoryID){
            return res.status(400).json({message : 'Categoria no identificado'})
        }
        const [data] = await pool.query('SELECT p.postTitle, p.postContent, p.postLikes, p.postDate, c.categoryTitle, c.categoryDesc FROM posts p INNER JOIN postcategory pc ON p.postID = pc.postID INNER JOIN categories c ON pc.categoryID = c.categoryID WHERE pc.categoryID = ? ORDER BY p.postTitle ASC;', [categoryID]);
        if (data.length ===0) {
            return res.status(404).json({message : 'Categoria no encontradas'})
        }
        res.json(data);     
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

const categoryController = {
    getCategories,
    getCategory
};

export default categoryController;