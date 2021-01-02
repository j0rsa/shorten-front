import React from "react";
import './AboutFooter.css'
import "font-awesome/css/font-awesome.css"

export interface AboutFooterProps {
    key?: string
}

export const AboutFooter: React.FC<AboutFooterProps> = props => (
    <footer>
        <ul key={props.key} className="links">
            <li>
                <a href="https://github.com/j0rsa/">
                    <span className="fa fa-github"/> Github
                </a>
            </li>
            <li>
                2020-{new Date().getFullYear()}©
            </li>
        </ul>
    </footer>
)

export default AboutFooter;