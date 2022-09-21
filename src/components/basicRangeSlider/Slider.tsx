import {  useState } from 'react';

interface BasicRangeSliderProps {
  changeData?: any;
  id: string;
  min: number;
  max: number;
  skip: number;
  title: string;
  unit?: string;
}

export default function BasicRangeSlider({ changeData, id, min, max, skip, title, unit } : BasicRangeSliderProps){
  const [value, setValue] = useState(0);

  function setValueAndInputData(e: number ){
    changeData(id,e)
    setValue(e)
  }

  return(
    <div 
      id={id}
      className="flex flex-col max-w-lg w-full mx-auto mb-10"
    >
      <div className="flex flex-row justify-between">
        <p>{title}</p>
        <p>{value + " " + unit}</p>
      </div>
      <div className="flex w-full mt-6 justify-between">
        <button 
          className="w-8 h-8 rounded-full border-2 border-black"
          onClick={() => (value >= min + skip && setValueAndInputData(value - skip))}
        > 
          - 
        </button>
        <div className="flex relative w-4/5 items-center">
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            className="thumb z-[3] w-full"
            onChange={(e) => setValueAndInputData(parseInt(e.target.value))}
          />
          <div className="relative w-full">
            <div 
              className="w-full absolute h-1.5 z-[1] rounded-sm bg-blue-200"
            ></div>
          </div>
        </div>
        <button 
          className="w-8 h-8 rounded-full border-2 border-black"
          onClick={() => (value <= max - skip && setValueAndInputData(value + skip))}
          > 
            +
          </button>
      </div>
    </div>
  )
}