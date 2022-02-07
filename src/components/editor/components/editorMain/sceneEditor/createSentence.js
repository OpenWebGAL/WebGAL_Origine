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
    }

    return sentence;
}
export default createSentence;