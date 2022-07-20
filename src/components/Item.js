import React from 'react';

export const Item = ({ image }) => {
    return (
        <span>
            <hr className="item-sep" />
            <a target='_blank' href={image.link}>
                <img src={image.nsfw ? null : (
                    image.is_album ? image.images[0].link : image.link
                )
                } label={image.title} />
                <p style={{ fontSize: '12px' }}>{image.title}</p>
            </a>
            <p>Uploaded By: {image.account_url}</p>
            <p>NSFW: {image.nsfw ? 'YES' : 'NO'}</p>
            <p>Views: {image.views}, Ups: {image.ups}, Comments: {image.comment_count}</p>
        </span>
    )
}