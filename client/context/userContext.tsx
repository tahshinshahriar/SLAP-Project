import axios from 'axios'
import { createContext, useState, useEffect, ReactNode } from 'react'

interface User {
    userId: string;
    slapID: string;
    name: string;
    email: string;
    role: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
    children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(({ data }) => {
                setUser(data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
