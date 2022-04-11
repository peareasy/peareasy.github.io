import { useState } from 'react';
import { copy, copied  } from '../UI/icons';


type ButtonProps = {
  value: string;
};

const CopyButton = ({value}: ButtonProps) => {
  const [clicked, setClicked] = useState(false)

  return (
    <button className={clicked ? "cursor-default" : ""} disabled={clicked}
      onClick={() => {
          navigator.clipboard.writeText(value);
          setClicked(true);
          setTimeout(() => {
              setClicked(false)
          }, 7000)
    }}
    >
      <div className="flex flex-row">
        {clicked ? <span className="mr-2">{copied}</span>: <span className="mr-2">{copy}</span>}
      </div>
    </button>
  );
};

export { CopyButton }