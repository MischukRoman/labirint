import styles from "../Maze.module.css";
import React from "react";
import {Cell} from "./Cell";
import {GameStatuses, ICoords} from "../types/types";
import {choose} from "../redux/reducer";

interface IProps {
    size: number
    index: number
    markerCoords: ICoords
    startCoords: ICoords
    userChoiceCoords: ICoords
    gameStatus: GameStatuses
    choose: (coords: ICoords) => void
}

export const Row = (props: IProps) => {
    return <div className={styles.row}>
        {[...new Array(props.size)].map((el, index) => {
            return <Cell key={index}
                         coords={{x: index, y: props.index}}
                         gameStatus={props.gameStatus}
                         startCoords={props.startCoords}
                         markerCoords={props.markerCoords}
                         userChoiceCoords={props.userChoiceCoords}
                         onClick={props.choose}
            />
        })}
    </div>
}