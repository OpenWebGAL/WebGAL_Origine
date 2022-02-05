import styles from './management.module.scss'
import {useEffect, useState} from "react";
import store from "../editor/store/editorStore";
import runtime from "../editor/controller/runtime";
import axios from "axios";
import {AddOne, GameTwo} from "@icon-park/react";

const Management = () => {
    const [ref, setRef] = useState(true);
    useEffect(() => {
        store.set('refManagement', ref);
        store.connect('refManagement', () => {
            setRef(store.get('refManagement'))
        }, 'refManagementFunc')
        getGameList();
    }, [])

    const getGameList = () => {
        axios.get(runtime.domain + '/api/manageGame/gameList').then(r => {
            runtime.gameList = r.data;
            store.set('refManagement', !store.get('refManagement'))
        }).catch(e => {
            console.log(e);
        })
    }

    //生成游戏列表，用于使编辑器获得游戏名称
    let showGameList = [];
    for (const e of runtime.gameList) {
        const temp = <div className={styles.singleGameEntryButton} key={e} onClick={() => {
            runtime.currentEditGame = e;
            store.set('isManagement', false);
        }
        }>
            <GameTwo theme="outline" size="24" fill="#333" className={styles.buttonIcon}/>
            {e}
        </div>
        showGameList.push(temp);
    }

    return <div>
        <header>
            <nav>
                <div className={styles.nav}>
                    <div className={styles.title}>
                        WebGAL ORIGINE
                    </div>
                </div>
            </nav>
        </header>
        <main className={styles.main}>
            <div className={styles.subTitle}>
                游戏列表
                <span className={styles.addIcon}><AddOne theme="outline" size="18" fill="#8E354A"/> 新建游戏</span>
            </div>
            <div className={styles.gameList}>
                {showGameList}
            </div>
        </main>
    </div>
}

export default Management;