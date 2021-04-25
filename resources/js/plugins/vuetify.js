import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);
export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary: '#5e72e4',
                secondary: '#f4f5f7',
                accent: '#11cdef',
                tertiary: '#fcb326',
                quaternary: '#c9342f',
                error: '#f5365c',
                warning: '#fb6340',
                info: '#2196f3',
                // success: '#2dce89',
                success: '#28ad74',
                black: '#000',
                border: '#cecece',
                border1: '#e0e0e0',
                hovered: "#f5f5f5",
                disabled: "#ababab",
                selected: "#ffeac1",
                orange: "#f39000",

                //Engineering Dashboard
                weekly: "#533c11",
                bimonthly: "#013e42",
            },
            dark: {
                primary: '#5e72e4',
                secondary: '#f4f5f7',
                accent: '#11cdef',
                error: '#f5365c',
                warning: '#fb6340',
                info: '#2196f3',
                // success: '#2dce89',
                success: '#28ad74',
                black: '#fff',
                border: '#5b5b5b',
                border1: '#5d5d5d',
                hovered: "#333",
                disabled: "#ababab",
                selected: "#6c511d",
                orange: "#f39000",

                //Engineering Dashboard
                weekly: "#533c11",
                bimonthly: "#013e42",
            }
        }
    }
});
