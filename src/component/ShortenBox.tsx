import React, {useEffect} from "react";
import './ShortenBox.css'
import {Alert, Button, ButtonGroup, FormControl, InputGroup} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.css"

interface Duration {
    val: string,
    caption: string,
    loginRequired: boolean
}

interface Clicks {
    val: string,
    loginRequired: boolean
}

export interface ShortenProps {
    url: string,
    duration: string,
    clicks: string,
    loggedIn: boolean,
    error?: string,
    loading: boolean,
    onUrlChange?: (val: string) => void,
    onDurationChange?: (val: string) => void,
    onClicksChange?: (val: string) => void,
    onShorten?: (val: ShortenProps) => void,
    onError?: (val?: string) => void,
    show?: boolean,
    disabled: boolean
}

export const defaultShortenProps: ShortenProps = {
    url: "",
    duration: '1',
    clicks: '1',
    loading: false,
    loggedIn: false,
    error: undefined,
    show: true,
    disabled: false
}

const durationOptions: Array<Duration> = [
    {val: '1', caption: '1 day', loginRequired: false},
    {val: '2', caption: '2 days', loginRequired: false},
    {val: '5', caption: '5 days', loginRequired: true},
    {val: 'infinite', caption: 'infinite', loginRequired: true},
];

const clickOptions: Array<Clicks> = [
    {val: '1', loginRequired: false},
    {val: '5', loginRequired: true},
    {val: '20', loginRequired: true},
    {val: '100', loginRequired: true},
    {val: 'infinite', loginRequired: false}
];


export const ShortenBox: React.FC<ShortenProps> = props => {
    let onGoodUrl = (callback: () => void) => {
        let expression = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?/gi;
        let regex = new RegExp(expression);
        if (props.url.match(regex)) {
            callback()
        } else {
            props.onError && props.onError("Invalid url!")
        }
    }
    let submit = () => {
        onGoodUrl(() => props.onShorten && props.onShorten(props));
    }
    let onInputPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        props.onError && props.onError(undefined);
        if (e.key === "Enter") submit();
    }
    let show = props.show ? "" : "ShortenContainerHidden";
    useEffect(() => {
        document.getElementById("urlInputField")?.focus()
    })

    return (
        <div className={"ShortenContainer " + show}>
            <div className="ShortenInputLine">
                <InputGroup size="lg">
                    <FormControl
                        id="urlInputField"
                        placeholder="http://example.com"
                        value={props.url}
                        onKeyPress={onInputPress}
                        onChange={t => props.onUrlChange && props.onUrlChange(t.target.value)}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="warning"
                            className="ShortenButton"
                            onClick={submit}
                            disabled={props.disabled || props.loading}
                        >{
                            props.loading ? <i className="fa fa-circle-o-notch fa-spin"/> : "Shorten"
                        }</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div className="ShortenOptionsContainer">
                <Alert variant="danger" show={props.error !== undefined}>{props.error}</Alert>
                <div className="ShortenOptions">
                    <div>
                        <span>Days: </span>
                        <ButtonGroup>
                            {
                                durationOptions.map((e) => {
                                    return (
                                        <Button
                                            key={"duration_" + e.val}
                                            active={props.duration === e.val}
                                            onClick={_ => props.onDurationChange && props.onDurationChange(e.val)}
                                            disabled={!props.loggedIn && e.loginRequired}
                                            variant="outline-dark"
                                        >{e.val}</Button>
                                    );
                                })
                            }
                        </ButtonGroup>
                    </div>
                    <div>
                        <span>Clicks: </span>
                        <ButtonGroup>
                            {
                                clickOptions.map((e) => {
                                    return (
                                        <Button
                                            key={"clicks_" + e.val}
                                            active={props.clicks === e.val}
                                            onClick={_ => props.onClicksChange && props.onClicksChange(e.val)}
                                            disabled={!props.loggedIn && e.loginRequired}
                                            variant="outline-dark"
                                        >{e.val}</Button>
                                    );
                                })
                            }
                        </ButtonGroup>
                    </div>
                </div>
                <Alert variant="light" show={!props.loggedIn}>
                    <sup>*</sup>login required
                </Alert>
            </div>
        </div>
    );
}

ShortenBox.defaultProps = defaultShortenProps;

export default ShortenBox;