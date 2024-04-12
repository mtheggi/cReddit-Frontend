import { createContext, useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkIfLoggedIn() {
            setIsLoading(true);
            const response = await getRequest(`${baseUrl}/user/refresh-token`);
            if (response.status === 200) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        checkIfLoggedIn();
    }, [])

    useEffect(() => {
        async function getUserData() {
            const response = await getRequest(`${baseUrl}/user`);
            if (response && response.status === 200) {
                setUser(response.data.username);
                setUserProfilePicture(response.data.profilePicture);

            } else {
                setUser(null);
            }
            setIsLoading(false);
        }
        getUserData();
    }, [isLoggedIn])

    return <UserContext.Provider value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        userProfilePicture,
        setUserProfilePicture,
        isLoading,
        setIsLoading
    }}>
        {children}
    </UserContext.Provider>
}
