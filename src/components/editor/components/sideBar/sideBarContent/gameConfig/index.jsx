import styles from './gameConfig.module.scss'

const GameConfig = () => {
    return <div>
        <div>
            <div className={styles.title}>
                游戏名称
            </div>
            <div>
                <input/>
            </div>
        </div>
        <div>
            <div className={styles.title}>
                标题图片
            </div>
            <div>
                <input/>
            </div>
        </div>
        <div>
            <div className={styles.title}>
                标题背景音乐
            </div>
            <div>
                <input/>
            </div>
        </div>
        <div>
            <div className={styles.title}>
                开屏图片
            </div>
            <div>
                <input/>
            </div>
        </div>
    </div>
}

export default GameConfig;