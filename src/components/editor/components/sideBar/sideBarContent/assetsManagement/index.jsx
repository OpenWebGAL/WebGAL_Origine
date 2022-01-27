import styles from './assetsManagement.module.scss'
import {useEffect, useState} from "react";
import store from "../../../../store/editorStore";
import runtime from "../../../../controller/runtime";
import axios from "axios";

const AssetsManagement = () => {
    const [refAssetsManagement, setRefAssetsManagement] = useState(true);
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

    //开始显示当前目录里的内容
    const showDirContent = [];
    for (const currentDirContentElement of runtime.currentDirContent) {
        let temp = '';
        let pushIntoSirContent = true;
        //首先判断是不是目录
        if (!currentDirContentElement.match(/\./)) {
            //是目录，按照目录的方式处理
            temp = <div>{currentDirContentElement}</div>

        } else {
            //是文件，按照文件的方式处理
            if (runtime.currentDir === '')
                pushIntoSirContent = false;//如果是更目录，那么就不显示文件

            //不是根目录，现在正常处理文件
        }

        // 处理元素完毕，将其加入文件资源管理器显示的内容
        if (pushIntoSirContent)
            showDirContent.push(temp);
    }

    return <div>
        素材管理
        <div>
            {showDirContent}
        </div>
    </div>
}

export default AssetsManagement;