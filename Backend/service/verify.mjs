import  {buildResponse} from '../utils/util.mjs';
import { generateToken, verifyToken } from '../utils/auth.mjs';


export const verify = async (verifyBody) => {
    if(!verifyBody.user || !verifyBody.user.username || !verifyBody.token){
        return buildResponse(401,{
            verified: false,
            message: 'incorrect request body'
        })
    }

    const user = verifyBody.user;
    const token = verifyBody.token;
    const verification = verifyToken(user.username, token);
    if(!verification.verified) {
        return buildResponse(401,verification);
    }

    return buildResponse(200, {
        verified: true,
        message: 'success' ,
        user: user,
        token: token
    });
}

