import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext)
    const error = useRouteError();
    const navigate = useNavigate()

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate("/")
            })
            .catch((err) => console.log(err))
    }
    return (
        <div>
            <p>Something went wrong!!!</p>
            <p>{error.statusText || error.message}</p>
            <h4>Please <button className='bg-red-500' onClick={handleSignOut} >Sign out</button> and log back again.</h4>
        </div>
    );
};

export default DisplayError;