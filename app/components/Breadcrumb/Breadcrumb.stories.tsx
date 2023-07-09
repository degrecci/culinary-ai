import type { Meta, StoryObj } from "@storybook/react";

import Breadcrumb from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Breadcrumb> = {
  title: "Example/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const CustomBreadcrumb: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Home link="/">Home</Breadcrumb.Home>
      <Breadcrumb.Item>Page 1</Breadcrumb.Item>
    </Breadcrumb>
  ),
};
