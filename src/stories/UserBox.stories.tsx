import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import UserBox, {UserBoxProps} from "../component/UserBox";

export default {
    title: 'Shorten/UserBox',
    component: UserBox,
    argTypes: {},
} as Meta;


const Template: Story<UserBoxProps> = (args: UserBoxProps) => <UserBox {...args}/>;

export const Default = Template.bind({});
Default.args = {
    name: "username",
    userImage: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
    activeProvider: "Github"
};
