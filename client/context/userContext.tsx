import axios from 'axios'
import { createContext, useState, useEffect, ReactNode } from 'react'

interface UserContextType {
    user: any;  
    setUser: (user: any) => void;
  }
export const UserContext = createContext<UserContextType | undefined>(undefined);

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
