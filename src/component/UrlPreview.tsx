import {Button, FormControl, InputGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.css"
import React from "react";
import "./UrlPreview.css"

export interface UrlPreviewProps {
    urlPrefix: string,
    urlHash: string,
    show?:boolean,
}

function copy() {
    let url = document.querySelector<HTMLInputElement>("#urlInput");
    if (url) {
        url.select();
        document.execCommand("copy")
    }
}

export const UrlPreview: React.FC<UrlPreviewProps> = props => (
    <div key="urlPreview" className={ "UrlPreview " + (props.show? "":"UrlPreviewHidden") } id="urlPreview">
        <InputGroup size="lg">
            <FormControl id="urlInput" value={props.urlPrefix + props.urlHash} readOnly/>
            <InputGroup.Append>
                <Button onClick={copy} variant="warning">
                    <span className="fa fa-paste"/>
                </Button>
            </InputGroup.Append>
        </InputGroup>
    </div>
)

UrlPreview.defaultProps = {
    show: true
}

export default UrlPreview;