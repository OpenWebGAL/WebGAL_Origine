import styles from './sceneEditor.module.scss'
import {Avatar, Change, Comment, FileMusic, Pic, SplitTurnDownRight, Video} from "@icon-park/react";
import {createNewSentence} from "./index";

const AddSentenceByIndex = (props) => {
    return <div className={styles.addSentencePanel}>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('dialog',props.index)
        }}><Comment theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>添加对话
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('changeP',props.index)
        }}><Avatar theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>切换立绘
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('bg',props.index)
        }}><Pic theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>切换背景
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('changeScene',props.index)
        }}><Change theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>场景跳转
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('choose',props.index)
        }}><SplitTurnDownRight theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>分支选择
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('bgm',props.index)
        }}><FileMusic theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>背景音乐
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('video',props.index)
        }}><Video theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>插入视频
        </div>
    </div>
}

export default AddSentenceByIndex;