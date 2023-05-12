import { extendTheme, theme as base } from '@chakra-ui/react'
export default extendTheme({
    breakpoints: {
        sm: '350px',
        md: '700px',
        lg: '940px',
        xl: '1200px',
        '2xl': '1536px',
    },
    initialColorMode: 'dark',
    useSystemColorMode: false,
    sizes: {
        container: {
            xl: '1440px',
        },
    },
    colors: {
        white: '#FFFFFF',
        black: '#080809',
        darkgray: {
            50: '#9296A2',
            100: '#7C8190',
            200: '#696D7B',
            300: '#565A65',
            400: '#444750',
            500: '#31333A',
            600: '#2C2E34',
            700: '#27292E',
            800: '#222428',
            900: '#1E1F23',
        },
        lightgray: {
            50: '#ABACB3',
            100: '#9A9BA3',
            200: '#898A94',
            300: '#787A85',
            400: '#696A74',
            500: '#595A62',
            600: '#515259',
            700: '#48494F',
            800: '#3F4045',
            900: '#36363B',
        },
        purple: {
            50: '#999ED9',
            100: '#848BD2',
            200: '#7077CA',
            300: '#5B64C2',
            400: '#4750BB',
            500: '#3D46A7',
            600: '#384097',
            700: '#323986',
            800: '#2B3275',
            900: '#252A65',
        },
        green: {
            50: '#7FE4A9',
            100: '#65DE98',
            200: '#4BD986',
            300: '#32D375',
            400: '#28BE67',
            500: '#23A559',
            600: '#1F9450',
            700: '#1C8347',
            800: '#18733E',
            900: '#156235',
        },
        red: {
            50: '#F69FA1',
            100: '#F48C8E',
            200: '#F3797B',
            300: '#F16668',
            400: '#EF5355',
            500: '#ED4245',
            600: '#EB2427',
            700: '#DC1418',
            800: '#C11215',
            900: '#A50F12',
        },
        yellow: {
            50: '#F7D899',
            100: '#F6D085',
            200: '#F4C870',
            300: '#F3C05C',
            400: '#F1B947',
            500: '#F0B133',
            600: '#EEA618',
            700: '#D89610',
            800: '#BD830E',
            900: '#A2700C',
        },
    },
    fonts: {
        heading: `Ubuntu, ${base.fonts.heading}`,
        body: `Ubuntu, ${base.fonts.body}`,
    },
    fontSizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '30px',
        '2xl': '36px',
    },
    radii: {
        none: '0',
        sm: '4px',
        base: '8px',
        md: '8px',
        lg: '16px',
        xl: '50%',
    },
    shadows: {
        base: '0 8px 16px 0 rgba(56, 96, 165, 0.15)',
        hard: '0px 4px 8px 0 rgba(56, 96, 165, 0.15)',
    },
    components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {
                fontWeight: 'bold', // Normally, it is "semibold"
            },
            // 2. We can add a new button size or extend existing
            sizes: {
                xs: {
                    height: '16px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    fontWeight: 'bold',
                    fontSize: '10px',
                    borderRadius: '8px',
                },
                sm: {
                    height: '24px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    borderRadius: '8px',
                },
                md: {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    height: '32px',
                    fontSize: '14px',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                },
                lg: {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    height: '40px',
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    minWidth: '128px',
                    borderRadius: '8px',
                },
                xl: {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    height: '48px',
                    fontSize: '18px',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    padding: '16px 24px',
                    minWidth: '160px',
                    borderRadius: '8px',
                },
            },
        },
        Input: {
            baseStyle: {
                field: {
                    bg: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    ':focus': {
                        borderColor: '#FFFFFF',
                        bg: '#FFFFFF',
                    },
                    color: 'darkgray.500',
                    _placeholder: {
                        /* Chrome, Firefox, Opera, Safari 10.1+ */ color: 'darkgray.500',
                        opacity: 1 /* Firefox */,
                    },
                },
            },
            sizes: {},
            variants: {},
            defaultProps: {
                variant: null,
            },
        },
        Select: {
            baseStyle: {
                field: {
                    bg: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    ':focus': {
                        borderColor: '#FFFFFF',
                        bg: '#FFFFFF',
                    },
                    color: 'darkgray.500',
                    _placeholder: {
                        /* Chrome, Firefox, Opera, Safari 10.1+ */ color: 'darkgray.500',
                        opacity: 1 /* Firefox */,
                    },
                },
            },
            sizes: {},
            variants: {},
            defaultProps: {
                variant: null,
            },
        },
        Form: {
            baseStyle: {
                helperText: {
                    color: 'darkgray.500',
                },
            },
        },
    },
})
