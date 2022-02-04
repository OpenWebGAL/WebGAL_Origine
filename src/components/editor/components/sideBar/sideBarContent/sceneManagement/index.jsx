import {useEffect, useState} from "react";
import axios from "axios";
import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";
import AddScene from "./addScene";

const SceneManagement = () => {
    const [sceneList, setSceneList] = useState([]);
    const [showAddScene, setShowAddScene] = useState(false);
    const getSceneList = () => {
        const gameName = runtime.currentEditGame;
        //当前目录。如果当前目录为空，就代表现在是根目录，因此不显示单独的文件，只显示目录
        const currentDir = 'scene';
        const data = {'dir': `/${gameName}/game/${currentDir}`};
        axios.post(`${runtime.domain}/api/editGame/getAssets/`, data).then(r => {
            setSceneList(r.data);
        }).catch(e => {
            console.log(e)
        })
    }

    const addedNewScene = () => {
        getSceneList();
        setShowAddScene(!showAddScene);
    }

    useEffect(() => {
        getSceneList();
    }, [])

    const openSceneEdit = (sceneName) => {
        //首先先查这个Scene有没有被打开
        const isSceneOpened = runtime.currentOpendSceneEdit.includes(sceneName);
        if (isSceneOpened) {
            //什么也不做
        } else {
            runtime.currentOpendSceneEdit.push(sceneName);
        }
        //改变当前编辑的Scene
        runtime.currentEditScene = sceneName;
        store.set('updateEditor', !store.get('updateEditor'));//通知编辑器更新到最新的环境;
        console.log(runtime);
    }

    //用获得的sceneList生成场景列表
    const showSceneList = [];
    for (const e of sceneList) {
        let showThis = false;
        let splitE = e.split('.');
        //检测是不是json场景文件
        if (splitE[splitE.length - 1] === 'json') {
            showThis = true;
        }
        const temp = <div key={e} onClick={() => openSceneEdit(e)}>{e}</div>
        if (showThis)
            showSceneList.push(temp);
    }


    return <div>
        <div>场景管理</div>
        <div onClick={() => {
            setShowAddScene(!showAddScene);
        }}>
            新建场景
        </div>
        <div>
            {showAddScene && <AddScene added={addedNewScene}/>}
        </div>
        <div>
            {showSceneList}
        </div>
    </div>
}
export default SceneManagement
;