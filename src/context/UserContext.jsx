import { createContext, useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        async function checkIfLoggedIn() {
            const response = await getRequest(`${baseUrl}/user/refresh-token`);
            console.log("refresh token context ")
            console.log(response);
            if (response.status === 200) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
        async function getUserName() {
            const response = await getRequest(`${baseUrl}/user`);
            if (response.status === 200) {
                setUser(response.data.username);
            } else {
                setUser(null);
            }
        }
        checkIfLoggedIn();
        getUserName();
    }, [])

    useEffect(() => {
        async function getUserName() {
            const response = await getRequest(`${baseUrl}/user`);
            if (response.status === 200) {
                setUser(response.data.username);
            } else {
                setUser(null);
            }
        }
        getUserName();
    }, [isLoggedIn])

    return <UserContext.Provider value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn
    }}>
        {children}
    </UserContext.Provider>
}
