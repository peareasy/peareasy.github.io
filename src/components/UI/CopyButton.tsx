import React, { useState } from 'react';
import { copy, copied  } from './icons';
import styles from "./Tooltip.module.css"

type ButtonProps = {
  value: string;
};

const CopyButton = ({value}: ButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const [showCopied, setShowCopied] = useState(true);

  return (
      <div className="flex flex-row text-center m-auto">
          <span className='text-xs xl:text-base mr-1'>{value}</span>
          <button className={clicked ? "cursor-default" : ""} disabled={clicked}
      onClick={() => {
          navigator.clipboard.writeText(value);
          setClicked(true);
          setTimeout(() => setShowCopied(false), 3000)
    }}
    >
        {
            clicked ?
              <span className='md:hidden'>
                  <div className={styles.tooltip}>
                      {showCopied ? <span className={styles.tooltiptext}>Copied!</span> : <div/>}
                      <span className='md:hidden'>{copied}</span>
                  </div>
                </span>
                :
              <span className='md:hidden'>
            <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>Copy</span>
                <span>{copy}</span>
            </div>
                </span>
        }
    </button>
    
      </div>
  );
};

export { CopyButton }
