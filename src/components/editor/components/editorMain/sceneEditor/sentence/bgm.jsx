import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import { useEffect, useState } from "react";
import styles from './sentence.module.scss'
import ControlPanel from "./controlPanel";
import { Switch } from "antd";
import ChooseFile from "../../../chooseFile";

const Bgm = (props) => {
    const [showAddPre, setShowAddPre] = useState(false);
    const [showAddAfter, setShowAddAfter] = useState(false);

    //生成前序和后序index
    const indexPre = props.index;
    const indexAfter = props.index + 1;

    const propsToPanel = { showAddPre, setShowAddPre, showAddAfter, setShowAddAfter, indexPre, indexAfter };

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
        <div className={styles.topContainer}>
            <div className={styles.sentenceIndexShow}>
                {/* #{props.index + 1} */}
                更改音乐</div>
            <ControlPanel index={props.index} data={propsToPanel} />
        </div>
        <main>
            <div className={styles.singleOption}>
                <span className={styles.optionTitle}>关闭背景音乐</span>
                <span className={styles.optionContent}>
                    <Switch id={'bgm_none' + props.index} checked={props.data.noBgm} onChange={bgmCheckBoxNo} />
                    （将关闭背景音乐）
                </span>
            </div>
            <div className={styles.singleOption}>
                <span className={styles.optionTitle}>背景音乐文件</span>
                <ChooseFile setShow={setBgmName} id={'bgmPicker'} dir={'bgm'} set={setConstructor()} />
                <span className={styles.optionContent}>{bgmName}</span>
            </div>
        </main>
    </div>
}

export default Bgm;