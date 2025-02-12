import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProviders'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext)

    if (loading) return <LoadingSpinner />
    if (user) {
        return children
    }
    return <Navigate to='/login'></Navigate>
}

export default PrivateRoute
