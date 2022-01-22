import styles from './topBar.module.scss'
import {LeftSmall} from "@icon-park/react";
import store from "../../store/editorStore";

const TopBar = () => {
    return <div className={styles.nav}>
        <LeftSmall theme="filled" size="30" fill="#333" className={styles.titleIcon} onClick={() => {
            store.set('isManagement', true);
        }}/>
        <div className={styles.title}>WebGAL ORIGINE</div>
    </div>
}

export default TopBar;