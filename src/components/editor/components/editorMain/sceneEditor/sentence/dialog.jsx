import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import {useEffect} from "react";
import styles from './sentence.module.scss'

const Dialog = (props) => {
    useEffect(() => {
        document.getElementById('speakerInput' + props.index).value = props.data.speaker;
        document.getElementById('contentInput' + props.index).value = props.data.content;
    }, [])

    const updateThis = () => {
        runtime.currentSceneSentenceList[props.index].speaker = document.getElementById('speakerInput' + props.index).value;
        runtime.currentSceneSentenceList[props.index].content = document.getElementById('contentInput' + props.index).value;
        store.set('writeScene', !store.get('writeScene'));
    }

    return <div key={props.index + 'dialog'} className={styles.sentence}>
        <div className={styles.singleOption}>
            角色：
            <input className={styles.dialog_input} onChange={updateThis} id={'speakerInput' + props.index}/></div>
        <div className={styles.singleOption}>
            对话：
            <input className={styles.dialog_input} onChange={updateThis} id={'contentInput' + props.index}/></div>
    </div>
}

export default Dialog;