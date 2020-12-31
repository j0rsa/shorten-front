import React from "react";
import './LoginProvider.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-social/bootstrap-social.css"
import "font-awesome/css/font-awesome.css"
import Button from "react-bootstrap/Button";


export interface LoginProviderProps {
    name: string,
    linkUrl: string,
}

export const LoginProvider: React.FC<LoginProviderProps> = props => {
    return (
        <Button href={props.linkUrl} className="btn-social" variant={props.name.toLocaleLowerCase()} size="sm">
            <span className={"fa fa-"+props.name.toLocaleLowerCase()}/>
            Sign in with {props.name}
        </Button>
    )
}


export default LoginProvider;
