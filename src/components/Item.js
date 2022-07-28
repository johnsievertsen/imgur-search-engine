import React from 'react';
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
} from 'video-react';

function imgSrc(image, index) {
    return image.nsfw ? null : (image.is_album ? image.images[index].link : image.link)
}

let i = null;
const Video = ({ image, index }) => {
    return <Player src={imgSrc(image, index)}>
        <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton disabled />
        </ControlBar>
    </Player>;
};
const Image = ({ image, index }) => {
    return (
        <a target='_blank' href={image.link}>
            <img src={fileType(image) === 'gif' ? `${imgSrc(image, index)}.gif` : imgSrc(image, index)} alt={image.title} />
        </a>
    );
};

function fileType(image) {
    if (isVideo(image)) {
        return 'video';
    } else if (isImage(image)) {
        return 'image';
    } else if (isGif(image)) {
        return 'gif';
    }
    return 'other';
}

function isVideo(image) {
    return (image.is_album
        ? image.images[0].hasOwnProperty('mp4') && image.images[0].type === "video/mp4"
        : image.hasOwnProperty('mp4') && image.type === "video/mp4");
}

function isImage(image) {
    if (image.is_album) {
        return image.images[0].type === 'image/jpeg' || image.images[0].type === 'image/png';
    } else {
        return image.type === 'image/jpeg' || image.type === 'image/png';
    }
}

function isGif(image) {
    return (image.is_album ? image.images[0].type === "image/gif" : image.type === "image/gif");
}

export const Item = ({ image }) => {
    const allImages = (image) => {
        let album = [];
        if (image.is_album) {
            for (i = 0; i < image.images.length; i++) {
                album.push(albumContent(image, i));
            }
            i = null;
        } else {
            album.push(albumContent(image, i));
        }
        return album;
    }

    function albumContent(image, i) {
        if (isVideo(image)) {
            return <Video index={i} image={image} />;
        }
        return <Image index={i} image={image} />;
    }

    return (
        <span className="item-container">
            <hr className="item-sep" />
            {allImages(image)}
            <a target='_blank' href={image.link} ><p style={{ fontSize: '16px' }}>{image.title}</p></a>
            <p>File type: {fileType(image)}</p>
            <a href={`https://imgur.com/user/${image.account_url}`} target="_blank" style={{ fontSize: '12px' }}>Uploaded By: {image.account_url}</a>
            <p>NSFW: {image.nsfw ? 'YES' : 'NO'}</p>
            <span style={{ fontSize: '12px' }}><a href={image.link} target="_blank" >Views: {image.views}</a>, <a href={image.link} target="_blank" >Score: {image.score}</a>, <a href={image.link} target="_blank" >Comments: {image.comment_count}</a></span>
        </span>
    )
}