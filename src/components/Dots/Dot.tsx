import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

export enum EDotSize {
   Dot,
   Wide,
   Tall,
   Full,
}

export interface IDots {
   extended: boolean;
   onExtend: () => void;
   onCollapse: () => void;
   onBlock?: () => void;
}

interface IDot extends IDots {
   icon: IconProp;
   size: EDotSize;
   children?: React.ReactElement;
}

function Dot({
   icon,
   size,
   children,
   extended,
   onExtend,
   onCollapse,
}: IDot): React.ReactElement {
   function getSize(): string {
      switch (size) {
         case EDotSize.Wide:
            return 'wide';
         case EDotSize.Tall:
            return 'tall';
         case EDotSize.Full:
            return 'full';
         default:
            return '';
      }
   }

   return (
      <div
         className={['dot', getSize(), extended ? 'extended' : ''].join(' ')}
         onMouseEnter={() => {
            open('click:enable');
         }}
         onMouseLeave={() => {
            open('click:disable');
         }}
      >
         <div
            className="dot-btn"
            onClick={() => (extended ? onCollapse() : onExtend())}
         >
            <FontAwesomeIcon icon={icon} />
         </div>
         <div className="dot-content">{children}</div>
      </div>
   );
}

Dot.defaultProps = {
   icon: faDotCircle,
   size: EDotSize.Dot,
   children: null,
};

export default Dot;
