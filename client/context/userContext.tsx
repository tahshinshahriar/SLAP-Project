import React from 'react'
import axios from 'axios'
import { createContext, useState, useEffect, ReactNode } from 'react'

export const UserContext = createContext({})

interface UserContextProviderProps {
    children: ReactNode;
}

export function UserContextProvider({children}: UserContextProviderProps) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    }, [])
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
