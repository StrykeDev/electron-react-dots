import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

interface IDot {
   icon: IconProp;
   size?: 'wide' | 'tall' | 'full';
   children?: React.ReactElement;
}

Dot.defaultProps = {
   icon: faDotCircle,
   size: '',
   children: '',
};

function Dot({ icon, size, children }: IDot): React.ReactElement {
   const [isExtended, setIsExtended] = useState(false);

   function extend() {
      setIsExtended(true);
   }

   function collapse() {
      setIsExtended(false);
   }

   return (
      <div className={['dot', size, isExtended ? 'extended' : ''].join(' ')}>
         <div className="dot-btn" onClick={isExtended ? collapse : extend}>
            <FontAwesomeIcon icon={icon} />
         </div>
         {children ? <div className="dot-content">{children}</div> : ''}
      </div>
   );
}

export default Dot;
