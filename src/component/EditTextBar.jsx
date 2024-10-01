import React from 'react'

function EditTextBar({ text, onChange = () => { }, onDelete = () => { } }) {
    const handleStyleChange = (style) => onChange({ ...text, [style]: !text[style] });

    return (
        <div className='edit-text-bar'>
            <select className='select-option' onChange={(e) => onChange({ ...text, fontFamily: e.target.value })} value={text.fontFamily || 'Arial'}>
                <option value="Arial">Arial</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
            </select>
            <button onClick={() => onChange({ ...text, fontSize: (text.fontSize || 16) + 1 })}>A+</button>
            <button onClick={() => onChange({ ...text, fontSize: (text.fontSize || 16) - 1 })}>A-</button>
            <button onClick={() => handleStyleChange('isBold')} className={text.isBold ? "active" : ''} style={{ fontWeight: 'bold' }}>Bold</button>
            <button onClick={() => handleStyleChange('isItalic')} className={text.isItalic ? "active" : ''} style={{ fontStyle: "italic" }}>Italic</button>
            <button onClick={() => handleStyleChange('isUnderline')} className={text.isUnderline ? "active" : ''} style={{ textDecoration: 'underline' }}>Underline</button>
            <button onClick={() => handleStyleChange('isStrikethrough')} className={text.isStrikethrough ? "active" : ''} style={{ textDecoration: 'line-through' }}>Strike Through</button>
            <button onClick={onDelete} className='danger'>Delete</button>
        </div>
    );
}

export default EditTextBar