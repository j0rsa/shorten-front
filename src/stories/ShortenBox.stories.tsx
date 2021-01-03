import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {State, Store} from "@sambego/storybook-state";

import ShortenBox, {ShortenProps, defaultShortenProps} from "../component/ShortenBox";

export default {
    title: 'Shorten/ShortenBox',
    component: ShortenBox,
    argTypes: {},
} as Meta;

let store = new Store<ShortenProps>(defaultShortenProps);

function newStore(state: Partial<ShortenProps>) {
    store.set({
        ...defaultShortenProps,
        ...state,
        onUrlChange: val => store.set({url: val}),
        onDurationChange: val => store.set({duration: val}),
        onClicksChange: val => store.set({clicks: val}),
        onError: val => store.set({error: val}),
    });
    return store
}

const Template: Story<ShortenProps> = (args: ShortenProps) => <State store={newStore(args)}>
    { state =>
        <div>
            <ShortenBox {...state}/>
            <br/>
            <sub>State: {JSON.stringify(state)}</sub>
        </div>
    }
</State>;

export const Default = Template.bind({});
Default.args = defaultShortenProps;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    ...defaultShortenProps,
    loggedIn: true
};

export const Loading = Template.bind({});
Loading.args = {
    ...defaultShortenProps,
    loading: true
}

export const WithError = Template.bind({});
WithError.args = {
    ...defaultShortenProps,
    error: "Some error",
    disabled: true
};

export const ApiError = Template.bind({});
ApiError.args = {
    ...defaultShortenProps,
    error: "Some error",
    disabled: false
};

