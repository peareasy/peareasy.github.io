import { useState } from 'react';
import { copy, copied  } from '../UI/icons';


type ButtonProps = {
  value: string;
};

const CopyButton = ({value}: ButtonProps) => {
  const [clicked, setClicked] = useState(false)
    
  return (
    <button
      onClick={() => {
          navigator.clipboard.writeText(value);
          setClicked(true);
          setTimeout(() => {
              setClicked(false)
          }, 5000)
    }}
    >
      <div className="flex flex-row">
        {clicked ? <span className="mr-2">{copied}</span>: <span className="mr-2">{copy}</span>}
      </div>
    </button>
  );
};

export { CopyButton }