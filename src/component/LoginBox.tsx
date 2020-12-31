import React from "react";
import LoginProvider, {LoginProviderProps} from "./LoginProvider";

export interface LoginBoxProps {
    providers?: Array<LoginProviderProps>
}

export const LoginBox: React.FC<LoginBoxProps> = props => {
    return (
        <div key={"loginBox"}>
            {
                props.providers && props.providers.map( p => <span key={p.name}><LoginProvider {...p} />{' '}</span>)
            }
        </div>
    )
}

export default LoginBox;