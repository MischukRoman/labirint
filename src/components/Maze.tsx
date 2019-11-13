import styles from "../Maze.module.css";
import {Row} from "./Row";
import React from "react";
import {GameStatuses, ICoords} from "../types/types";
import {connect} from "react-redux";
import {AppState} from "../redux/configureStore";
import {choose, start} from "../redux/reducer";

interface IOwnProps {
}

interface IMapStateProps {
    gameStatus: GameStatuses
    markerCoords: ICoords
    startCoords: ICoords
    userChoiceCoords: ICoords
    size: number
    steps: Array<ICoords>
}

interface IMapDispatchProps {
    start: () => void
    choose: (coords: ICoords) => void
}

type IProps = IOwnProps & IMapStateProps & IMapDispatchProps;

const Maze: React.FC<IProps> = (props) => {
    return <div className={styles.mazeApp}>
        <div className={styles.maze}>
            {[...new Array(props.size)].map((el, index) => {
                return <Row key={index}
                            index={index}
                            size={props.size}
                            userChoiceCoords={props.userChoiceCoords}
                            startCoords={props.startCoords}
                            markerCoords={props.markerCoords}
                            gameStatus={props.gameStatus}
                            choose={props.choose}
                />
            })}
        </div>
        <div>
            {props.gameStatus != GameStatuses.Started &&
            <button onClick={() => {
                props.start()
            }}>Start</button>}
        </div>
        <div>

            {props.steps.map((s, index) => {
                let text = "";
                if (s.x > 0) text = "Right";
                if (s.x < 0) text = "Left";
                if (s.y > 0) text = "Down";
                if (s.y < 0) text = "UP";

                return <span key={index}>{text}</span>
            })}
        </div>
    </div>
}

const mapStateToProps = (state: AppState): IMapStateProps => ({
    gameStatus: state.maze.gameStatus,
    markerCoords: state.maze.markerCoords,
    startCoords: state.maze.startCoords,
    userChoiceCoords: state.maze.userChoiceCoords,
    size: state.maze.size,
    steps: state.maze.steps,
})


export default connect(mapStateToProps, {start, choose})(Maze);