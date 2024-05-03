//Exportar las funciones que controlan las rutas
import {pool} from './configs/db.js';

//------------------------------------------------------
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

export async function userGetAccs(req, res){
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

export async function userGetPost(req, res){
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

export async function userGetPosts(req, res){
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

export async function userGetCategories(req, res){
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

export async function userGetCategory(req, res){
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

export async function userGetTitle(req, res){
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
//-------------------------------------------------------

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

export async function userPost(req, res){
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

export async function userComment(req, res){
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

export async function userPostCategory(req, res){
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
//--------------------------------------------------------
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

export async function userUpdatePost(req, res){
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

export async function userUpdateComment(req, res){
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

export async function userUpdateCategory(req, res){
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
//--------------------------------------------------------
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

export async function userDeletePost(req, res){
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

export async function userDeleteComment(req, res){
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

export async function userDeleteCategory(req, res){
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
//--------------------------------------------------------

export function handleError(err, req, res, next){
    if (err.message) {
        res.status(400).json({message : err.message});
    } else {
        res.status(500).json({message : 'Error interno'});
    };
};