import React from 'react'
import Accordion from './Accordion/Accordion'
import Article from './Article/Article'
import Gallery from './Gallery/Gallery'

const Main = () => { 

    return (
        <>
            <main className='main'>
                <div className='main__content'>
                    <Accordion
                        title={'Lorem ipsum dolor sit amet'}
                        content={<Gallery/>}
                    />
                    <Accordion                     
                        title={'Ut aliquip ex ea commodo consequat'}
                        content={<Article/>}
                    />                    
                </div>
            </main>
        </>
    )
}

export default Main