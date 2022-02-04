import {useEffect, useState} from "react";
import store from "./store/editorStore";
import TopBar from "./components/topBar";
import SideBar from "./components/sideBar";
import styles from './editor.module.scss'
import EditorMain from "./components/editorMain";

const Editor = () => {
    const [editorStatus, setEditorStatus] = useState(true);
    useEffect(() => {
        store.set('updateEditor', true);
        store.connect('updateEditor', () => {
            setEditorStatus(store.get('updateEditor'))
        }, 'ForceUpdateEditor');
    }, [])
    return <div>
        <TopBar/>
        <main className={styles.main}>
            <SideBar/>
            <EditorMain/>
        </main>
    </div>
}

export default Editor;