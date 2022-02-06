import runtime from "../../../../controller/runtime";
import store from "../../../../store/editorStore";

const deleteThis = (index) => {
    runtime.currentSceneSentenceList.splice(index, 1);
    store.set('writeScene', !store.get('writeScene'));
}

export {deleteThis};