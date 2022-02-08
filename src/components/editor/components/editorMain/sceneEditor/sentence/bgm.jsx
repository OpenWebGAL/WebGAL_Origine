import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import {useEffect, useState} from "react";
import styles from './sentence.module.scss'
import ControlPanel from "./controlPanel";
import {Switch} from "antd";
import ChooseFile from "../../../chooseFile";

const Bgm = (props) => {
    const [showAddPre, setShowAddPre] = useState(false);
    const [showAddAfter, setShowAddAfter] = useState(false);

    //生成前序和后序index
    const indexPre = props.index;
    const indexAfter = props.index + 1;

    const propsToPanel = {showAddPre, setShowAddPre, showAddAfter, setShowAddAfter, indexPre, indexAfter};

    //用于控制语句内容的变更
    useEffect(() => {
    })

    const bgmCheckBoxNo = (checked) => {
        runtime.currentSceneSentenceList[props.index].noBgm = checked;
        store.set('writeScene', !store.get('writeScene'));
    }


    const [bgmName, setBgmName] = useState(props.data.bgm);

    const setConstructor = () => {
        return (value) => {
            runtime.currentSceneSentenceList[props.index].bgm = value;
            store.set('writeScene', !store.get('writeScene'));
        }
    }

    //语句编辑的UI
    return <div key={props.index + 'bgm'} className={styles.sentence}>
        <div className={styles.sentenceIndexShow}>语句{props.index+1}:更改背景音乐</div>
        <ControlPanel index={props.index} data={propsToPanel}/>
        <main>
            <div className={styles.singleOption}>
                关闭背景音乐<span style={{padding: '0 5px 0 0'}}> </span>
                <Switch id={'bgm_none' + props.index} checked={props.data.noBgm} onChange={bgmCheckBoxNo}/>
                <span style={{padding: '0 0 0 5px'}}>（将关闭背景音乐）</span>
            </div>
            <div className={styles.singleOption}>
                背景音乐文件：{bgmName}
                <ChooseFile setShow={setBgmName} id={'bgmPicker'} dir={'bgm'} set={setConstructor()}/>
            </div>
        </main>
    </div>
}

export default Bgm;