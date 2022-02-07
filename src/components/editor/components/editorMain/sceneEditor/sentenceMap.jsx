import Dialog from "./sentence/dialog";
import Bg from "./sentence/bg";

const sentenceMap = (sentence,index) => {
    let temp;
    switch (sentence.type) {
        case 'dialog':
            temp = <Dialog data={sentence} index={index} key={index}/>;
            break;
        case 'bg':
            temp = <Bg data={sentence} index={index} key={index}/>;
            break;
    }
    return temp;
}

export default sentenceMap;