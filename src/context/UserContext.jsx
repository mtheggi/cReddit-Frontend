import { createContext, useState, useEffect } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({ username: 'Malke@gnauil', email: 'ads@gmail.com', id: '12323123' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return <UserContext.Provider value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }}>
        {children}
    </UserContext.Provider>
}
