import React from 'react';
import { Item } from './Item'

export const Gallery = ({ gallery }) => {
    const itemComp = Object.values(gallery).map(image => {
        return (
            <Item
                key={image.id}
                image={image}
            />
        )
    })
    return (
        <ul>
            {itemComp}
        </ul >
    );
}