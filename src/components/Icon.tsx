import start from "../assets/images/start.png";
import success from "../assets/images/success.png";
import error from "../assets/images/error.png";
import marker from "../assets/images/marker.png";
import styles from "../Maze.module.css";
import React from "react";

interface IProps {
    type: "start" | "success" | "error" | "marker";
}

export const Icon: React.FC<IProps> = (props) => {
    let img;
    switch (props.type) {
        case "start":
            img = start;
            break;
        case "success":
            img = success;
            break;
        case "error":
            img = error;
            break;
        case "marker":
            img = marker;
            break;
    }

    return <img className={styles.icon} src={img}/>
}