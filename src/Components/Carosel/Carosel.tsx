import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Typography } from '@mui/material'

interface CarouselProps {
    images: string[]
}

const Example: React.FC<CarouselProps> = ({ images }) => {
    if (!images || images.length === 0) {
        return <Typography variant="h6">No images available</Typography>
    }

    return (
        <Carousel sx={{ width: '100%', height: '100%' }}>
            {images.map((image, i) => (
                <Item key={i} image={image} />
            ))}
        </Carousel>
    )
}

interface ItemProps {
    image: string
}

const Item: React.FC<ItemProps> = ({ image }) => {
    return (
        <Paper sx={{ width: '100%', height: '100%' }}>
            <img
                src={image}
                alt="Event"
                style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                    border: 'none',
                    display: 'block',
                }}
            />
        </Paper>
    )
}

export default Example
