import React, { useRef } from "react";
import Draggable from "./Dragable";

function TextCanvas({ texts = [], onChange = () => { }, onSelectText = () => { }, onDeselectText = () => { } }) {
    const canvas = useRef(null);

    return (
        <div className='text-canvas' ref={canvas}>
            <div style={{ position: 'relative' }}>
                {
                    texts.map(text => (
                        <Text
                            key={text.id}
                            canvas={canvas.current}
                            text={text}
                            onTextMove={(newText) => {
                                let newTexts = texts.map(e => e.id === newText.id ? newText : e);
                                console.log(newTexts)
                                onChange(newTexts)
                            }}
                            onSelect={text => onSelectText(text)}
                            onDeselect={text => onDeselectText(text)} />
                    ))
                }
            </div>
        </div>
    )
}

function Text({ canvas, text, onTextMove, onSelect = () => { }, onDeselect = () => { } }) {
    return (
        <Draggable
            canvas={canvas}
            positions={{ x: text.x, y: text.y }}
            onPositionUpdate={(newPositions) => onTextMove({ ...text, x: newPositions.x, y: newPositions.y })}
            onSelect={() => onSelect(text)}
            onDeselect={() => onDeselect(text)}
        >
            <span className='text' style={{
                fontFamily: text.fontFamily,
                fontSize: text.fontSize,
                fontWeight: text.isBold ? 'bold' : 'normal',
                fontStyle: text.isItalic ? 'italic' : 'normal',
                textDecoration: `${text.isUnderline ? 'underline' : ''} ${text.isStrikethrough ? 'line-through' : ''}`,
            }}>
                {text.content}
            </span>
        </Draggable>
    )
}

export default TextCanvas