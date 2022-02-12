import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import {useEffect, useState} from "react";
import styles from './sentence.module.scss'
import ControlPanel from "./controlPanel";
import {Switch} from "antd";
import ChooseFile from "../../../chooseFile";

const PlayVideo = (props) => {
    const [showAddPre, setShowAddPre] = useState(false);
    const [showAddAfter, setShowAddAfter] = useState(false);

    //生成前序和后序index
    const indexPre = props.index;
    const indexAfter = props.index + 1;

    const propsToPanel = {showAddPre, setShowAddPre, showAddAfter, setShowAddAfter, indexPre, indexAfter};

    //用于控制语句内容的变更
    useEffect(() => {
    })

    const [videoName, setVideoName] = useState(props.data.video);

    const setConstructor = () => {
        return (value) => {
            runtime.currentSceneSentenceList[props.index].video = value;
            store.set('writeScene', !store.get('writeScene'));
        }
    }

    //语句编辑的UI
    return <div key={props.index + 'scene'} className={styles.sentence}>
        <div className={styles.topContainer}>
            <div className={styles.sentenceIndexShow}>#{props.index + 1} 播放视频</div>
            <ControlPanel index={props.index} data={propsToPanel}/></div>
        <main>
            <div className={styles.singleOption}>
                <span className={styles.optionTitle}>视频文件</span>
                <ChooseFile setShow={setVideoName} id={'videoPicker'} dir={'video'} set={setConstructor()}/>
                <span className={styles.optionContent}>{videoName}</span>
            </div>
        </main>
    </div>
}

export default PlayVideo;