import { createContext, useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
export const ServerContext = createContext();

export const ServerContextProvider = ({ children }) => {

    const [serverError, setServerError] = useState(false);

    return <ServerContext.Provider value={{
        serverError,
        setServerError
    }}>
        {children}
    </ServerContext.Provider>
}
