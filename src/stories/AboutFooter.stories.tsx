import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import AboutFooter, {AboutFooterProps} from "../component/AboutFooter";

export default {
    title: 'Shorten/AboutFooter',
    component: AboutFooter,
    argTypes: {},
} as Meta;


const Template: Story<AboutFooterProps> = (args) => <AboutFooter {...args} />;

export const Default = Template.bind({});
