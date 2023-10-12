import { action } from '@storybook/addon-actions';
import ButtonVue from './ButtonVue.vue';

export default {
    title: 'Atoms/ButtonVue',
    component: ButtonVue,
    argTypes: {
        typeBtn: {
            control: { type: 'select', options: ['primary', 'secondary'] },
        },
    },
};

const Template = (_, { argTypes }) => ({
    components: { ButtonVue },
    props: Object.keys(argTypes),
    template:
        '<ButtonVue v-bind="$props" @click="onClick"><span>Cancel</span></ButtonVue>',
    methods: { onClick: action('clicked') },
});

export const Default = Template.bind({});
Default.args = {
    typeBtn: 'primary',
};
