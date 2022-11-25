import React, { useEffect, useRef, useState } from 'react'

const Header = () => { 
    const [toggle, setToggle] = useState(true)
    const [width, setWidth] = useState()

    const hederRef = useRef() 

    const NUMBER = '+7 (495) 495-49-54'

    useEffect(() => { 
        const resizeHandler = () => {
            let headerWidth = hederRef.current.offsetWidth
            setWidth(headerWidth)
        }

        resizeHandler()
        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [width])

    useEffect(() => { 
        if (width < 767.98) {
            setToggle(false)
        } else {setToggle(true)}
    }, [width])

    return (
        <header className='header' ref={hederRef}>
            <nav className='header__container'>
                <span className='header__logo' title='logo'/>
                <span className={`header__contacts${!toggle ? ' call' : ''}`} title='call'>{toggle ? NUMBER : null}</span>
            </nav>
        </header>
    )
}

export default Header