import React from "react";
import {Image, Nav, NavDropdown} from "react-bootstrap";
import './UserBox.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-social/bootstrap-social.css"
import "font-awesome/css/font-awesome.css"

export interface AuthData {
    id: string,
    name: string,
    activeProvider: string,
    token?: string,
}

export interface UserBoxProps {
    auth: AuthData,
    userImage: string,
    onLogout?: () => void,
}

export const UserBox: React.FC<UserBoxProps> = props => (
    <Nav className="LoginButtons">
        <NavDropdown id="1" title={
            <span>
                <Image className="logo" src={props.userImage} roundedCircle thumbnail/>
                <span className={"provider-logo rounded-circle fa fa-"+props.auth.activeProvider.toLocaleLowerCase()+" btn-"+props.auth.activeProvider.toLocaleLowerCase()}/>
            </span>

        }>
            <NavDropdown.Header>Logged in as: {props.auth.name}</NavDropdown.Header>
            <NavDropdown.Header>via: {props.auth.activeProvider}</NavDropdown.Header>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={ _ => props.onLogout && props.onLogout()}>Logout</NavDropdown.Item>
        </NavDropdown>
    </Nav>
)

export default UserBox;