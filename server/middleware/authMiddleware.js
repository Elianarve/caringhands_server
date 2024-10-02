import { verifyToken } from '../utils/token.js';

export const authToken = (req, res, next) =>{
    try {
        const authToken = req.headers.authorization?.split(' ')[1];

        const dataToken = verifyToken(authToken);
        
        const userId = dataToken.userId;
        
        req.body.user_id = userId;

    next();
    
    } catch (error) {
        return res.status(401).send({ error: 'invalid authentication' }); 
    }
}















