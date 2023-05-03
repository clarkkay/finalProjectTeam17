import { createContext } from "react";

export const UserContext = createContect({});

export function UserContextProvider({Children}) {
    return (
        <div>
    <Children />
    </div>
    )
}