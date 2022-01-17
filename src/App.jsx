import {useState} from "react";
import Management from "./components/management";
import Editor from "./components/editor";
import '@icon-park/react/styles/index.css';

function App() {
    const [isManagement,setIsManagement] = useState(false);
    return (
        <div className="App">
            {isManagement&&<Management/>}
            {!isManagement&&<Editor/>}
        </div>
    )
}

export default App
