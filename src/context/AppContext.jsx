import { createContext } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const AppContext = createContext()

const AppcontextProvider = (props) => {


    const value = {
        doctors
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppcontextProvider