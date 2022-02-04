import styles from './sideBar.module.scss'
import {useEffect, useState} from "react";
import runtime from "../../controller/runtime";
import store from "../../store/editorStore";
import GameConfig from "./sideBarContent/gameConfig";
import AssetsManagement from "./sideBarContent/assetsManagement";
import SceneManagement from "./sideBarContent/sceneManagement";

const SideBar = () => {
    const sideBarItem = ['游戏配置', '素材管理', '场景管理'];
    const [ref, setRef] = useState(false);
    useEffect(() => {
        store.set('refSideBar', ref);
        store.connect('refSideBar', () => {
            setRef(store.get('refSideBar'))
        }, 'refSideBarFunc')
    }, [])
    const showOption = [];
    //生成选择侧边栏Tag的界面
    for (const e of sideBarItem) {
        let optionMarker;
        if (e === runtime.editorTag) {
            optionMarker = <div className={styles.optionMarker}/>;
        } else {
            optionMarker = <div/>;
        }
        const temp = <div key={e} className={e=== runtime.editorTag?styles.tagButtonOn:styles.tagButton} onClick={() => {
            runtime.editorTag = e;
            store.set('refSideBar', !store.get('refSideBar'));
        }}>
            <div>{e}</div>
            {optionMarker}
        </div>
        showOption.push(temp);
    }
    //生成Content界面
    let sideBarConetnt;
    switch (runtime.editorTag){
        case "游戏配置":
            sideBarConetnt = <GameConfig/>;
            break;
        case "素材管理":
            sideBarConetnt = <AssetsManagement/>;
            break;
        case "场景管理":
            sideBarConetnt = <SceneManagement/>;
            break;
    }


    return <aside className={styles.aside}>
        <div className={styles.option}>
            {showOption}
        </div>
        <div className={styles.sideBarContent}>
            {sideBarConetnt}
        </div>
    </aside>
}

export default SideBar;
