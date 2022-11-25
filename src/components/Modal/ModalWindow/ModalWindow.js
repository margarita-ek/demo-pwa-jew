import React, { useEffect, useState } from 'react'

export const ModalWindow = (props) => { 
    const {
        toggleAnimation,
        item,
        prevHandleClick,
        nextHandleClick
    } = props

    const [objModal, setObj] = useState({})
    const [touchPosition, setTouchPosition] = useState(null)

    useEffect(() => { 
        let [obj] = item
        setObj(obj)
    }, [item])

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        let touchDown
        if (touchPosition) { 
            touchDown = touchPosition
        }

        if(!touchDown) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            nextHandleClick()
        }

        if (diff < -5) {
            prevHandleClick()
        }

        setTouchPosition(null)
    }       

    return (
        <>
            {
                objModal ? <div className='modal__window' onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                        <div className='modal__image-container'>
                        <div className='modal__image'>
                            <img className={`${toggleAnimation ? 'opacity' : ''}`} src={`../../../images/modalGallery/${objModal.path}`} alt={item.path} />
                        </div>
                        <div className='modal__button-container btn'>
                            <button className='btn__prev' onClick={prevHandleClick}/>
                            <button className='btn__next' onClick={nextHandleClick}/>
                        </div>
                        </div>
                        <div className={`modal__description${toggleAnimation ? ' opacity' : ''}`}>
                            { objModal.title }
                        </div>
                    </div> : null
            }
        </>

    )
}
