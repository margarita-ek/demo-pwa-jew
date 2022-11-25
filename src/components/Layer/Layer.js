import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import { Modal } from '../Modal/Modal'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'

const Layer = () => { 
    const { itemId, showModal, setShowModal } = useContext(Context)

    return (
        <div className='wrapper'>
            {
                !showModal ? <>
                    <Header />
                    <Main />
                    <Footer />
                </> : <Modal
                        setShowModal={setShowModal}
                        itemId={itemId} />
            }
        </div>
    )
}

export default Layer