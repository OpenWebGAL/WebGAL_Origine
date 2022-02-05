import styles from './sceneEditor.module.scss'
import {useEffect, useState} from "react";
import store from "../../../store/editorStore";
import runtime from "../../../controller/runtime";
import axios from "axios";
import Dialog from "./sentence/dialog";

const SceneEditor = (props) => {
    const [updateScene, setUpdateScene] = useState(true);

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

    function createNewSentence(sentenceType) {
        let sentence;
        switch (sentenceType) {
            case 'dialog':
                sentence = {
                    type: sentenceType,
                    speaker: '',
                    content: ''
                }
        }
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


    //开始生成元素
    let showSentenceList = [];
    for (let i = 0; i < runtime.currentSceneSentenceList.length; i++) {
        const sentence = runtime.currentSceneSentenceList[i];
        let temp;
        switch (sentence.type) {
            case 'dialog':
                temp = <Dialog data={sentence} index={i} key={i}/>;
        }
        showSentenceList.push(temp);
    }


    return <div>
        <div className={styles.topButtonList}>
            <div className={styles.topButton} onClick={writeSence}>保存场景</div>
            <div className={styles.topButton} onClick={() => {
                createNewSentence('dialog')
            }}>
                添加语句
            </div>
        </div>
        <div>
            {showSentenceList}
        </div>
    </div>

}

export default SceneEditor;