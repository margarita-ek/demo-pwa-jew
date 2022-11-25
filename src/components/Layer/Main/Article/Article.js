import React from 'react'

const Article = () => { 
    return (
        <section className='article'>
            <article className='article__container'>
                    <aside className='article__image-left'>
                        <img src='../images/article/hand-img.png' alt='hand-img' title='hand image'/>
                    </aside>
                    <aside className='article__content-right'>
                        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                        <div className='article__description-right'>
                            <p>
                                Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <p>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </p>                        
                        </div>
                    </aside>
                    <aside className='article__content-left'>
                        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
                        <div className='article__description-left'>
                            <p>
                                Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <p>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                            </p>                        
                        </div>
                    </aside>
                    <aside className='article__image-right'>
                        <img src='../images/article/girl-hat.png' alt='girl-hat' title='girl in hat'/>
                    </aside>  
            </article>
        </section>
    )
}

export default Article