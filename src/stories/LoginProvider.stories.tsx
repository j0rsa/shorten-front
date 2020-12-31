import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import LoginProvider, {LoginProviderProps} from "../component/LoginProvider";

export default {
    title: 'Shorten/LoginProvider',
    component: LoginProvider,
    argTypes: {},
} as Meta;


const Template: Story<LoginProviderProps> = (args: LoginProviderProps) => <LoginProvider {...args}/>;

export const Github = Template.bind({});
Github.args = {
    name: "Github",
    linkUrl: "http://localhost:6006",
};

export const Twitter = Template.bind({});
Twitter.args = {
    name: "Twitter",
    linkUrl: "http://localhost:6006",
};