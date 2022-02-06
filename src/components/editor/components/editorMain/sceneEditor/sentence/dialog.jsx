import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import {useEffect, useState} from "react";
import styles from './sentence.module.scss'
import {deleteThis} from "./util";
import {Add, Delete, DownSquare, UpSquare} from "@icon-park/react";
import AddSentenceByIndex from "../addSentenceByIndex";

const Dialog = (props) => {
    const [showAddPre, setShowAddPre] = useState(false);
    const [showAddAfter, setShowAddAfter] = useState(false);

    //生成前序和后序index
    const indexPre = props.index;
    const indexAfter = props.index + 1;

    useEffect(() => {
        document.getElementById('speakerInput' + props.index).value = props.data.speaker;
        document.getElementById('contentInput' + props.index).value = props.data.content;
    })

    const updateThis = () => {
        runtime.currentSceneSentenceList[props.index].speaker = document.getElementById('speakerInput' + props.index).value;
        runtime.currentSceneSentenceList[props.index].content = document.getElementById('contentInput' + props.index).value;
        store.set('writeScene', !store.get('writeScene'));
    }

    return <div key={props.index + 'dialog'} className={styles.sentence}>
        <div className={styles.sentenceButtonList}>
            <div className={styles.sentenceButton} onClick={() => {
                deleteThis(props.index)
            }}>
                <Delete theme="outline" size="16" fill="#333" style={{padding: '0 5px 0 0'}}/>
                删除本句
            </div>
            <div className={styles.sentenceButton}>
                <UpSquare theme="outline" size="16" fill="#333" style={{padding: '0 5px 0 0'}}/>
                上移本句
            </div>
            <div className={styles.sentenceButton}>
                <DownSquare theme="outline" size="16" fill="#333" style={{padding: '0 5px 0 0'}}/>
                下移本句
            </div>
            <div onClick={() => {
                setShowAddPre(!showAddPre)
            }} className={styles.sentenceButton}>
                <Add theme="outline" size="16" fill="#333" style={{padding: '0 5px 0 0'}}/>
                在本句前插入句子
                {showAddPre && <AddSentenceByIndex index={indexPre}/>}
            </div>
            <div onClick={() => {
                setShowAddAfter(!showAddAfter)
            }} className={styles.sentenceButton}>
                <Add theme="outline" size="16" fill="#333" style={{padding: '0 5px 0 0'}}/>
                在本句后插入句子
                {showAddAfter && <AddSentenceByIndex index={indexAfter}/>}
            </div>
        </div>
        <main>
            <div className={styles.singleOption}>
                角色：
                <input className={styles.dialog_input} onChange={updateThis} id={'speakerInput' + props.index}/>
            </div>
            <div className={styles.singleOption}>
                对话：
                <input className={styles.dialog_input} onChange={updateThis} id={'contentInput' + props.index}/>
            </div>
        </main>

    </div>
}

export default Dialog;