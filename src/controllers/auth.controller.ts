import {Request, Response, json} from 'express';
import User, {IUser} from '../models/User';

import jwt from 'jsonwebtoken';

export default {
    signUp : async (req: Request, res: Response) => {
        try{
            const user: IUser = new User(req.body); 
            user.password = await user.encryptPassword(user.password);

            const newUser = await user.save();

            const token : string = jwt.sign({_id: newUser._id}, process.env.TOKEN_SECRET || 'test');

            res.header('auth-token', token).json(newUser); 
        } catch(err){
            console.error(err);
            res.sendStatus(500);
        }
    },
    signIn: async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body; 

            const user = await User.findOne({email});
            if(!user) return res.status(400).json('email is wrong');

            const correctPassword  = await user.validatePassword(password);
            if(!correctPassword) return res.status(400).json('Invalid password');

            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'test', {
                expiresIn: 60*60*12
            });

            res.header('auth-token', token).json(user); 
        } catch(err) {
            console.error(err);
			res.sendStatus(500);
        }
        res.send('signIn');
    },
    profile: async (req: Request, res: Response) => { 
        const user = await User.findById(req.userId, {password: 0});
        if (!user) {
            return res.status(404).json('No User found');
        }
        res.json(user);
    }
}