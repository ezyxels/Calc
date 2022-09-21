import { ChangeEvent,  useCallback, useEffect, useState, useRef } from 'react';
import './slider.css';

interface MultiRangeSliderProps {
  changeData?: any;
  id?: string;
  min: number;
  max: number;
  title: string;
  unit?: string;
}

export default function MultiRangeSlider({ changeData, id, min, max, title, unit } : MultiRangeSliderProps){
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null); 

  // Convert to percentage
  const getPercent = useCallback((value: number) =>
    Math.round(((value - min) / (max - min)) * 100), [min, max])

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div 
      id={id}
      className="flex flex-col max-w-lg w-full mx-auto mb-10"
    >
      <div className="flex flex-row justify-between">
        <p>{title}</p>
        <p>{minValRef.current + " - " + maxValRef.current + " " + unit}</p>
      </div>
      <div className="flex w-full mt-6 relative">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => { 
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
            changeData(id, event.target.value, maxValRef.current);
          }}
          className="thumb z-[3] w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {  
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
            changeData(id, minValRef.current, event.target.value);
          }}
          className="thumb z-[4] w-full"
        />

        <div className="relative w-full">
          <div 
            className="slider__track w-full absolute h-1.5 z-[1] rounded-sm bg-blue-200"
          ></div>
          <div 
            ref={range} 
            className="slider__range absolute h-1.5 z-[2] rounded-sm bg-pink-500"
          ></div>
        </div>
      </div>
    </div>
  );
};

