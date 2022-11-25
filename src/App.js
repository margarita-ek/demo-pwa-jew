import React, { useState } from 'react'
import Layer from './components/Layer/Layer'
import { Context } from './context/Context'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [itemId, setItemId] = useState(0)
  const [toggleAnimation, setToggleAnimation] = useState(false)
  
  return (
    <Context.Provider value={{ itemId, setItemId, showModal, setShowModal, toggleAnimation, setToggleAnimation}}>
      <Layer />
    </Context.Provider>
  )
}

export default App
