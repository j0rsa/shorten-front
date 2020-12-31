import React from "react";
import {Image, Nav, NavDropdown} from "react-bootstrap";
import './UserBox.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-social/bootstrap-social.css"
import "font-awesome/css/font-awesome.css"

export interface UserBoxProps {
    id: string,
    name: string,
    userImage: string,
    activeProvider: string,
    onLogout?: () => void,
}

export const UserBox: React.FC<UserBoxProps> = props => (
    <Nav className="LoginButtons">
        <NavDropdown id="1" title={
            <span>
                <Image className="logo" src={props.userImage} roundedCircle thumbnail/>
                <span className={"provider-logo rounded-circle fa fa-"+props.activeProvider.toLocaleLowerCase()+" btn-"+props.activeProvider.toLocaleLowerCase()}/>
            </span>

        }>
            <NavDropdown.Header>Logged in as: {props.name}</NavDropdown.Header>
            <NavDropdown.Header>via: {props.activeProvider}</NavDropdown.Header>
            <NavDropdown.Divider/>
            <NavDropdown.Item onClick={ _ => props.onLogout && props.onLogout()}>Logout</NavDropdown.Item>
        </NavDropdown>
    </Nav>
)

export default UserBox;