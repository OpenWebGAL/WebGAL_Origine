import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import {useEffect, useState} from "react";
import styles from './sentence.module.scss'
import ControlPanel from "./controlPanel";
import {Switch} from "antd";
import ChooseFile from "../../../chooseFile";

const ChangeScene = (props) => {
    const [showAddPre, setShowAddPre] = useState(false);
    const [showAddAfter, setShowAddAfter] = useState(false);

    //生成前序和后序index
    const indexPre = props.index;
    const indexAfter = props.index + 1;

    const propsToPanel = {showAddPre, setShowAddPre, showAddAfter, setShowAddAfter, indexPre, indexAfter};

    //用于控制语句内容的变更
    useEffect(() => {
    })

    const [sceneName, setSceneName] = useState(props.data.newScene);

    const setConstructor = () => {
        return (value) => {
            runtime.currentSceneSentenceList[props.index].newScene = value;
            store.set('writeScene', !store.get('writeScene'));
        }
    }

    //语句编辑的UI
    return <div key={props.index + 'scene'} className={styles.sentence}>
        <div className={styles.sentenceIndexShow}>语句{props.index+1}:切换场景</div>
        <ControlPanel index={props.index} data={propsToPanel}/>
        <main>
            <div className={styles.singleOption}>
                新场景：{sceneName}
                <ChooseFile setShow={setSceneName} id={'scenePicker'} dir={'scene'} set={setConstructor()}/>
            </div>
        </main>
    </div>
}

export default ChangeScene;