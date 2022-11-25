import React, { useEffect, useRef, useState } from 'react'

const Accordion = (props) => {
    const {
        title,
        content,
    } = props
    const [isActive, setIsActive] = useState(false)

    const contentRef = useRef()

    const handleClick = () => { 
        setIsActive(!isActive)
    }

    const scrollTo = () => { 
        contentRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    useEffect(() => { 
        if(isActive) scrollTo()
    }, [isActive])

    return (
        <div className='accordion'>
            <div className='accordion__title-container'>
                <div className={`accordion__title${isActive ? ' arrowDown' : ''}`} onClick={handleClick}>
                    <span>{title}</span>
                </div>                
            </div>
            {isActive && <div className='accordion__content' ref={contentRef}>{content}</div>}
        </div>
    )
}

export default Accordion