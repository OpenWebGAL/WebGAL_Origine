import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import {useEffect, useState} from "react";
import styles from './sentence.module.scss'
import ControlPanel from "./controlPanel";
import {Switch} from "antd";
import ChooseFile from "../../../chooseFile";
import { Select } from 'antd';
const { Option } = Select;

const ChangeP = (props) => {
    const [showAddPre, setShowAddPre] = useState(false);
    const [showAddAfter, setShowAddAfter] = useState(false);

    //生成前序和后序index
    const indexPre = props.index;
    const indexAfter = props.index + 1;

    const propsToPanel = {showAddPre,setShowAddPre,showAddAfter,setShowAddAfter,indexPre,indexAfter};

    //用于控制语句内容的变更
    useEffect(() => {
    })

    //传递变化的结果
    const updateThis = () => {
    }

    const changePnoneCheckBoxUpdate = (checked)=>{
        runtime.currentSceneSentenceList[props.index].noP = checked;
        store.set('writeScene', !store.get('writeScene'));
    }

    const changePnextCheckBoxUpdate = (checked)=>{
        runtime.currentSceneSentenceList[props.index].next = checked;
        store.set('writeScene', !store.get('writeScene'));
    }

    const [pName,setPName]= useState(props.data.newP);

    const setConstructor = () => {
        return (value) => {
            runtime.currentSceneSentenceList[props.index].newP = value;
            store.set('writeScene', !store.get('writeScene'));
        }
    }

    const changeP_pos = (value)=>{
        runtime.currentSceneSentenceList[props.index].pos = value;
        store.set('writeScene', !store.get('writeScene'));
    }

    //语句编辑的UI
    return <div key={props.index + 'dialog'} className={styles.sentence}>
        <div className={styles.topContainer}>
            <div className={styles.sentenceIndexShow}>#{props.index+1} 切换立绘</div>
            <ControlPanel index={props.index} data={propsToPanel}/>
        </div>
        <main>
            <div className={styles.singleOption}>
                <span className={styles.optionTitle}>关闭立绘</span>
                <span className={styles.optionContent}><Switch id={'p_none'} checked={props.data.noP} onChange={changePnoneCheckBoxUpdate} /></span>
                <span className={styles.optionContent}>（将关闭立绘）</span>
                <span className={styles.optionTitle}>立绘位置</span>
                <Select defaultValue={props.data.pos} style={{ width: 120 }} onChange={changeP_pos}>
                    <Option value="left">左</Option>
                    <Option value="">中</Option>
                    <Option value="right">右</Option>
                </Select>
                <span className={styles.optionContent}>（改变立绘的位置）</span>
                <span className={styles.optionTitle}>切换后执行下一条语句</span>
                <Switch id={'p_none'} checked={props.data.next} onChange={changePnextCheckBoxUpdate} />
            </div>
            <div className={styles.singleOption}>
                <span className={styles.optionTitle}>立绘文件</span>
                <ChooseFile setShow={setPName} id={'pPicker'} dir={'figure'} set={setConstructor()}/>
                <span className={styles.optionContent}>{pName}</span>
            </div>
        </main>

    </div>
}

export default ChangeP;