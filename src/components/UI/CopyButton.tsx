import React, { useState } from 'react';
import { copy, copied  } from '../UI/icons';
import styles from "./Copy.module.css"


type ButtonProps = {
  value: string;
};

const CopyButton = ({value}: ButtonProps) => {
  const [clicked, setClicked] = useState(false);
  const tooltipStyle = ["rounded", "shadow-lg", "bg-primary-200", "p-1"];
  tooltipStyle.push(styles.tooltip);
  
  const containerStyle = ["flex", "flex-row", "text-center"];
  containerStyle.push(styles.hastooltip);

  return (

      <div className="text-secondary">
          <span className='mr-1'>{value}</span>
          <button className={clicked ? "cursor-default" : ""} disabled={clicked}
      onClick={() => {
          navigator.clipboard.writeText(value);
          setClicked(true);
    }}
    >
        {clicked ? (
            <div className={styles.tooltip}>
                <span className={styles.tooltiptext}>Copied!</span>
                <span>{copied}</span>

            </div>

        ): <div className={styles.tooltip}>
            <span className={styles.tooltiptext}>Copy</span>
            <span >{copy}</span>

        </div>}
    </button>
    
      </div>
  );
};

export { CopyButton }
