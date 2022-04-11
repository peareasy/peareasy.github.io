import { useState } from 'react';
import { copy, copied  } from '../UI/icons';


type ButtonProps = {
  value: string;
};

const CopyButton = ({value}: ButtonProps) => {
  const [clicked, setClicked] = useState(false)

  return (
    
      <div className="flex flex-row pt-4 text-center m-auto">
          <span className='mr-1'>{value}</span>
          <button className={clicked ? "cursor-default" : ""} disabled={clicked}
      onClick={() => {
          navigator.clipboard.writeText(value);
          setClicked(true);
    }}
    >
        {clicked ? <span>{copied}</span>: <span>{copy}</span>}
    </button>
    
      </div>
  );
};

export { CopyButton }