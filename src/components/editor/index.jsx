import {useEffect, useState} from "react";
import store from "./store/editorStore";
import TopBar from "./components/topBar";
import SideBar from "./components/sideBar";
import styles from './editor.module.scss'

const Editor = () => {
    const [editorStatus, setEditorStatus] = useState(true);
    useEffect(() => {
        store.set('updateEditor',true);
        store.connect('updateEditor',
            () => {
                setEditorStatus(store.get('updateEditor'))
            },
            'ForceUpdate');
    }, [])
    return <div>
        <TopBar/>
        <main className={styles.main}>
            <SideBar/>
        </main>
    </div>
}

export default Editor;