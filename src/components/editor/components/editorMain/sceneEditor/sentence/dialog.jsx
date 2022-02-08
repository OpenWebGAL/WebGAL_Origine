import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import {useEffect, useState} from "react";
import styles from './sentence.module.scss'
import ControlPanel from "./controlPanel";
import {Switch} from "antd";
import ChooseFile from "../../../chooseFile";

const Dialog = (props) => {
    const [showAddPre, setShowAddPre] = useState(false);
    const [showAddAfter, setShowAddAfter] = useState(false);

    //生成前序和后序index
    const indexPre = props.index;
    const indexAfter = props.index + 1;

    const propsToPanel = {showAddPre,setShowAddPre,showAddAfter,setShowAddAfter,indexPre,indexAfter};

    //用于控制语句内容的变更
    useEffect(() => {
        document.getElementById('speakerInput' + props.index).value = props.data.speaker;
        document.getElementById('contentInput' + props.index).value = props.data.content;
        // document.getElementById('dialog_pbms' + props.index).checked = props.data.ignoreSpeaker;
    })

    //传递变化的结果
    const updateThis = () => {
        runtime.currentSceneSentenceList[props.index].speaker = document.getElementById('speakerInput' + props.index).value;
        runtime.currentSceneSentenceList[props.index].content = document.getElementById('contentInput' + props.index).value;
        store.set('writeScene', !store.get('writeScene'));
    }

    const dialogCheckBoxUpdate = (checked)=>{
        runtime.currentSceneSentenceList[props.index].ignoreSpeaker = checked;
        store.set('writeScene', !store.get('writeScene'));
    }

    const [vocalName,setVocalName]= useState(props.data.vocal);

    const setConstructor = () => {
        return (value) => {
            runtime.currentSceneSentenceList[props.index].vocal = value;
            store.set('writeScene', !store.get('writeScene'));
        }
    }

    //语句编辑的UI
    return <div key={props.index + 'dialog'} className={styles.sentence}>
        <div className={styles.sentenceIndexShow}>语句{props.index+1}:基本对话</div>
        <ControlPanel index={props.index} data={propsToPanel}/>
        <main>
            <div className={styles.singleOption}>
                旁白模式<span style={{padding:'0 5px 0 0'}}> </span>
                <Switch id={'dialog_pbms'} checked={props.data.ignoreSpeaker} onChange={dialogCheckBoxUpdate} />
                <span style={{padding:'0 0 0 5px'}}>（将不会显示角色名）</span>
            </div>
            <div className={styles.singleOption}>
                角色：
                <input className={styles.dialog_input} onChange={updateThis} id={'speakerInput' + props.index}/>
            </div>
            <div className={styles.singleOption}>
                对话：
                <input className={styles.dialog_input} onChange={updateThis} id={'contentInput' + props.index}/>
            </div>
            <div className={styles.singleOption}>
                配音文件：{vocalName}
                <ChooseFile setShow={setVocalName} id={'vocalPicker'} dir={'vocal'} set={setConstructor()}/>
            </div>
        </main>

    </div>
}

export default Dialog;