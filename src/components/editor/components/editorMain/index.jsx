import styles from './editorMain.module.scss';
import {useEffect, useState} from "react";
import store from "../../store/editorStore";
import runtime from "../../controller/runtime";
import {CloseSmall, ViewGridList} from "@icon-park/react";

const EditorMain = () => {
    const [updateEditor, setUpdateEditor] = useState(false);
    useEffect(() => {
        store.set('updateEditor', updateEditor);
        store.connect('updateEditor', () => {
            setUpdateEditor(store.get('updateEditor'));
        });
    }, []);

    //editor的所有数据组织全部从runtime里面调
    const showTags = [];
    for (const e of runtime.currentOpendSceneEdit) {
        let temp;
        if (e === runtime.currentEditScene) {
            temp = <div key={e} className={styles.tagOpened}>
                <ViewGridList theme="outline" size="20" fill="#333" className={styles.tagIcon}/>
                {e}
                <CloseSmall theme="outline" size="20" fill="#333" className={styles.tagIcon}/>
            </div>
        } else {
            temp = <div key={e} className={styles.tag}>
                <ViewGridList theme="outline" size="20" fill="#333" className={styles.tagIcon}/>
                {e}
                <CloseSmall theme="outline" size="20" fill="#333" className={styles.tagIcon}/>
            </div>
        }
        showTags.push(temp);
    }

    return <div className={styles.main}>
        <div className={styles.tagList}>
            {showTags}
        </div>
        <div>
            {runtime.currentEditScene}
        </div>
    </div>
}

export default EditorMain;