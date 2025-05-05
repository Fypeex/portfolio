import {useCurtainContext} from "./Provider/CurtainContext.tsx";
import {ComponentProps} from "react";
import {useNavigate} from "react-router";

export default function CustomLink(props: ComponentProps<"a"> & {
    href: string;
}) {
    const {runExit,runOpen} = useCurtainContext();
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        e.preventDefault();

        //If the link is external, open it in a new tab,
        //Run animation "exit" and navigate to the new page
        //If the new page is same as old one, run animation "open"

        if (props.href.startsWith("http")) {
            window.open(props.href, "_blank");
            runExit();
        }

        if (props.href !== window.location.pathname) {
            runExit().then(() => {
                if(props.onClick) props.onClick(e);
                navigate(props.href);
            });
        } else {
            runExit().then(() => {
                if(props.onClick) props.onClick(e);
                setTimeout(runOpen, 200);
            });
        }
    }

    return (
        <a
            {...props}
            onClick={handleClick}
            className={props.className}
            href={props.href}
        >
            {props.children}
        </a>
    )
}