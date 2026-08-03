import type { CardColor } from '../../types/CardData';
import { ALL_COLORS, COLOR_MAP } from './colors';
import './ColorSelector.css';
 
interface Props {
    selected: CardColor[];
 
    setSelected: (colors: CardColor[]) => void;
}
 
export default function ColorSelector({ selected, setSelected }: Props) {
    function toggle(color: CardColor) {
        if (selected.includes(color)) {
            if (selected.length === 1) return;
 
            setSelected(selected.filter(c => c !== color));
        } else {
            setSelected([...selected, color]);
        }
    }
 
    return (
        <div>
            <h3>Colors</h3>
 
            <div className='color-selector'>
                {ALL_COLORS.map(color => (
                    <button
                        key={color}
                        className={
                            selected.includes(color)
                                ? 'color-dot selected'
                                : 'color-dot'
                        }
                        style={{
                            backgroundColor: COLOR_MAP[color],
                        }}
                        onClick={() => toggle(color)}
                    ></button>
                ))}
            </div>
        </div>
    );
}