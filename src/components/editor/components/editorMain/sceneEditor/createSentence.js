const createSentence = (sentenceType) => {
    let sentence;
    switch (sentenceType) {
        case 'dialog':
            sentence = {
                type: sentenceType,
                speaker: '',
                content: '',
                vocal: '',
                ignoreSpeaker: false
            }
            break;
        case 'bg':
            sentence = {
                type: sentenceType,
                bg: '',
                noBg: false,
                next: false
            }
            break;
        case 'bgm':
            sentence = {
                type:sentenceType,
                bgm:'',
                noBgm:false
            }
            break;
        case 'changeScene':
            sentence = {
                type:sentenceType,
                newScene:'',
            }
            break;
        case 'video':
            sentence = {
                type:sentenceType,
                video:'',
            }
    }

    return sentence;
}
export default createSentence;