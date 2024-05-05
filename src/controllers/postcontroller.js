import {pool} from '../configs/db.js';

export async function userGetPosts(req, res){
    try {
        const userID = req.params.id;
        if(!userID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        const [data] = await pool.query('SELECT p.postTitle, p.postContent, p.postLikes, p.postDate, c.commentContent, c.commentLikes, c.commentDate FROM posts p INNER JOIN comments c ON p.postID = c.postID WHERE p.userID = ? ORDER BY p.postTitle ASC;', [userID]);
        if (data.length ===0) {
            return res.status(404).json({message : 'Post no encontrado'})
        }
        res.json(data);  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function getAllPosts(req, res){
    try {
        const [data] = await pool.query('SELECT p.postTitle, p.postContent, p.postLikes, p.postDate, c.commentContent, c.commentLikes, c.commentDate FROM posts p INNER JOIN comments c ON p.postID = c.postID ORDER BY p.postTitle ASC;');
        if (data.length ===0) {
            return res.status(404).json({message : 'No se encuentran publicaciones'})
        }
        res.json(data);  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function getPostTitle(req, res){
    try {
        const postTitle = req.params.title;
        if(!postTitle){
            return res.status(400).json({message : 'Titulo no identificado'})
        }
        const [data] = await pool.query('SELECT p.postTitle, p.postContent, p.postLikes, p.postDate, c.commentContent, c.commentLikes, c.commentDate FROM posts p INNER JOIN comments c ON p.postID = c.postID  WHERE p.postTitle = ? ', [postTitle]);
        if (data.length ===0) {
            return res.status(404).json({message : 'Titulo no encontrado'})
        }
        res.json(data);   
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function newPost(req, res){
    try {
        const { userID, postTitle, postContent} = req.body;
        if (!userID) {
            return res.status(400).json({ message: 'Usuario no identificado' });
        }
        if (!postTitle) {
            return res.status(400).json({ message: 'La publicacion no tiene titulo' });
        }
        if (!postContent) {
            return res.status(400).json({ message: 'La publicacion esta vacia' });
        }
        let postDate = Date.now();
        await pool.query('INSERT INTO posts (userID, postTitle, postContent, postLikes, postDate) VALUES (?, ?, ?, ?, ?)', [userID, postTitle, postContent, 0, postDate]);
        res.json({'Nueva publicacion' : postTitle});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function updatePost(req, res){
    try {
        const { postID, postTitle, postContent} = req.body;
        if(!postID){
            return res.status(400).json({message : 'Publicacion no identificada'})
        }
        if(postTitle){
            await pool.query('UPDATE posts SET postTitle = ? WHERE postID = ?', [postTitle, postID]);
        }
        if(postContent){
            await pool.query('UPDATE posts SET postContent = ? WHERE postID = ?', [postContent, postID]);
        }
        res.json({'Se actualizo el post ' : postTitle});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function deletePost(req, res){
    try {
        const { postID, postTitle} = req.body;
        if(!postID){
            return res.status(400).json({message : 'Publicacion no identificada'})
        }
        await pool.query('DELETE FROM posts WHERE  postID = ?', [ postID]);
        res.json({'Se elimino el post' : postTitle});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

const postController = {
    userGetPosts,
    getAllPosts,
    getPostTitle,
    newPost,
    updatePost,
    deletePost
};

export default postController;