import styles from "./Projects.module.css";

import React from "react";
import {icons} from "../../Components/Icons/Icons.tsx";
import Tooltip from "../../Components/Tooltip/Tooltip.tsx";

export type IconName = keyof typeof icons;

interface TechStackIconProps {
    name: IconName;
    size?: number;
    className?: string;
    color?: string;
}

const TechStackIcon: React.FC<TechStackIconProps> = ({
                                                         name,
                                                         size = 38,
                                                         color = "white",
                                                         className = ""
                                                     }) => {

    const IconSvg = icons[name];


    return (
        <div
            className={`${styles.techStackIcon} ${className ? className : ""}`}
            aria-label={name}
        >
            {React.cloneElement(IconSvg, {size, style: {color}})}

            <Tooltip name={name}
                     position="top"/>
        </div>
    );
};

export default TechStackIcon;
