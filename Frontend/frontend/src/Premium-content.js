import React from 'react';
import{ getUser,resetUserSession} from './service/AuthService';
import { useNavigate } from 'react-router-dom';

const PremiumContent = () => {
    const user = getUser();
    const name = user !=='undefined' && user ? user.name: '';
    const navigate = useNavigate();
    const logoutHandler =() =>{
        resetUserSession();
        navigate('/login');
    }
    return (
        <div>
            Hello {name}!You have been loggined in!!!! Welcome to the premium content.<br/>
            <input type="button" value="Logout" onClick={logoutHandler}/>
        </div>
    )
}

export default PremiumContent;
 
