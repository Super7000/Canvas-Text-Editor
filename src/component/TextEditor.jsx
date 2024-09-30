import React, { useEffect, useState } from 'react'
import '../styles/TextEditor.css'
import TextCanvas from './TextCanvas';
import EditTextBar from './EditTextBar';

function TextEditor() {
    const [history, setHistory] = useState([[]])
    const [historyIndex, setHistoryIndex] = useState(0)
    const [texts, setTexts] = useState([]);
    const [selectedText, setSelectedText] = useState(null)

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
            <TextCanvas texts={texts} onChange={newTexts => updateHistory(newTexts)} onSelectText={text => setSelectedText(text)} onDeselectText={() => setSelectedText(null)} />
            {selectedText && <EditTextBar
                text={selectedText}
                onChange={text => {
                    let newTexts = texts.map(e => e.id === text.id ? text : e);
                    setTexts(newTexts)
                    setSelectedText(text)
                    updateHistory(newTexts)
                }}
                onDelete={() => {
                    let newTexts = texts.filter(e => e.id !== selectedText.id);
                    setTexts(newTexts)
                    setSelectedText(null)
                    updateHistory(newTexts)
                }} />}
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