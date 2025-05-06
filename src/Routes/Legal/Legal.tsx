import Datenschutz from "./Datenschutz.tsx";
import Impressum from "./Impressum.tsx";
import styles from "./Legal.module.css";

export default function Legal() {
    return (
        <main className={styles.container}>
            <Datenschutz/>
            <Impressum/>
        </main>
    )
}