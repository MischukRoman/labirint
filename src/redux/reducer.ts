import {
    AppActions,
    IPushStep,
    ISetMarkerCoords,
    ISetStartCoords,
    ISetStatus,
    ISetUserChoiseCoords,
    MazeActionTypes,
    PUSH_STEP,
    SET_MARKER_COORDS,
    SET_START_COORDS,
    SET_STATUS,
    SET_USER_CHOISE_COORDS
} from "../types/actions";
import {GameStatuses, ICoords} from "../types/types";
import {Dispatch} from "redux";
import {AppState} from "./configureStore";
import {generateRandom} from "../utils/utils";

const makeStep = (point: ICoords, size: number): {newPoint: ICoords, step: ICoords} => {
    const steps = [
        {y: -1, x: 0}, // up
        {y: 1, x: 0}, // down
        {y: 0, x: 1}, // right
        {y: 0, x: -1}, // left
    ].filter(delta => {
        let conditions = [];
        if (point.y === 0) conditions.push(delta.y > -1);
        if (point.y === size - 1) conditions.push(delta.y < 1);
        if (point.x === 0) conditions.push(delta.x > -1);
        if (point.x === size - 1) conditions.push(delta.x < 1);

        return conditions.every(c => c);
    })

    const stepIndex = generateRandom(0, steps.length - 1);
    const newPoint = {
        x: point.x + steps[stepIndex].x,
        y: point.y + steps[stepIndex].y
    };

    return {newPoint, step: steps[stepIndex]};

}


interface IState {
    userChoiceCoords: ICoords,
    startCoords: ICoords,
    markerCoords: ICoords,
    gameStatus: GameStatuses,
    size: number,
    stepsCount: number,
    steps: Array<ICoords>
}

const initialState: IState = {
    userChoiceCoords: {x: 0, y: 0},
    startCoords: {x: 1, y: 1},
    markerCoords: {x: 1, y: 1},
    gameStatus: GameStatuses.NotStarted,
    size: 3,
    stepsCount: 10,
    steps: []
};

type MazeStateType = typeof initialState;


const mazeReducer = (
    state = initialState,
    action: MazeActionTypes
): MazeStateType => {
    switch (action.type) {
        case SET_STATUS:
            let steps = state.steps;
            if (action.status == GameStatuses.Started) {
                steps = [];
            }
            return {...state, gameStatus: action.status, steps: steps};
        case SET_MARKER_COORDS:
            return {...state, markerCoords: action.coords};
        case SET_START_COORDS:
            return {...state, startCoords: action.coords};
        case SET_USER_CHOISE_COORDS:
            return {...state, userChoiceCoords: action.coords};
        case PUSH_STEP:
            return {...state, steps: [...state.steps, action.coords]};
        default:
            return state;
    }
};

export const setStatus = (status: GameStatuses): ISetStatus => ({
    type: SET_STATUS,
    status
});
export const setStartCoords = (coords: ICoords): ISetStartCoords => ({
    type: SET_START_COORDS,
    coords
});
export const setMarkerCoords = (coords: ICoords): ISetMarkerCoords => ({
    type: SET_MARKER_COORDS,
    coords
});
export const setUserChoiseCoords = (coords: ICoords): ISetUserChoiseCoords => ({
    type: SET_USER_CHOISE_COORDS,
    coords
});
export const pushStep = (coords: ICoords): IPushStep => ({
    type: PUSH_STEP,
    coords
});

export const start = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        let mazeState = getState().maze;
        const size = mazeState.size;
        dispatch(setStatus(GameStatuses.Started));

        let startCoords = {x: generateRandom(0, size - 1), y: generateRandom(0, size - 1)};
        let finishCoords = startCoords;

        dispatch(setStartCoords(startCoords));


        let stepsCount = 0;
        let interval = setInterval(() => {

            let stepResult = makeStep(finishCoords, size);
            finishCoords = stepResult.newPoint;

            dispatch(pushStep(stepResult.step));

            stepsCount++;

            if (stepsCount === mazeState.stepsCount) {
                dispatch(setMarkerCoords(finishCoords));
                clearInterval(interval);
            }
        }, 500);
    };
};
export const choose = (coords: ICoords) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        dispatch(setStatus(GameStatuses.Stopped));
        dispatch(setUserChoiseCoords(coords));
    };
};

export default mazeReducer;