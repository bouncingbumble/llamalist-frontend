import { extendTheme, theme as base, theme } from '@chakra-ui/react'
export default extendTheme({
    breakpoints: {
        sm: '350px',
        md: '700px',
        lg: '940px',
        xl: '1200px',
        '2xl': '1536px',
    },
    initialColorMode: 'light',
    useSystemColorMode: false,
    sizes: {
        container: {
            xl: '1440px',
        },
    },
    colors: {
        white: '#FFFFFF',
        black: '#060311',
        purple: {
            50: '#BEB1F0',
            100: '#A997EA',
            200: '#937DE5',
            300: '#7E63E0',
            400: '#6848DB',
            500: '#522ED6',
            600: '#4726BE',
            700: '#3D20A3',
            800: '#321B88',
            900: '#28156D',
        },
        blue: {
            50: '#B1C2E7',
            100: '#98AEDF',
            200: '#7E9AD7',
            300: '#6486CF',
            400: '#4A72C7',
            500: '#3860B8',
            600: '#3154A0',
            700: '#2A488A',
            800: '#233C73',
            900: '#1C305C',
        },
        green: {
            50: '#B7DEBD',
            100: '#9FD3A7',
            200: '#87C891',
            300: '#6FBD7B',
            400: '#57B264',
            500: '#499D55',
            600: '#3F8A4A',
            700: '#367640',
            800: '#2D6235',
            900: '#244F2B',
        },
        aqua: {
            50: '#C4EAE0',
            100: '#B0E3D6',
            200: '#9DDCCC',
            300: '#89D4C2',
            400: '#75CDB7',
            500: '#61C6AD',
            600: '#46BC9F',
            700: '#3BA389',
            800: '#318872',
            900: '#276D5B',
        },
        yellow: {
            50: '#EFE9B1',
            100: '#EAE297',
            200: '#E4DA7D',
            300: '#DFD363',
            400: '#DACB4A',
            500: '#D4C430',
            600: '#BDAE27',
            700: '#A29521',
            800: '#877C1C',
            900: '#6C6316',
        },
        red: {
            50: '#FFABAB',
            100: '#FF8F8F',
            200: '#FF7373',
            300: '#FF5757',
            400: '#FF3B3B',
            500: '#FF1F1F',
            600: '#FA0000',
            700: '#D60000',
            800: '#B30000',
            900: '#8F0000',
        },
        white: {
            50: '#FDFDFD',
            100: '#FCFCFC',
            200: '#FCFCFC',
            300: '#FBFBFB',
            400: '#FBFBFB',
            500: '#FAFAFA',
            600: '#DBDBDB',
            700: '#BBBBBB',
            800: '#9C9C9C',
            900: '#7D7D7D',
        },
        gray: {
            50: '#D9DBE8',
            100: '#CCCFE0',
            200: '#BFC4D9',
            300: '#B3B8D1',
            400: '#A6ACC9',
            500: '#99A0C2',
            600: '#7E87B2',
            700: '#636DA1',
            800: '#515A87',
            900: '#41486C',
        },
        brown: {
            50: '#DECBC8',
            100: '#D3BAB6',
            200: '#C8A8A3',
            300: '#BD9791',
            400: '#B2867F',
            500: '#A7756D',
            600: '#97625A',
            700: '#81544D',
            800: '#6C4641',
            900: '#563834',
        },
        purpleFaded: {
            50: '#D1C8F1',
            100: '#C2B6EC',
            200: '#B2A4E7',
            300: '#A392E3',
            400: '#947FDE',
            500: '#846CD9',
            600: '#694DD1',
            700: '#5132C3',
            800: '#442AA2',
            900: '#362182',
        },
        blueFaded: {
            50: '#C7D2E8',
            100: '#B5C3E1',
            200: '#A2B4D9',
            300: '#90A5D2',
            400: '#7D95CA',
            500: '#6A86C2',
            600: '#5071B7',
            700: '#415FA0',
            800: '#375086',
            900: '#2C406B',
        },
        greenFaded: {
            50: '#CCDECF',
            100: '#BBD3BF',
            200: '#AAC8AF',
            300: '#99BD9E',
            400: '#88B18E',
            500: '#77A67E',
            600: '#63976B',
            700: '#55825B',
            800: '#476C4C',
            900: '#38563D',
        },
        aquaFaded: {
            50: '#DCEEEA',
            100: '#D1E8E2',
            200: '#C5E3DB',
            300: '#BADDD4',
            400: '#AED7CD',
            500: '#A2D1C5',
            600: '#84C2B3',
            700: '#64B39F',
            800: '#4D9C88',
            900: '#3D7D6D',
        },
        yellowFaded: {
            50: '#F0ECC9',
            100: '#EBE6B7',
            200: '#E6E0A5',
            300: '#E1DA93',
            400: '#DCD381',
            500: '#D8CD70',
            600: '#CFC24F',
            700: '#C0B235',
            800: '#A0952C',
            900: '#807723',
        },
        redFaded: {
            50: '#FFC6C6',
            100: '#FFC6C6',
            200: '#FFB3B3',
            300: '#FF9F9F',
            400: '#FF8C8C',
            500: '#FF7979',
            600: '#FF6666',
            700: '#FF4242',
            800: '#FF1F1F',
            900: '#FA0000',
        },
        whiteFaded: {
            50: '#FAFAFA',
            100: '#F9F9F9',
            200: '#F7F7F7',
            300: '#F5F5F5',
            400: '#F4F4F4',
            500: '#F3F3F3',
            600: '#D4D4D4',
            700: '#B6B6B6',
            800: '#979797',
            900: '#797979',
        },
        lightPurpleFaded: {
            50: '#F0F0F2',
            100: '#EBEBED',
            200: '#E5E6E9',
            300: '#E0E1E4',
            400: '#DBDCE0',
            500: '#D7D8DC',
            600: '#B9BBC2',
            700: '#9C9FA9',
            800: '#7F8290',
            900: '#656874',
        },
        brownFaded: {
            50: '#E1DEDE',
            100: '#D7D3D2',
            200: '#CEC9C7',
            300: '#C4BEBC',
            400: '#BAB3B1',
            500: '#AFA7A5',
            600: '#9C928F',
            700: '#887C79',
            800: '#716764',
            900: '#5B5250',
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
                    height: '28px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    fontWeight: '500',
                    fontSize: '14px',
                    borderRadius: '16px',
                    letterSpacing: '.3px',
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
            variants: {
                outline: {
                    border: '1.6px solid blue',
                },
                ghost: {
                    ':active': {
                        backgroundColor: 'transparent',
                    },
                    ':hover': {
                        backgroundColor: 'transparent',
                    },
                },
                profile: {
                    backgroundColor: 'greenFaded.300',
                    ':hover': {
                        backgroundColor: 'greenFaded.400',
                    },
                    borderRadius: 0,
                    minWidth: 176,
                },
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
                    color: 'gray.500',
                    _placeholder: {
                        /* Chrome, Firefox, Opera, Safari 10.1+ */ color: 'gray.500',
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
                    color: 'black',
                },
            },
        },
        Menu: {
            parts: ['menu', 'item', 'list'],
            baseStyle: {
                list: {
                    border: 'none',
                    boxShadow: 'base',
                    padding: '16px',
                    borderRadius: '16px',
                },
                item: {
                    fontWeight: 'bold',
                    fontSize: '16px',
                    rounded: 'md',
                    height: '48px',
                    color: 'colors.black',
                    textTransform: 'Capitalize',
                    _hover: {
                        color: 'white',
                        bg: '#0a58ce',
                    },
                    _active: {
                        color: 'colors.white',
                        bg: '#0a58ce',
                    },
                    _focus: {
                        color: 'colors.white',
                        bg: '#edf1f7',
                    },
                },
            },
        },
        Alert: {
            variants: {
                success: () => {
                    return {
                        container: {
                            bg: 'red.500',
                        },
                    }
                },
            },
        },
    },
})
