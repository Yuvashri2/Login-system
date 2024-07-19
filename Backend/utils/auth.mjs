import { error } from 'console';
import jwt from 'jsonwebtoken';

export function generateToken(user){
    if (!user) {
        return null;
    }

   
    return jwt.sign(user,process.env.JWT_SECRET, {
        expiresIn: '30000'
    })
    }

    export function verifyToken(username, token){
        return jwt.verify(token, process.env.JWT_SECRET, (error, response) =>{
            if(error) {
                return {
                    verified: false,
                    message: 'invalid token'
                }
            }

            if(response.username !== username) {
                return{
                    verified: false,
                    message: 'invalid user'
                }
            }

            return{
                verified: true,
                message: 'verified'
            };
        });
    }

   