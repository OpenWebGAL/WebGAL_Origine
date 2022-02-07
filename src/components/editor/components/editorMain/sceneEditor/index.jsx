import styles from './sceneEditor.module.scss'
import {useEffect, useState} from "react";
import store from "../../../store/editorStore";
import runtime from "../../../controller/runtime";
import axios from "axios";
import {Avatar, Change, Comment, FileMusic, Pic, SplitTurnDownRight, Video} from "@icon-park/react";
import createSentence from "./createSentence";
import sentenceMap from "./sentenceMap";
import 'antd/dist/antd.css';

const SceneEditor = (props) => {
    const [updateScene, setUpdateScene] = useState(true);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        //这个钩子仅用于更新场景（基础钩子）
        store.set('updateScene', updateScene);
        store.connect('updateScene', () => {
            setUpdateScene(store.get('updateScene'));
        }, 'updateSceneFunc');
        //这个钩子用来从文件获取最新的场景文件并更新场景
        store.set('refScene', true);
        store.connect('refScene', () => {
            updateSceneFromFile();
        }, 'refSceneFunc');
        //这个钩子用来写入并更新场景
        store.set('writeScene', true);
        store.connect('writeScene', () => {
            writeSence();
        }, 'writeSceneFunc');
        updateSceneFromFile();
    }, []);


    //开始生成元素
    let showSentenceList = [];
    const showSentenceGenerateArray = JSON.parse(JSON.stringify(runtime.currentSceneSentenceList));
    for (let i = 0; i < showSentenceGenerateArray.length; i++) {
        const sentence = showSentenceGenerateArray[i];
        const temp = sentenceMap(sentence,i);
        showSentenceList.push(temp);
    }

    const showAddSentence = <div className={styles.addSentencePanel}>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('dialog')
        }}><Comment theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>添加对话
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('dialog')
        }}><Avatar theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>切换立绘
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('dialog')
        }}><Pic theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>切换背景
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('dialog')
        }}><Change theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>场景跳转
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('dialog')
        }}><SplitTurnDownRight theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>分支选择
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('dialog')
        }}><FileMusic theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>背景音乐
        </div>
        <div className={styles.addSentenceButton} onClick={() => {
            createNewSentence('dialog')
        }}><Video theme="outline" size='18' fill="#333" style={{padding: '0 5px 0 0'}}/>插入视频
        </div>
    </div>


    return <div>
        <div className={styles.topButtonList}>
            <div className={styles.topButton} onClick={writeSence}>保存场景</div>
            <div className={styles.topButton} onClick={() => {
                setShowAdd(!showAdd);
            }}>
                添加语句
            </div>
            <div>{showAdd && showAddSentence}</div>
        </div>
        <div className={styles.sentenceList}>
            {showSentenceList}
        </div>
    </div>

}


function updateSceneFromFile() {
    //读取Scene的数据
    let sceneName = runtime.currentEditScene;
    if (sceneName === '') {
        sceneName = props.sceneName;
    }
    if (sceneName === '')
        return;
    const url = `${runtime.domain}/Games/${runtime.currentEditGame}/game/scene/${sceneName}`;
    axios.get(url,).then(r => {
        runtime.currentSceneSentenceList = r.data;
        store.set('updateScene', !store.get('updateScene'));
    }).catch(e => console.log(e))
}

function createNewSentence(sentenceType, index) {
    const sentence = createSentence(sentenceType);
    if (index !== undefined) {
        runtime.currentSceneSentenceList.splice(index, 0, sentence);
    } else
        runtime.currentSceneSentenceList.push(sentence);
    writeSence();
}

function writeSence() {
    const url = `${runtime.domain}/api/editGame/editScene/`;
    const data = {
        gameName: runtime.currentEditGame,
        sceneName: runtime.currentEditScene,
        sceneData: runtime.currentSceneSentenceList
    };
    axios.post(url, data).then(r => {
            updateSceneFromFile();
        }
    ).catch(e => console.log(e));
}

export {updateSceneFromFile, createNewSentence, writeSence}

export default SceneEditor;