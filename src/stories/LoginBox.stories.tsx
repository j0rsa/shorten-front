import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import LoginBox, {LoginBoxProps} from "../component/LoginBox";

export default {
    title: 'Shorten/LoginBox',
    component: LoginBox,
    argTypes: {},
} as Meta;


const Template: Story<LoginBoxProps> = (args: LoginBoxProps) => <LoginBox {...args}/>;

export const Default = Template.bind({});
Default.args = {
    providers: [
        {
            name: "Github",
            linkUrl: "http://localhost:6006"
        },
        {
            name: "Twitter",
            linkUrl: "http://localhost:6006"
        }
    ]
};
