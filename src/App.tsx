import React, {useEffect} from 'react';
import './App.css';
import UserContainer from "./component/UserContainer";
import ShortenBox, {ShortenProps} from "./component/ShortenBox";
import AboutFooter from "./component/AboutFooter";
import {LoginProviderProps} from "./component/LoginProvider";
import {AuthData} from "./component/UserBox";
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
    authData?: AuthData,
    error?: string,
    history: History<LocationState>,
    authUrl: string,
    apiUrl: string,
    redirectUrl: string,
    loading: boolean,
    disabled: boolean
}

interface AuthResponse {
    id: number,
    login: string,
    name: string,
    email: string | undefined,
    avatar_url: string,
    token: string,
    oauth_provider: string,
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
        authUrl: "https://link.j0rsa.com/auth",
        apiUrl: "https://link.j0rsa.com/api",
        redirectUrl: "https://link.j0rsa.com",
        authData: getAuthData(),
        loading: false,
        disabled: false
    })

    function getAuthData(): AuthData | undefined {
        let authDataString = localStorage.getItem("authData")
        return authDataString ? JSON.parse(authDataString) : undefined
    }

    function shorten(val: ShortenProps) {
        setState({...state, loading: true})
        let hash = val.url.substr(0,0) + "asd"
        setTimeout(function () {
            setState({...state, hash: hash, loading: false})
            state.history.push('/result#' + hash)
        }, 500);
    }

    function auth(code: string | null) {
        if (code != null) {
            state.history.push("/")
            axios.post(state.authUrl + "/token", {code: code}).then((result: AxiosResponse<AuthResponse>) => {
                let data = result.data;
                let authData = {
                    id: data.id.toString(),
                    name: data.name,
                    userImage: data.avatar_url,
                    activeProvider: data.oauth_provider,
                    token: result.data.token
                };
                localStorage.setItem("authData", JSON.stringify(authData));
                setState({
                    ...state,
                    authData: authData,
                })
            }).catch((reason: Error) => {
                setState({...state, error: reason.message})
            })
        }
    }

    function onLogout() {
        localStorage.removeItem("authData")
        setState({...state, authData: undefined})
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
                    loggedInUser={state.authData ? {
                        auth: state.authData,
                        onLogout: onLogout
                    } : undefined}
                    providers={state.loginProviders}
                />
                <Router history={state.history}>
                    <Switch>
                        <Route exact path="/">
                            <ShortenBox
                                url={state.url}
                                duration={state.duration}
                                clicks={state.clicks}
                                loggedIn={state.authData !== undefined}
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
