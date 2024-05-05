export function handleError(err, req, res, next){
    if (err.message) {
        res.status(400).json({message : err.message});
    } else {
        res.status(500).json({message : 'Error interno'});
    };
};
