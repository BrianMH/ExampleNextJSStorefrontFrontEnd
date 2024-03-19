/**
 * Collects all the fonts to be used for the project
 */
import {Arimo, Inter_Tight, Abril_Fatface} from 'next/font/google';

// Root font (Helvetica look-alike?)
export const inter = Arimo({subsets: ["latin"]});

// Used only for the logo
export const interTight = Inter_Tight({subsets: ["latin"],
    weight: "800"})

// Used only for the hero message on the front page
export const abrilFatface = Abril_Fatface({subsets: ["latin"], weight: "400"});