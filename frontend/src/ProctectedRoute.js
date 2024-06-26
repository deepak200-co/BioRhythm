import React, { useState } from 'react';
import{ useAuthState} from 'react-firebase-hooks/auth';
import {Navigate }from 'react-router-dom';
import auth from './firbaseinit';
import PageLoading from './PageLoading';

const ProtectedRoute = ({children}) => {
    const [user, isLoading] = useAuthState(auth);
    if(isLoading){
        return <PageLoading/>
    }
    if(!user){
        return <Navigate to='/Login'/>
    }
    return React.cloneElement(children, { user });
};

export default ProtectedRoute;
