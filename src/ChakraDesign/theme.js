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
        purple: {
            50: '#BB9EF0',
            100: '#AD8BED',
            200: '#9F77EA',
            300: '#9264E7',
            400: '#8450E4',
            500: '#846CD9',
            600: '#522ED6',
            700: '#4927C3',
            800: '#4E1BAD',
            900: '#431794',
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
        blue: {
            50: '#74E5FB',
            100: '#58E0FB',
            200: '#3CDAFA',
            300: '#20D5F9',
            400: '#06CFF7',
            500: '#06B7DB',
            600: '#05A5C5',
            700: '#0493AF',
            800: '#048099',
            900: '#036E83',
        },
        red: {
            50: '#F76B7E',
            100: '#F64E64',
            200: '#F4304A',
            300: '#F31330',
            400: '#DB0C27',
            500: '#BD0A22',
            600: '#AA091E',
            700: '#97081B',
            800: '#840718',
            900: '#710614',
        },
    },
    fonts: {
        heading: `Rubik, sans-serif, ${base.fonts.heading}`,
        body: `Rubik, sans-serif, ${base.fonts.body}`,
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
