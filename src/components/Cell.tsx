import styles from "../Maze.module.css";
import React from "react";
import {Icon} from "./Icon";
import {GameStatuses, ICoords} from "../types/types";
import {isEqual} from "../utils/utils";


interface IProps {
    coords: ICoords
    markerCoords: ICoords
    startCoords: ICoords
    userChoiceCoords: ICoords
    gameStatus: GameStatuses
    onClick: (coords: ICoords) => void
}

export const Cell: React.FC<IProps> = (props) => {
    const {coords, gameStatus, startCoords, markerCoords, userChoiceCoords} = props;

    let startedMode = isEqual(coords, startCoords) && <Icon type="start"/>;

    let stoppedMode;

    if (isEqual(coords, markerCoords, userChoiceCoords)) {
        stoppedMode = <Icon type="success"/>
    } else if (isEqual(coords, markerCoords) && !isEqual(userChoiceCoords, markerCoords)) {
        stoppedMode = <Icon type="marker"/>;
    } else if (!isEqual(coords, markerCoords) && isEqual(userChoiceCoords, coords)) {
        stoppedMode = <Icon type="error"/>;
    }

    return <div className={styles.cell} onClick={() => {
        if (gameStatus === GameStatuses.Started) {
            props.onClick(coords);
        }
    }}>
        {coords.y} - {coords.x}
        {gameStatus == GameStatuses.Started && startedMode}
        {gameStatus == GameStatuses.Stopped && stoppedMode}

    </div>
}
