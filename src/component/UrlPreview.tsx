import {Button, FormControl, InputGroup, Overlay, Tooltip} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.css"
import React, {useRef, useState} from "react";
import "./UrlPreview.css"

export interface UrlPreviewProps {
    urlPrefix: string,
    urlHash: string,
    show?:boolean,
}

export const UrlPreview: React.FC<UrlPreviewProps> = props => {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    function copy() {
        let url = document.querySelector<HTMLInputElement>("#urlInput");
        if (url) {
            url.select();
            document.execCommand("copy")
            setShow(true)
            setTimeout(() => { setShow(false)}, 3000)
        }
    }

    return (
        <div key="urlPreview" className={ "UrlPreview " + (props.show? "":"UrlPreviewHidden") } id="urlPreview">
            <InputGroup size="lg">
                <FormControl id="urlInput" value={props.urlPrefix + "/" + props.urlHash} onClick={copy} readOnly/>
                <InputGroup.Append>
                    <Button ref={target} onClick={copy} variant="warning">
                        <span className="fa fa-paste"/>
                    </Button>
                    <Overlay target={target.current} placement="top" show={show}>
                        <Tooltip id="button-tooltip">Copied!</Tooltip>
                    </Overlay>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}

UrlPreview.defaultProps = {
    show: true,
}

export default UrlPreview;