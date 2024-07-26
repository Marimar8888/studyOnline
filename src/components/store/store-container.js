import React, { Component } from 'react'

import CarouselImages from './carousel-img/carousel-images'

export default class StoreContainer extends Component {
  render() {
    return (
      <div className='store-container'>
        <div className='store-carrousell-image-wrapper'>
            <div className='store-carrousell-image'>
            <CarouselImages/>
            </div>
        </div>

        <div className='store-section-course-wrapper'>
            <div className='store-section-course-text'>
                 <h2>Amplia selección de cursos</h2>   
                 <div className='store-section-course-selector'>
                    <p>Programación</p>
                    <p>Dibujo</p>
                    <p>Marketing</p>
                    <p>Fotografía</p>
                    <p>Liderazgo</p>
                    <p>Crecimiento Personal</p>
                    <p>Música</p>
                    <p>Finanzas</p>
                 </div>
            </div>
            <div className='store-section-course-carrousel'>

            </div>
        </div>

        <div className='store-section-categories-wrapper'>
            <div className='store-section-categories-text'>
                 <h2>Categorías</h2>   
            </div>
            <div className='store-section-categories-links-wrapper'>
                <div className='store-section-categories-links-image'>
                    <div className='store-section-categories-links-image-button'>
                        <img src='../../../static/assets/images/categories/program.png'></img>
                    </div>
                    <div className='store-section-categories-links-image-text'>
                        <p>Programación</p>
                    </div>
                </div>
                <div className='store-section-categories-links-image'>
                    <div className='store-section-categories-links-image-button'>
                        <img src='../../../static/assets/images/categories/music.png'></img>
                    </div>
                    <div className='store-section-categories-links-image-text'>
                        <p>Dibujo</p>
                    </div>
                </div>
                <div className='store-section-categories-links-image'>
                    <div className='store-section-categories-links-image-button'>
                        <img src='../../../static/assets/images/categories/music.png'></img>
                    </div>
                    <div className='store-section-categories-links-image-text'>
                        <p>Marketing</p>
                    </div>
                </div>
                <div className='store-section-categories-links-image'>
                    <div className='store-section-categories-links-image-button'>
                        <img src='../../../static/assets/images/categories/music.png'></img>
                    </div>
                    <div className='store-section-categories-links-image-text'>
                        <p>Fotografía</p>
                    </div>
                </div>
                <div className='store-section-categories-links-image'>
                    <div className='store-section-categories-links-image-button'>
                        <img src='../../../static/assets/images/categories/music.png'></img>
                    </div>
                    <div className='store-section-categories-links-image-text'>
                        <p>Liderazgo</p>
                    </div>
                </div>
                <div className='store-section-categories-links-image'>
                    <div className='store-section-categories-links-image-button'>
                        <img src='../../../static/assets/images/categories/personalcrow.png'></img>
                    </div>
                    <div className='store-section-categories-links-image-text'>
                        <p>Crecimiento Personal</p>
                    </div>
                </div>
                <div className='store-section-categories-links-image'>
                    <div className='store-section-categories-links-image-button'>
                        <img src='../../../static/assets/images/categories/music.png'></img>
                    </div>
                    <div className='store-section-categories-links-image-text'>
                        <p>Música</p>
                    </div>
                </div>
                <div className='store-section-categories-links-image'>
                    <div className='store-section-categories-links-image-button'>
                        <img src='../../../static/assets/images/categories/music.png'></img>
                    </div>
                    <div className='store-section-categories-links-image-text'>
                        <p>Finanzas</p>
                    </div>
                </div>
            </div>
        </div>      
      </div>
    )
  }
}
