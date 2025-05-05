import styles from "./Projects.module.css"
import {iconType} from "../../Components/Icons/Icons.tsx";
import TechStackIcon from "./TechStackIcon.tsx";
import { motion } from "framer-motion";


export default function ProjectCardTechStack(
    {
        technologies,
    }: {
        technologies: iconType[];
    }
) {

    return (
        <motion.div className={styles.techStack}
             variants={{hidden: {opacity: 0}, show: {opacity: 1}}}
        >
            {technologies.map((technology) => (
                <TechStackIcon
                    key={technology}
                    name={technology}
                />
            ))}
        </motion.div>
    )
}