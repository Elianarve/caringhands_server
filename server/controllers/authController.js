import { tokenSign } from '../utils/token.js';
import UsersModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 8);
        req.body.password = passwordHash;
        const newUser = await UsersModel.create(req.body);
        const token = tokenSign(newUser);
        res.status(201).json({ message: 'User registered successfully', data: newUser, token });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}


export const login = async (req, res) => {
    try {
        const { id, password } = req.body;
        const user = await UsersModel.findOne({ where: { id } });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const hashPassword = user?.get('password');
        const checkPassword = await bcrypt.compare(password, hashPassword);
        const tokenSession = tokenSign(user);
        const userName = user?.get('name') 
        if (checkPassword) {
            const noPassword = { ...user.toJSON(), password: undefined }; 
            return res.send({
                message: `Correct user, welcome user ${userName}`,
                data: noPassword,
                token: tokenSession
            });
        } else {
            return res.status(401).send({ error: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
}
