import AWS from 'aws-sdk';
import { buildResponse } from '../utils/util.mjs';
import bcrypt from 'bcryptjs';

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'users1';

export const register = async (registerBody) => {
    const username = registerBody.username;
    const name = registerBody.name;
    const email = registerBody.email;
    const password = registerBody.password;

    if (!username || !name || !email || !password) {
        return buildResponse(401, {
            message: 'All fields are required'
        });
    }

    const dynamoUser = await getUser(username.toLowerCase().trim());
    if (dynamoUser && dynamoUser.username) {
        return buildResponse(403, { message: 'User already exists,please try a different name' });
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    const userInfo = {
        username: username.toLowerCase().trim(),
        name: name,
        email: email,
        password: encryptedPassword
    };

    const saveUserResponse = await saveUser(userInfo);
    if (!saveUserResponse) {
        return buildResponse(503, { message: 'Server Error. Please try again later.' });
    }

    return buildResponse(200, { message: 'User registered successfully' });
};

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    };
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('There is an error getting user: ', error);
    });
}

async function saveUser(user) {
    const params = {
        TableName: userTable,
        Item: user
    };
    return await dynamodb.put(params).promise().then(response => {
        return true;
    }, error => {
        console.error('There is an error saving user: ', error);
        return false;
    });
}
