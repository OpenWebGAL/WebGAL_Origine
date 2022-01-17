import styles from './sideBar.module.scss'

const SideBar = () => {
    return <aside className={styles.aside}>
        <div className={styles.option}>
            <div>
                <div>添加语句</div>
                <div className={styles.optionMarker}/>
            </div>
            <div>
                <div>素材管理</div>
                <div/>
            </div>
            <div>
                <div>场景管理</div>
                <div/>
            </div>
        </div>
        <div className={styles.chooseBox}>
            <div className={styles.chooseItem}>
                <div className={styles.chooseTitle}>人物对话</div>
                <div className={styles.chooseDescription}>添加一条基本的人物对话</div>
            </div>
        </div>
        <div className={styles.chooseBox}>
            <div className={styles.chooseItem}>
                <div className={styles.chooseTitle}>人物立绘</div>
                <div className={styles.chooseDescription}>添加或改变人物立绘的展示</div>
            </div>
        </div>
        <div className={styles.chooseBox}>
            <div className={styles.chooseItem}>
                <div className={styles.chooseTitle}>背景音乐</div>
                <div className={styles.chooseDescription}>控制背景音乐的播放与停止</div>
            </div>
        </div>
    </aside>
}

export default SideBar;
