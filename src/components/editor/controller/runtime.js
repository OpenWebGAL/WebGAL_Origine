const runtimeTemplate = {
    editorTag: '游戏配置',
    domain: 'http://localhost',
    gameList: [],
    currentEditGame: '',
    currentGameConfig: {},
    currentDir: '',
    currentDirContent: [],
    currentEditScene: '',
    currentOpendSceneEdit: [],
    currentSceneSentenceList: []
}

const runtime = JSON.parse(JSON.stringify(runtimeTemplate));

export {runtimeTemplate};
export default runtime;