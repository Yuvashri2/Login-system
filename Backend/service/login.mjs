import AWS from 'aws-sdk';
AWS.config.update({
    region:'eu-north-1'
})
import {buildResponse} from '../utils/util.mjs';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth.mjs';


const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'users1';

export const login = async (loginBody) => {
    const username = loginBody.username;
    const password = loginBody.password;
    if(!username||!password) {
        return buildResponse(401, {
            message: 'Username and password fields are required'
        });
    }
    
    const  dynamoUser=await getUser(username.toLowerCase().trim());
    if (!dynamoUser || !dynamoUser.username) {
        return buildResponse(403,  {message: 'user does not exist'});
    }

    if(!bcrypt.compareSync(password,dynamoUser.password)) {
        return buildResponse(403, { message: 'password is incorrect'});
    }

    const userInfo = {
        username: dynamoUser.username,
        name: dynamoUser.name
    }
    const token =generateToken(userInfo)
    const response ={
        user: userInfo,
        token: token
    }
    return buildResponse(200, response);

}

async function getUser(username){
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }
    return await dynamodb.get(params).promise().then(response =>{
        return response.Item;
    },error =>{
    console.error('There is an error getting user: ',error);

    });
}


