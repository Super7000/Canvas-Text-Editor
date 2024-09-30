import React from 'react'

function EditTextBar({ text, onChange = () => { }, onDelete = () => { } }) {
    const handleStyleChange = (style) => onChange({ ...text, [style]: !text[style] });

    return (
        <div className='edit-text-bar'>
            <button onClick={() => handleStyleChange('isBold')} className={text.isBold ? "active" : ''} style={{ fontWeight: 'bold' }}>Bold</button>
            <button onClick={() => handleStyleChange('isItalic')} className={text.isItalic ? "active" : ''} style={{ fontStyle: "italic" }}>Italic</button>
            <button onClick={() => handleStyleChange('isUnderline')} className={text.isUnderline ? "active" : ''} style={{ textDecoration: 'underline' }}>Underline</button>
            <button onClick={() => handleStyleChange('isStrikethrough')} className={text.isStrikethrough ? "active" : ''} style={{ textDecoration: 'line-through' }}>Strike Through</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default EditTextBar