import {pool} from '../configs/db.js';

export async function postComment(req, res){
    try {
        const { userID, postID, commentContent} = req.body;
        if (!userID) {
            return res.status(400).json({ message: 'Usuario no identificado' });
        }
        if (!postID) {
            return res.status(400).json({ message: 'No identifico la publicacion a comentar' });
        }
        if (!commentContent) {
            return res.status(400).json({ message: 'El comentario esta vacio' });
        }
        let commentDate = Date.now();
        await pool.query('INSERT INTO comments (userID, postID, commentContent, commentLikes, commentDate) VALUES (?, ?, ?, ?, ?)', [userID, postID, commentContent, 0, commentDate]);
        res.json({'Nuevo Comentario' : commentContent});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function updateComment(req, res){
    try {
        const { commentID, commentContent} = req.body;
        if(!commentID){
            return res.status(400).json({message : 'Comentario no identificado'})
        }
        if(commentContent){
            await pool.query('UPDATE posts SET postTitle = ? WHERE postID = ?', [commentContent, commentID]);
        }
        res.json({'Se actualizo el comentario ' : commentContent});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

export async function deleteComment(req, res){
    try {
        const {commentID} = req.body;
        if(!commentID){
            return res.status(400).json({message : 'Usuario no identificado'})
        }
        await pool.query('DELETE FROM comments WHERE  commentID = ?', [ commentID]);
        res.json({message : 'Al lobby'});  
    } catch (error) {
        console.error({error});
        res.status(500).json({message : 'Error de servidor'})
    }
};

const commentController = {
    postComment,
    updateComment,
    deleteComment
};

export default commentController;