import React, { useState, useRef, useEffect, useCallback } from 'react';

const Draggable = ({ canvas, positions, onPositionUpdate = () => { }, onSelect = () => { }, onDeselect = () => { }, children }) => {
    const [position, setPosition] = useState({ x: positions.x, y: positions.y });
    const [isDragging, setIsDragging] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const dragRef = useRef(null);

    const handleMouseDown = useCallback((e) => {
        setIsDragging(true);
        dragRef.current = {
            startX: e.clientX - position.x,
            startY: e.clientY - position.y,
        };
    }, [position]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;

        const newX = e.clientX - dragRef.current.startX;
        const newY = e.clientY - dragRef.current.startY;

        // Boundary checks
        const canvasRect = canvas.getBoundingClientRect();
        if (newX < 0 || newY < 0 || newX > canvasRect.width || newY > canvasRect.height) {
            return;
        }

        setPosition({ x: newX, y: newY });
    }, [isDragging, canvas]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        if (positions.x !== position.x || positions.y !== position.y) {
            onPositionUpdate(position);
        }
    }, [positions, position, onPositionUpdate]);

    useEffect(() => {
        setPosition({ x: positions.x, y: positions.y });
    }, [positions]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleMouseMove);
            document.addEventListener('touchend', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleClick = useCallback(() => {
        setIsSelected((prev) => !prev);
        if (!isSelected) {
            onSelect();
        } else {
            onDeselect();
        }
    }, [isSelected, onSelect, onDeselect]);

    return (
        <span
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
                padding: '0.5rem',
                backgroundColor: isDragging ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)',
                borderRadius: '4px',
                userSelect: 'none',
                border: isSelected ? '1px solid dodgerblue' : 'none',
            }}
        >
            {children}
        </span>
    );
};

export default Draggable;
