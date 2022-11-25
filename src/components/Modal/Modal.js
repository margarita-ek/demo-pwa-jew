import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import data from '../../data.json'
import { ModalWindow } from './ModalWindow/ModalWindow'

const ITEMS = data.resources

export const Modal = (props) => {
  const { setShowModal, itemId } = props

  const [value, setValue] = useState(Number(itemId))
  const [itemForModalWindow, setItemForModalWindow] = useState([])

  const { setToggleAnimation, toggleAnimation } = useContext(Context)

  const buttonClick = () => { 
    setShowModal(false)
  }
  
  const filterObj = (val) => { 
    return ITEMS.filter(item => { 
      return item.id === String(val)
    })
  }

  useEffect(() => { 
    setItemForModalWindow(filterObj(value))
  }, [value])

  const prevHandleClick = () => {
    (value <= 1) ? setValue(5) : setValue((prev) => { return prev - 1 })
    setToggleAnimation(true)
  }

  const nextHandleClick = () => { 
    (value >= 5) ? setValue(1) : setValue((prev) => { return prev + 1 })
    setToggleAnimation(true)
  } 

  useEffect(() => { 
    if (toggleAnimation) { 
      setTimeout(() => { 
        setToggleAnimation(false)
      }, 200)
    }
  }, [toggleAnimation, setToggleAnimation])

  return(
    <div className='modal'>
      <ModalWindow
        toggleAnimation={toggleAnimation}
        item={itemForModalWindow}
        prevHandleClick={prevHandleClick}
        nextHandleClick={nextHandleClick} />          
      <button className='modal__button' title='close' onClick={buttonClick}/>
    </div>      
  )
}