import React, { useState } from 'react';
import { copy, copied  } from './icons';
import styles from "./Copy.module.css"

type ButtonProps = {
  value: string;
};

const CopyButton = ({value}: ButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const [showCopied, setShowCopied] = useState(true);

  return (
      <div className="flex flex-row text-center m-auto">
          <span className='mr-1'>{value}</span>
          <button className={clicked ? "cursor-default" : ""} disabled={clicked}
      onClick={() => {
          navigator.clipboard.writeText(value);
          setClicked(true);
          setTimeout(() => setShowCopied(false), 3000)
    }}
    >
        {
            clicked ?
            <div className={styles.tooltip}>
                {showCopied ? <span className={styles.tooltiptext}>Copied!</span> : <div/>}
                <span>{copied}</span>
            </div>
                :
            <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>Copy</span>
                <span>{copy}</span>
            </div>
        }
    </button>
    
      </div>
  );
};

export { CopyButton }
