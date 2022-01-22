import {useEffect, useState} from "react";
import Management from "./components/management";
import Editor from "./components/editor";
import '@icon-park/react/styles/index.css';
import store from "./components/editor/store/editorStore";

function App() {
    const [isManagement, setIsManagement] = useState(true);
    useEffect(() => {
        store.set('isManageMent', true);
        store.connect('isManagement', () => {
            setIsManagement(store.get('isManagement'))
        }, 'setIsManagementFunc');
    }, []);
    return (
        <div className="App">
            {isManagement && <Management/>}
            {!isManagement && <Editor/>}
        </div>
    )
}

export default App
