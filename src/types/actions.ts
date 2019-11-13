

// action strings
import {GameStatuses, ICoords} from "./types";

export const SET_STATUS = "SET_STATUS";
export const SET_START_COORDS = "SET_START_COORDS";
export const SET_MARKER_COORDS = "SET_MARKER_COORDS";
export const SET_USER_CHOISE_COORDS = "SET_USER_CHOISE_COORDS";
export const PUSH_STEP = "PUSH_STEP";

export interface ISetStatus {
    type: typeof SET_STATUS
    status: GameStatuses
}
export interface ISetStartCoords {
    type: typeof SET_START_COORDS
    coords: ICoords
}
export interface ISetMarkerCoords {
    type: typeof SET_MARKER_COORDS
    coords: ICoords
}
export interface ISetUserChoiseCoords {
    type: typeof SET_USER_CHOISE_COORDS
    coords: ICoords
}
export interface IPushStep {
    type: typeof PUSH_STEP
    coords: ICoords
}

export type MazeActionTypes =
    | ISetStatus
    | ISetStartCoords
    | ISetMarkerCoords
    | ISetUserChoiseCoords
    | IPushStep

export type AppActions = MazeActionTypes ;