import runtime from "../../controller/runtime";

const recordScroll = () => {
    const currentSceneName = runtime.currentEditScene;
    console.log(currentSceneName);
    if (currentSceneName !== '') {
        const sc = document.getElementById('currentSentenceList').scrollTop;
        runtime.sceneScrollTop[runtime.currentEditScene] = sc;
        console.log('record!');
        console.log(sc);
    }
}

export default recordScroll;