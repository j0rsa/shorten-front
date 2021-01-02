import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import UserContainer, {UserContainerProps} from "../component/UserContainer";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Shorten/UserContainer',
    component: UserContainer,
    argTypes: {},
} as Meta;


const Template: Story<UserContainerProps> = (args: UserContainerProps) => <UserContainer {...args}/>;

export const NotLoggedIn = Template.bind({});
NotLoggedIn.args = {
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

export const LoggedIn = Template.bind({})
LoggedIn.args = {
    loggedInUser: {
        auth: {
            id: "1",
            name: "username",
            activeProvider: "Github",
        },
        userImage: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
        onLogout: action("User logged out")
    },
    providers: [
        {
            name: "Github",
            linkUrl: "http://localhost:6006"
        }
    ]
}
