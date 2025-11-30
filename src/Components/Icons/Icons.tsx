import StackIcon from "tech-stack-icons";
import type {CSSProperties} from "react";
import {SiExpress} from "react-icons/si";
import fastapi from "../../assets/fastapi.png";
import mantine from "../../assets/mantine.svg";
import linkedin from "../../assets/linkedin.svg";
// @ts-expect-error Importing SVG as a React component
import TwitterIcon_W from "../../assets/twitter_white.svg?react";
// @ts-expect-error Importing SVG as a React component
import GithubIcon from "../../assets/github.svg?react";
// @ts-expect-error Importing SVG as a React component
import OpenCVIcon from "../../assets/opencv.svg?react";

import styles from "./Icons.module.css";

export type iconType = keyof typeof icons;

const iconStyle: CSSProperties = {zoom: 0.35};

export const icons = {
    Twitter: <TwitterIcon_W width={38} height={38} className={styles.icon}/>,
    LinkedIn: <img src={linkedin} width={38} height={38} style={{backgroundColor: "white"}}/>,
    React: <StackIcon name="reactjs" style={iconStyle}/>,
    NextJs: <StackIcon name="nextjs" style={iconStyle}/>,
    TypeScript: <StackIcon name="typescript" style={iconStyle}/>,
    JavaScript: <StackIcon name="js" style={iconStyle}/>,
    PyTorch: <StackIcon name="pytorch" style={iconStyle}/>,
    OpenCV: <OpenCVIcon name="opencv" style={iconStyle}/>,
    NodeJs: <StackIcon name="nodejs" style={iconStyle}/>,
    Express: <SiExpress name="express" size={60} color={"black"}/>,
    Vite: <StackIcon name="vitejs" style={iconStyle}/>,
    TailwindCSS: <StackIcon name="tailwindcss" style={iconStyle}/>,
    HTML5: <StackIcon name="html5" style={iconStyle}/>,
    CSS3: <StackIcon name="css3" style={iconStyle}/>,
    Sass: <StackIcon name="sass" style={iconStyle}/>,
    Python: <StackIcon name="python" style={iconStyle}/>,
    Java: <StackIcon name="java" style={iconStyle}/>,
    Docker: <StackIcon name="docker" style={iconStyle}/>,
    Kubernetes: <StackIcon name="kubernetes" style={iconStyle}/>,
    Git: <StackIcon name="git" style={iconStyle}/>,
    GitHub: <GithubIcon width={38} height={38} className={styles.icon}/>,
    GitLab: <StackIcon name="gitlab" style={iconStyle}/>,
    MongoDB: <StackIcon name="mongodb" style={iconStyle}/>,
    PostgreSQL: <StackIcon name="postgresql" style={iconStyle}/>,
    SpringBoot: <StackIcon name="spring" style={iconStyle}/>,
    FastAPI: <img src={fastapi} width="38" height="38" alt="FastAPI"/>,
    Mantine: <img src={mantine} width="38" height="38" alt="Mantine"/>,
    Bootstrap: <StackIcon name="bootstrap5" style={iconStyle}/>,
} as const;


export type IconType = keyof typeof icons;
