import axios from "axios";
import runtime from "../../../../../controller/runtime";

const AddScene = (props) => {

    const add = () => {
        const data = {gameName: runtime.currentEditGame, sceneName: document.getElementById('addSceneName').value}
        axios.post(`${runtime.domain}/api/editGame/addNewScene/`, data).then(r => {
            props.added();
        }).catch(e => {
            console.log(e)
        })
    }

    return <div>
        <input id={'addSceneName'}/>
        <div onClick={add}>新建</div>
    </div>
}

export default AddScene;