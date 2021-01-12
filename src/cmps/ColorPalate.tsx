import React from 'react'

interface ColorPalateProps {
    onChooseColor(color: string): void

}

export const ColorPalate: React.FC<ColorPalateProps> = ({ onChooseColor }) => {
    const colors = ['#fff475', '#fbbc04', '#f28b82', 'white', '#aecbfa', '#cbf0f8', '#a7ffeb', '#ccff90','#e8eaed','#e6c9a8','#fdcfe8','#d7aefb']
    return (
        <section className="color-palate">
            {colors.map((color, idx) => {
                return (
                        <div  key={color} onClick={() => onChooseColor(color)} className={`color color-${color} cursor-pointer`} style={{ backgroundColor: color }}>
                            
                        </div>
                )
            })}
        </section>

    );
}