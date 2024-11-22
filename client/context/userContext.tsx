import axios from 'axios';
import { createContext, useState, useEffect, ReactNode } from 'react';

interface CurrentUserContextType {
    _id: string; // Use this if you prefer to keep MongoDB naming
    email: string;
    name: string;
    role: 'student' | 'instructor' | 'admin';
    courses?: string[];
    createdAt?: string;
}


interface UserContextType {
  user: CurrentUserContextType | null;
  setUser: React.Dispatch<React.SetStateAction<CurrentUserContextType | null>>;
  logout: () => Promise<void>; // Asynchronous function for logout
}
export const UserContext = createContext<UserContextType | null>(null);
interface Props {
    children?: ReactNode;
  }
  export function UserContextProvider({ children }: Props) {
    const [user, setUser] = useState<CurrentUserContextType | null>(null);
  
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('/profile');
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile(); // Fetch user on mount
    }, []); // No dependency here to prevent stale data

    const logout = async () => {
        try {
            await axios.post('/logout'); // Backend clears cookies
            setUser(null); // Clear user state on logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
      <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
      </UserContext.Provider>
    );
  }
    