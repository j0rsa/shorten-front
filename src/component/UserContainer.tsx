import React from "react";
import './UserContainer.css'
import {LoginProviderProps} from "./LoginProvider";
import LoginBox from "./LoginBox";
import UserBox, {UserBoxProps} from "./UserBox";

export interface UserContainerProps {
    loggedInUser?: UserBoxProps,
    providers?: Array<LoginProviderProps>,
    onLogin?: (val: string) => void,
}

export const defaultUserProps: UserContainerProps = {

}

export const UserContainer: React.FC<UserContainerProps> = props => {
    let  inner;
    if (props.loggedInUser) {
        inner = (
            <UserBox {...props.loggedInUser}/>
        )
    } else {
        inner = (
           <LoginBox providers={props.providers}/>
        )
    }
    return (
        <div className="UserContainer">
            {inner}
        </div>
    )
}

UserContainer.defaultProps = defaultUserProps;

export default UserContainer;