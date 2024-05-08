import { createContext, useState, useEffect } from "react";
import { getRequest } from "@/services/Requests";
import { baseUrl } from "@/constants";
export const NavbarContext = createContext();

export const NavbarContextProvider = ({ children }) => {

    const [isOpenedLoginMenu, setIsOpenedLoginMenu] = useState(false);

    return <NavbarContext.Provider value={{
        isOpenedLoginMenu,
        setIsOpenedLoginMenu
    }}>
        {children}
    </NavbarContext.Provider>
}
