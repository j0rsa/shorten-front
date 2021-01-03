import React, {useEffect} from 'react';
import './App.css';
import UserContainer from "./component/UserContainer";
import ShortenBox, {ShortenProps} from "./component/ShortenBox";
import AboutFooter from "./component/AboutFooter";
import {LoginProviderProps} from "./component/LoginProvider";
import {AuthData, UserBoxProps} from "./component/UserBox";
import UrlPreview from "./component/UrlPreview";
import {Router, Route, Switch} from 'react-router-dom'
import {createBrowserHistory as createHistory, LocationState, History} from "history";
import axios, {AxiosResponse} from "axios";

interface AppProps {
    loginProviders: Array<LoginProviderProps>,
    url: string,
    hash?: string,
    duration: string,
    clicks: string,
    loggedInUser?: UserBoxProps,
    error?: string,
    history: History<LocationState>,
    authUrl: string,
    apiUrl: string,
    redirectUrl: string,
    loading: boolean,
    disabled: boolean
}

interface AuthResponse {
    id: string,
    name: string,

}

function App() {
    const [state, setState] = React.useState<AppProps>({
        loginProviders: [{
            name: "Github",
            linkUrl: "auth/login"
        }],
        url: "",
        duration: "1",
        clicks: "1",
        history: createHistory(),
        authUrl: "http://link.j0rsa.com/auth",
        apiUrl: "http://link.j0rsa.com/api",
        redirectUrl: "http://link.j0rsa.com",
        loggedInUser: withUserImage(getLoggedInUser()),
        loading: false,
        disabled: false
    })

    function getLoggedInUser(): AuthData | undefined {
        let authDataString = localStorage.getItem("authData")
        return authDataString ? JSON.parse(authDataString) : undefined
    }

    function withUserImage(authData?: AuthData): UserBoxProps | undefined {
        if (authData) {
            //fetch image
            return {
                auth: authData,
                userImage: ""
            }
        }
        return undefined;
    }

    function shorten(val: ShortenProps) {
        setState({...state, loading: true})
        let hash = "asd"
        setTimeout(function () {
            setState({...state, hash: hash, loading: false})
            state.history.push('/result#' + hash)
        }, 500);
    }

    function auth(code: string | null) {
        if (code != null) {
            axios.post(state.authUrl + "/token", {code: code}).then((result: AxiosResponse<AuthResponse>) => {
                alert(result.data)
            }).catch((reason) => {
                setState({...state, error: reason})
            }).finally(() => {
                state.history.push("/")
            })
        }
    }

    useEffect(() => {
        let search = window.location.search;
        const params = new URLSearchParams(search);
        auth(params.get("code"))
    })

    return (
        <div className="App">
            <header className="App-header">
                <UserContainer
                    loggedInUser={state.loggedInUser}
                    providers={state.loginProviders}
                />
                <Router history={state.history}>
                    <Switch>
                        <Route exact path="/">
                            <ShortenBox
                                url={state.url}
                                duration={state.duration}
                                clicks={state.clicks}
                                loggedIn={state.loggedInUser !== undefined}
                                error={state.error}
                                onUrlChange={(val) => setState({...state, url: val})}
                                onClicksChange={(val) => setState({...state, clicks: val})}
                                onDurationChange={(val) => setState({...state, duration: val})}
                                onError={(val) => setState({...state, error: val, disabled: val !== undefined})}
                                onShorten={shorten}
                                loading={state.loading}
                                disabled={state.disabled}
                            />
                        </Route>
                        <Route path="/result">
                            <UrlPreview
                                urlPrefix={state.redirectUrl}
                                urlHash={state.hash ? state.hash : state.history.location.hash.substr(1) || ""}
                            />
                        </Route>
                    </Switch>
                </Router>
                <AboutFooter/>
            </header>
        </div>
    );
}

export default App;
