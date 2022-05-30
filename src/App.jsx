import {useEffect, useState} from "react";
import Management from "./components/management";
import Editor from "./components/editor";
import '@icon-park/react/styles/index.css';
import store from "./components/editor/store/editorStore";
import './App.css'

function App() {
    const [isManagement, setIsManagement] = useState(true);
    useEffect(() => {
        store.set('isManageMent', true);
        store.connect('isManagement', () => {
            setIsManagement(store.get('isManagement'))
        }, 'setIsManagementFunc');
        // 打印初始log信息
        console.log('WebGAL Origine 1.2.2');
        console.log('Github: https://github.com/MakinoharaShoko/WebGAL ');
        console.log('Made with ❤ by MakinoharaShoko');
    }, []);
    return (
        <div className="App">
            {isManagement && <Management/>}
            {!isManagement && <Editor/>}
        </div>
    )
}

export default App
