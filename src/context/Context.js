import { createContext } from 'react'

function noop() { }

export const Context = createContext({
    toggleAnimation: false,
    setToggleAnimation: noop,
    itemId: 0,
    setItemId: noop,
    showModal: false,
    setShowModal: noop
})