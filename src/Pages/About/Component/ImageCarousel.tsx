import React, { useState } from 'react'
import styles from './Carousel.module.css'

interface Image {
    src: string
    alt: string
    name?: string
}

interface ImageCarouselProps {
    images: Image[]
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length,
        )
    }

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselInner}>
                {images.map((image, index) => {
                    let position = index - currentIndex
                    if (position < 0) position += images.length
                    if (position > images.length - 1) position -= images.length

                    return (
                        <div
                            key={index}
                            className={`${styles.carouselItem} ${
                                position === 0 ? styles.active : ''
                            } ${
                                position === 1 || position === -1
                                    ? styles.side
                                    : ''
                            } ${
                                position === 2 || position === -2
                                    ? styles.distant
                                    : ''
                            }`}
                        >
                            <img src={image.src} alt={image.alt} />
                            {image.name && (
                                <p className={styles.imageName}>{image.name}</p>
                            )}
                        </div>
                    )
                })}
            </div>
            <button
                onClick={prevSlide}
                className={`${styles.carouselButton} ${styles.prev}`}
            >
                &lt;
            </button>
            <button
                onClick={nextSlide}
                className={`${styles.carouselButton} ${styles.next}`}
            >
                &gt;
            </button>
        </div>
    )
}

export default ImageCarousel
