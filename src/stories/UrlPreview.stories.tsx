import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import {UrlPreview, UrlPreviewProps} from "../component/UrlPreview";

export default {
    title: 'Shorten/UrlPreview',
    component: UrlPreview,
    argTypes: {},
} as Meta;


const Template: Story<UrlPreviewProps> = (args) => <UrlPreview {...args} />;

export const Default = Template.bind({});
Default.args = {
    urlPrefix: "http://example.com/",
    urlHash: "test123"
}