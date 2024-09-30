import React, { useState, useRef, useMemo } from 'react';

const Draggable = ({ positions, onPositionUpdate = () => { }, onSelect = () => { }, children }) => {
    const [position, setPosition] = useState({ x: positions.x, y: positions.y });
    const [isDragging, setIsDragging] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const dragRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);

        dragRef.current = {
            startX: e.clientX - position.x,
            startY: e.clientY - position.y,
        };
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const newX = e.clientX - dragRef.current.startX;
        const newY = e.clientY - dragRef.current.startY;

        setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (positions.x === position.x && positions.y === position.y) return
        onPositionUpdate(position)
    };

    useMemo(() => {
        setPosition({
            x: positions.x,
            y: positions.y
        })
    }, [positions])

    return (
        <span
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                padding: '0.5rem',
                backgroundColor: isDragging ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)',
                borderRadius: '4px',
                userSelect: 'none',
                border: isSelected ? '1px solid dodgerblue' : 'none'
            }}
            onClick={() => {
                setIsSelected(val => !val)
                if (isSelected === false)
                    onSelect()
            }}
        >
            {children}
        </span>
    );
};

export default Draggable;
