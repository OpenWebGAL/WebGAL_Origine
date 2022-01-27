import styles from './gameConfig.module.scss'
import axios from "axios";
import runtime from "../../../../controller/runtime";
import {useEffect, useState} from "react";

const GameConfig = () => {
    const [gameConfig, setGameConfig] = useState(false);
    //获取到游戏的数据
    const getGameConfig = () => {
        axios.get(`${runtime.domain}/Games/${runtime.currentEditGame}/game/gameConfig.json`).then(r => {
            let newGameConfig = r.data;
            runtime.currentGameConfig = r.data;
            document.getElementById('gameNameInput').value = newGameConfig['Game_name'];
        })
    }
    const setGameName = () => {
        runtime.currentGameConfig['Game_name'] = document.getElementById('gameNameInput').value;
        updateGameConfig();
    }

    const updateGameConfig = () => {
        let data = {
            currentEditGame: runtime.currentEditGame,
            config: runtime.currentGameConfig
        }
        axios.post(`${runtime.domain}/api/manageGame/config`, data).then(r => {
        })
    }

    useEffect(() => {
        getGameConfig();
    }, [])

    return <div>
        <div>
            <div className={styles.title}>
                游戏名称
            </div>
            <div>
                <input onInput={setGameName} id={"gameNameInput"}/>
            </div>
        </div>
    </div>
}

export default GameConfig;