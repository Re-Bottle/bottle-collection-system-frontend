import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/user';

// Define the shape of our authentication context state
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: { id: string, email: string, name: string }) => void;
    logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

    const [user, setUser] = useState<User | null>({
        name: 'string',
        email: 'string',
        id: 'string'
    });

    // A simple email/password check (in a real app, this would be an API call)
    const login = (userData: { id: string, email: string, name: string },) => {
        // Dummy validation for email and password (can be replaced with API request)
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
