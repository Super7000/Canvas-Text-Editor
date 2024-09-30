import React, { useEffect, useState } from 'react'
import '../styles/TextEditor.css'
import TextCanvas from './TextCanvas';

function TextEditor() {
    const [history, setHistory] = useState([[]])
    const [historyIndex, setHistoryIndex] = useState(0)
    const [texts, setTexts] = useState([]);
    const [selectedText, setSelectedText] = useState()

    function undo() {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setTexts(history[historyIndex - 1]);
        }
    };

    function redo() {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setTexts(history[historyIndex + 1]);
        }
    };

    function updateHistory(newTexts) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newTexts);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setTexts(newTexts)
    }

    return (
        <>
            <UndoRedoBtns onUndo={undo} onRedo={redo} />
            <AddText onAddText={text => {
                let newTexts = [...texts, {
                    id: Date.now(),
                    content: text,
                    x: 10,
                    y: texts.length * 16 + 10,
                    fontSize: 16,
                    isBold: false,
                    isItalic: false,
                    isUnderline: false,
                    isStrikethrough: false,
                }]
                setTexts(newTexts)
                updateHistory(newTexts)
            }} />
            <TextCanvas texts={texts} onChange={newTexts => updateHistory(newTexts)} onSelectText={text => setSelectedText(text)} />
            
        </>
    )
}

function AddText({ onAddText }) {
    const [text, setText] = useState('');

    return (
        <div className='add-text-container'>
            <input type="text" placeholder="Add Text" value={text} onChange={e => setText(e.target.value)} className='text-input' />
            <button onClick={() => {
                if (text.trim() === '') return;
                onAddText(text.trim())
                setText('')
            }}>Add</button>
        </div>
    )
}

function UndoRedoBtns({ onUndo, onRedo }) {
    return (
        <div className='undo-redo-container'>
            <button onClick={onUndo}>Undo</button>
            <button onClick={onRedo}>Redo</button>
        </div>
    )
}

export default TextEditor