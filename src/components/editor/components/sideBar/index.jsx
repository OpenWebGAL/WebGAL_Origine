import styles from './sideBar.module.scss'
import {useEffect, useState} from "react";
import runtime from "../../controller/runtime";
import store from "../../store/editorStore";
import GameConfig from "./sideBarContent/gameConfig";
import AssetsManagement from "./sideBarContent/assetsManagement";
import SceneManagement from "./sideBarContent/sceneManagement";
import {Refresh} from "@icon-park/react";
import {Switch} from 'antd';

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
            optionMarker = <div className={styles.optionMarkerOff}/>;
        }
        const temp = <div key={e}
                          className={e === runtime.editorTag ? styles.tagButton + ' ' + styles.tagButtonOn : styles.tagButton}
                          onClick={() => {
                              runtime.editorTag = e;
                              store.set('refSideBar', !store.get('refSideBar'));
                          }}>
            <div>{e}</div>
            {/*{optionMarker}*/}
        </div>
        showOption.push(temp);
    }
    //生成Content界面
    let sideBarConetnt;
    switch (runtime.editorTag) {
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

    function onRPFchange(checked) {
        runtime.isRealtimeRefreashPreview = checked;
    }

    function refreashIframe() {
        const frame1 = document.getElementById('gamePreviewIframe');
        frame1.src = '';
        frame1.src = `${runtime.domain}/Games/${runtime.currentEditGame}`;
    }

    return <aside className={styles.aside}>
        <div className={styles.asidePreviewControlBar}>
            <div className={styles.asidePreviewControlBar_single}>
                <span style={{fontSize: 'large', fontWeight: 'bold', color: '#8E354A'}}>游戏预览</span>
            </div>
            <div id={'refPreviewButton'} className={styles.asidePreviewControlBar_button} onClick={refreashIframe}>
                <Refresh style={{
                    transform: 'translate(0,0)', margin: '0 3px 0 0 '
                }} theme="outline" size="16" fill="#000" strokeWidth={3}/>刷新
            </div>
            <div className={styles.asidePreviewControlBar_single}>
                实时更新<span style={{margin: '0 10px 0 0 '}}/>
                <Switch defaultChecked onChange={onRPFchange} size={'small'}/>
            </div>
        </div>
        <iframe id={'gamePreviewIframe'} frameBorder={'0'} className={styles.previewWindow}
                src={`${runtime.domain}/Games/${runtime.currentEditGame}`}/>
        <div className={styles.sideBarMain}>
            <div className={styles.option}>
                {showOption}
            </div>
            <div className={styles.sideBarContent}>
                {sideBarConetnt}
            </div>
        </div>
    </aside>
}

export default SideBar;
