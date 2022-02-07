import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import {useEffect, useState} from "react";
import styles from './sentence.module.scss'
import ControlPanel from "./controlPanel";
import {Switch} from "antd";
import ChooseFile from "../../../chooseFile";

const Bg = (props) => {
    const [showAddPre, setShowAddPre] = useState(false);
    const [showAddAfter, setShowAddAfter] = useState(false);

    //生成前序和后序index
    const indexPre = props.index;
    const indexAfter = props.index + 1;

    const propsToPanel = {showAddPre, setShowAddPre, showAddAfter, setShowAddAfter, indexPre, indexAfter};

    //用于控制语句内容的变更
    useEffect(() => {
        // document.getElementById('bg_next' + props.index).checked = props.data.next;
        // document.getElementById('bg_none' + props.index).checked = props.data.noBg;
    })

    //传递变化的结果
    // const updateThis = () => {
    //     runtime.currentSceneSentenceList[props.index].speaker = document.getElementById('speakerInput' + props.index).value;
    //     runtime.currentSceneSentenceList[props.index].content = document.getElementById('contentInput' + props.index).value;
    //     store.set('writeScene', !store.get('writeScene'));
    // }

    const bgCheckBoxNo = (checked) => {
        runtime.currentSceneSentenceList[props.index].noBg = checked;
        store.set('writeScene', !store.get('writeScene'));
    }

    const bgCheckBoxNext = (checked) => {
        runtime.currentSceneSentenceList[props.index].next = checked;
        store.set('writeScene', !store.get('writeScene'));
    }

    const [bgName, setBgName] = useState(props.data.bg);

    const setConstructor = () => {
        return (value) => {
            runtime.currentSceneSentenceList[props.index].bg = value;
            store.set('writeScene', !store.get('writeScene'));
        }
    }

    //语句编辑的UI
    return <div key={props.index + 'bg'} className={styles.sentence}>
        <div className={styles.sentenceIndexShow}>语句{props.index+1}:更改背景</div>
        <ControlPanel data={propsToPanel}/>
        <main>
            <div className={styles.singleOption}>
                关闭背景<span style={{padding: '0 5px 0 0'}}> </span>
                <Switch id={'bg_none' + props.index} onChange={bgCheckBoxNo}/>
                <span style={{padding: '0 0 0 5px'}}>（将关闭背景）</span>
            </div>
            <div className={styles.singleOption}>
                更改背景后继续下一句<span style={{padding: '0 5px 0 0'}}> </span>
                <Switch id={'bg_next' + props.index} checked={props.data.next} onChange={bgCheckBoxNext}/>
            </div>
            <div className={styles.singleOption}>
                背景文件：{bgName}
                <ChooseFile setShow={setBgName} checked={props.data.noBg} id={'vocalPicker'} dir={'background'} set={setConstructor()}/>
            </div>
        </main>

    </div>
}

export default Bg;