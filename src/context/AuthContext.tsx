import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our authentication context state
interface AuthContextType {
    isAuthenticated: boolean;
    email: string | null;
    login: (user: { id: string, email: string }) => void;
    logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const [email, setEmail] = useState<string | null>(null);

    // A simple email/password check (in a real app, this would be an API call)
    const login = (user: { id: string, email: string },) => {
        // Dummy validation for email and password (can be replaced with API request)
        setIsAuthenticated(true);
        setEmail(email);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
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
