'use client';

// This is only used here because of the default chosen
import Image from "next/image";

const imageLoader = ({src, width, quality} : {src: string, width:number, quality?:number}) => {
    return `https://images.pexels.com/photos/${src}?auto=compress&cs=tinysrgb&w=${width}&dpr=1`
}

export default function ImageWithLoader({imRef, catName} : {imRef: string; catName: string}) {
    return (
        <Image
            className="p-2"
            loader={imageLoader}
            src={imRef}
            fill={true}
            alt={`An image corresponding to the product category named ${catName}`}
        />
    )
}