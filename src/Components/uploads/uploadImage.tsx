import React from 'react'

interface ImageProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Image: React.FC<ImageProps> = ({ onChange }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <input
                type="file"
                name="image"
                accept="image/*"
                style={{ display: 'none' }}
                id="imageInput"
                onChange={onChange}
            />
            <label
                htmlFor="imageInput"
                style={{
                    cursor: 'pointer',
                    color: '#276AFF',
                    textDecoration: 'underline',
                }}
            >
                Choose Image
            </label>
        </div>
    )
}

export default Image
