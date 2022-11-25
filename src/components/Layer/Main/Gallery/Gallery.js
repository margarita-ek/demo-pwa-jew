import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../../../context/Context'
import data from '../../../../data.json'

const PAGES = [
    ...data.resources,
    ...data.resources,
    ...data.resources,
]

const Gallery = () => {
    const [maxCurrent, setMaxCurrent] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(1)  
    const [scroll, setScroll] = useState(true)
    const [touchPosition, setTouchPosition] = useState(null)
    const [width, setWidth] = useState(0)

    const { setItemId, setShowModal, setToggleAnimation } = useContext(Context)

    const galleryRef= useRef(null)
    const carousel = useRef(null) 
    const maxScrollWidth = useRef(0)
    const itemRef = useRef(null)


    const currentIndexChange = (current) => { 
        const maxCurrentScroll = Math.trunc(maxScrollWidth.current / itemRef.current.offsetWidth)
        setMaxCurrent(maxCurrentScroll)
        if (current === 0) { 
                setCurrentIndex(maxCurrentScroll - 1)
                setScroll(false)
            return 
        }
        if (current === maxCurrentScroll) { 
                setCurrentIndex(0)
                setScroll(false)
            return 
        }
    }

    useEffect(() => { 
        const resizeHandler = () => {
            let galleryWidth = galleryRef.current.offsetWidth
            setWidth(galleryWidth)
        }

        resizeHandler()
        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [width])

    useEffect(() => { 
        if ((currentIndex > 0) && (currentIndex !== maxCurrent)) { 
            setScroll(true)
        }
    }, [currentIndex, maxCurrent])

    
    useEffect(() => {
        if (carousel !== null && carousel.current !== null && itemRef !== null) {
            carousel.current.scrollLeft = (itemRef.current.offsetWidth) * (currentIndex)
        }
    }, [currentIndex])

    useEffect(() => {
        maxScrollWidth.current = carousel.current ? carousel.current.scrollWidth - carousel.current.offsetWidth : 0
    }, [])

    //Управление========================

    const movePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1)
        }
        if (currentIndex === 0) { 
            currentIndexChange(currentIndex)
        }
    }
    
    const moveNext = () => {
        if (
            carousel.current !== null &&
            itemRef.current.offsetWidth * currentIndex <= maxScrollWidth.current
        ) {
            currentIndexChange(currentIndex)
            setCurrentIndex((prevState) => prevState + 1)
            
        }
    }

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
            moveNext()
        }

        if (diff < -5) {
            movePrev()
        }

        setTouchPosition(null)
    }      
    
    const getIdItem = (id) => { 
        setShowModal(true)
        setItemId(id)
        setToggleAnimation(true)
        return
    }

    return (
        <>
            <section className='gallery' ref={galleryRef}>
                <article className='gallery__container' >
                    <div className='gallery__window'>
                        <div className={`gallery__content${scroll ? ' scroll' : ' scrollNone'}`}
                            ref={carousel}
                            >
                            {PAGES.map((item, index) => { 
                                return <div className='item-container'
                                        key={index}
                                        onTouchStart={handleTouchStart}
                                        onTouchMove={handleTouchMove}
                                        onClick={() => getIdItem(item.id)}
                                        ref={itemRef}
                                        >
                                            <div
                                                className='item'
                                                id={item.id}
                                                >
                                                <img src={`../../images/gallery/${item.path}`}
                                                    alt={item.path}
                                                />
                                            </div>
                                        </div>
                            })}
                        </div>                        
                    </div>        
                </article>
                <div className={`gallery__button-container${width < 767.98 ? ' none' : ''}`}>
                    <button className='prev' onClick={movePrev} />
                    <button className='next' onClick={moveNext} />
                </div>
            </section>
        </>
    )
}

export default Gallery