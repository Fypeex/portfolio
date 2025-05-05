import styles from "./Tooltip.module.css";
import {useEffect, useRef, useState} from "react";

export interface TooltipProps {
    name: string;
    position?: "top" | "bottom" | "left" | "right",
    margin?: number;
}

export default function Tooltip({name, position = "top", margin = 8}: TooltipProps) {
    const [show, setShow] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");
    const [parent, setParent] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const parentElement = ref.current?.parentElement;
        if (parentElement) {
            setParent(parentElement);
        }
    }, []);

    useEffect(() => {
        const parentRect = parent?.getBoundingClientRect();

        let transform = "";

        if (parentRect) {
            switch (position) {
                case "top":
                    transform = `translate(-50%,-${parentRect?.height / 2 + ref.current!.getBoundingClientRect().height + margin}px)`;
                    break;
                case "bottom":
                    transform = `translate(-50%,${(parentRect?.height / 2) + margin}px)`;
                    break;
                case "left":
                    transform = `translate(-${parentRect?.width + ref.current!.getBoundingClientRect().width + margin}px, -50%)`;
                    break;
                case "right":
                    transform = `translate(${parentRect?.width + margin}px, -50%)`;
                    break;
            }
        }

        setTransform(transform);

    }, [margin, parent, position]);

    useEffect(() => {
        if (!parent) return;
        parent.addEventListener("mouseover", () => {
            setShow(true);
        });
        parent.addEventListener("mouseout", () => {
            setShow(false);
        });

        return () => {
            parent.removeEventListener("mouseover", () => {
                console.log("mouseover", parent);
                setShow(true);
            });
            parent.removeEventListener("mouseout", () => {
                setShow(false);
            });
        }
    }, [parent]);

    return (
        <div className={styles.tooltip} ref={ref}
             style={{
                 transform,
                 opacity: show ? 1 : 0
             }}
        >
            {name}
        </div>
    )
}