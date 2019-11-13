import {ICoords} from "../types/types";

export const isEqual = (...coords: Array<ICoords>): boolean => {
    if (coords.length <= 1) return true;
    return coords.every(c => coords[0].x === c.x && coords[0].y === c.y);
}

export const generateRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
