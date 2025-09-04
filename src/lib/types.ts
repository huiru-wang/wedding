import { JSXElementConstructor, ReactElement } from "react";

export type TravelMarkerContentBlock =
    | { type: "text"; text: string }
    | { type: "image"; src: string; caption?: string };

export type TravelMarker = {
    title: string;
    SOC: string;
    city: string;
    depth: number;
    position: [number, number];
    zooms: number[];
    iconImg: string;
    logFile?: string;
    travelLog?: ReactElement<unknown, string | JSXElementConstructor<any>>;
    content?: TravelMarkerContentBlock[];
}
