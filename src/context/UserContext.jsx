import { createContext, useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfilePicture, setUserProfilePicture] = useState(null);
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
        checkIfLoggedIn();
    }, [])

    useEffect(() => {
        async function getUserData() {
            console.log("islogged", isLoggedIn);
            const response = await getRequest(`${baseUrl}/user`);
            console.log("response in context", response);
            if (response.status === 200) {
                setUser(response.data.username);
                setUserProfilePicture(response.data.profilePicture);
              
            } else {
                setUser(null);
            }
        }
        getUserData();
    }, [isLoggedIn])

    return <UserContext.Provider value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        userProfilePicture,
        setUserProfilePicture
    }}>
        {children}
    </UserContext.Provider>
}
