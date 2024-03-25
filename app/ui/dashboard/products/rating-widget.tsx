/**
 * A widget that can produce views of a rating.
 *
 * [Adapted from the following Github dicussion: https://github.com/tailwindlabs/heroicons/discussions/424 ]
 */

import { useId } from "react";

const Star = ({ variant }: { variant: "filled" | "empty" | "half" }) => {
    const id = useId();

    let c1, c2;
    if (variant === "filled") {
        c1 = "#000000";
        c2 = "#000000";
    } else if (variant === "empty") {
        c1 = "#C4C4C4";
        c2 = "#C4C4C4";
    } else if (variant === "half") {
        c1 = "#000000";
        c2 = "#C4C4C4";
    }

    return (
        <svg
            height="100%"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id={id}>
                    <stop offset="50%" stopColor={c1} />
                    <stop offset="50%" stopColor={c2} />
                </linearGradient>
            </defs>
            <path
                d="M10 0.148438L12.935 6.14144L19.5 7.10844L14.75 11.7704L15.871 18.3564L10 15.2454L4.129 18.3564L5.25 11.7704L0.5 7.10844L7.064 6.14144L10 0.148438Z"
                fill={`url(#${id})`}
            />
        </svg>
    );
};

export default function Rating ( { rating, numRatings, max = 5 }
    : { rating: number; numRatings: number; max?: number } ) {
    return (
        <div className="flex h-full w-full items-center align-middle bg-white">
            {Array.from({ length: Math.floor(rating) }, (_, i) => (
                <Star key={i} variant="filled" />
            ))}
            {!Number.isInteger(rating) && <Star variant="half" />}
            {Array.from({ length: max - Math.ceil(rating) }, (_, i) => (
                <Star key={i} variant="empty" />
            ))}
            <span className="pl-1 text-sm">{`(${numRatings})`}</span>
        </div>
    );
};