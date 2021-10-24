import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function Dot({ icon, children, tall }: IProps): React.ReactElement {
   const [isExtended, setIsExtended] = useState(false);

   function toggleExtend(): void {
      if (children) {
         setIsExtended(!isExtended);
      }
   }

   const dotClassName = tall ? 'dot dot-tall' : 'dot dot-wide';
   return (
      <div
         className={isExtended ? dotClassName + ' dot-extended' : dotClassName}
      >
         <div className="dot-btn" onClick={toggleExtend}>
            <FontAwesomeIcon icon={icon} />
         </div>
         <div className="dot-content">{children}</div>
      </div>
   );
}

interface IProps {
   icon: IconProp;
   children: React.ReactElement | boolean;
   tall?: boolean;
}

Dot.defaultProps = {
   icon: faDotCircle,
   children: false,
   tall: false,
};

export default Dot;
