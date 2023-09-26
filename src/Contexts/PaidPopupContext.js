import { createContext } from 'react'

export const PaidPopUpContext = createContext({
    show: false,
    reason: null,
    hideButtons: false,
})
