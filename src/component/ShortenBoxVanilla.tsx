import React from "react";
import './ShortenBoxVanilla.css'

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
    onUrlChange?: (val: string) => void,
    onDurationChange?: (val: string) => void,
    onClicksChange?: (val: string) => void,
    onShorten?: (val: ShortenProps) => void;
    onError?: (val?: string) => void;
}

export const defaultShortenProps: ShortenProps = {
    url: "",
    duration: '1',
    clicks: '1',
    loggedIn: false,
    error: undefined,
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


export const ShortenBoxVanilla: React.FC<ShortenProps> = props => {
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
        onGoodUrl(() => props.onError && props.onError(undefined))
        if (e.key === "Enter") submit();
    }
    let errorHead;
    if (props.error) {
        errorHead = (
            <thead>
                <tr>
                    <td colSpan={2}>{props.error}</td>
                </tr>
            </thead>
        )
    }
    let loginFooter;
    if (!props.loggedIn) {
        loginFooter = (
            <tfoot>
            <tr>
                <td colSpan={2}><sup>*</sup>login required</td>
            </tr>
            </tfoot>
        );
    }

    return (
        <div className="ShortenContainerVanilla">
            <div className="ShortenInputLineVanilla">
                <input className="ShortenInputVanilla" placeholder="http://example.com" type="text" defaultValue={props.url}
                       onKeyPress={onInputPress}
                       onChange={t => props.onUrlChange && props.onUrlChange(t.target.value)}/>
                <button className="ShortenButtonVanilla" onClick={submit} disabled={props.error !== undefined}>shorten</button>
            </div>
            <div className="ShortenOptionsVanilla">
                <table className="ShortenOptionsTableVanilla">
                    {errorHead}
                    <tbody>

                    <tr>
                        <th>days</th>
                        <th>clicks</th>
                    </tr>
                    <tr>
                        <td>
                            {
                                durationOptions.map((e) => {
                                    return (
                                            <label key={"duration_" + e.val}>
                                                <input type="radio" name="duration" value={e.val}
                                                       id={"duration_" + e.val}
                                                       checked={props.duration === e.val}
                                                       onChange={_ => props.onDurationChange && props.onDurationChange(e.val)}
                                                       disabled={!props.loggedIn && e.loginRequired}/>
                                                <span>{e.caption}</span></label>
                                    );
                                })
                            }
                        </td>
                        <td>
                            {
                                clickOptions.map((e) => {
                                    return (
                                        <label key={"duration_" + e.val}>
                                            <input type="radio" name="clicks" value={e.val} id={"clicks_" + e.val}
                                                   checked={e.val === props.clicks}
                                                   onChange={_ => props.onClicksChange && props.onClicksChange(e.val)}
                                                   disabled={!props.loggedIn && e.loginRequired}/>
                                            <span>{e.val}</span>
                                        </label>
                                    );
                                })
                            }
                        </td>
                    </tr>
                    </tbody>
                    {loginFooter}
                </table>
            </div>
        </div>
    );
}

ShortenBoxVanilla.defaultProps = defaultShortenProps;

export default ShortenBoxVanilla;