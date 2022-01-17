import {useEffect, useState} from "react";
import store from "./store/editorStore";
import TopBar from "./components/topBar";

const Editor = () => {
    const [editorStatus, setEditorStatus] = useState(true);
    useEffect(() => {
        store.connect('updateEditor',
            () => {
                setEditorStatus(store.get('updateEditor'))
            },
            'ForceUpdate');
    }, [])
    return <div>
        <TopBar/>
    </div>
}

export default Editor;