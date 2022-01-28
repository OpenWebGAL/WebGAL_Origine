import {useEffect, useState} from "react";
import store from "../../../../store/editorStore";
import runtime from "../../../../controller/runtime";
import styles from './assetsManagement.module.scss'
import axios from "axios";
import {ArrowUp, FolderClose, LeftSmall, Upload, UpSmall} from "@icon-park/react";
import {IconMap, dirMap} from "./DirMap";

const AssetsManagement = () => {
    const [refAssetsManagement, setRefAssetsManagement] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    useEffect(() => {
        store.set('refAssetsManagement', refAssetsManagement);
        store.connect('refAssetsManagement', () => {
            setRefAssetsManagement(store.get('refAssetsManagement'))
        }, 'refAssetsManagement');
        getCurrentDir();
    }, []);
    const getCurrentDir = () => {
        const gameName = runtime.currentEditGame;
        //当前目录。如果当前目录为空，就代表现在是根目录，因此不显示单独的文件，只显示目录
        const currentDir = runtime.currentDir;
        const data = {'dir': `/${gameName}/game/${currentDir}`};
        axios.post(`${runtime.domain}/api/editGame/getAssets/`, data).then(r => {
            runtime.currentDirContent = r.data;
            store.set('refAssetsManagement', !store.get('refAssetsManagement'));
        }).catch(e => {
            console.log(e)
        })
    }
    const back = () => {
        if (runtime.currentDir === '')
            return;
        let dirStrToList = runtime.currentDir.split('/');
        dirStrToList.pop();
        runtime.currentDir = dirStrToList.reduce((pre, cur) => '' + pre + '/' + cur);
        getCurrentDir();
    }

    const cd = (dir) => {
        runtime.currentDir = runtime.currentDir + `/${dir}`;
        getCurrentDir();
    }

    const uploadFile = () => {
        //获得要上传文件的目录
        const gameName = runtime.currentEditGame;
        //当前目录。如果当前目录为空，就代表现在是根目录，因此不显示单独的文件，只显示目录
        const currentDir = runtime.currentDir;
        const dir = `/${gameName}/game/${currentDir}`;
        let form = new FormData();
        form.append('dir', dir);
        const file = document.getElementById('uploadFile').files[0];
        let fileName = document.getElementById('uploadFile').value;
        form.append('file', file, fileName);
        axios.post(`${runtime.domain}/api/editGame/addAsset/`, form, {headers: {'Content-Type': 'multipart/form-data'}}).then(r => {
            setShowUpload(false);
            getCurrentDir();
        })
    }

    const switchUpload = () => {
        setShowUpload(!showUpload);
    }

    //开始显示当前目录里的内容
    const showDirContent = [];
    for (const currentDirContentElement of runtime.currentDirContent) {
        let temp = '';
        let pushIntoSirContent = true;
        //首先判断是不是目录
        if (!currentDirContentElement.match(/\./)) {

            //是目录，按照目录的方式处理
            temp = <div className={styles.dirButton} key={currentDirContentElement}
                        onClick={() => cd(currentDirContentElement)}>
                <span className={styles.icon_small}><IconMap icon={currentDirContentElement}/></span>
                {dirMap[currentDirContentElement]}
            </div>
            if (currentDirContentElement === 'scene' && runtime.currentDir === '')
                pushIntoSirContent = false;//场景文件不算做资源，有专门的处理方案
        } else {
            //是文件，按照文件的方式处理
            if (runtime.currentDir === '')
                pushIntoSirContent = false;//如果是根目录，那么就不显示文件
            //不是根目录，现在正常处理文件
            temp = <div key={currentDirContentElement}>{currentDirContentElement}</div>
        }

        // 处理元素完毕，将其加入文件资源管理器显示的内容
        if (pushIntoSirContent)
            showDirContent.push(temp);
    }

    return <div>
        <div>
            素材管理
        </div>
        {
            runtime.currentDir !== '' && <div className={styles.controlPanel}>
                <div onClick={back}>
                    <ArrowUp theme="outline" size="30" fill="#333"/>
                </div>
                <div onClick={switchUpload}>
                    <Upload theme="outline" size="30" fill="#333"/>
                </div>
            </div>
        }
        {
            showUpload && <div className={styles.upload}>
                上传文件<br/>
                <input id={'uploadFile'} type={'file'}/>
                <div onClick={uploadFile}>上传</div>
            </div>
        }
        <div>
        </div>
        <div className={styles.dirButtonContainer}>
            {showDirContent}
        </div>
    </div>
}

export default AssetsManagement;