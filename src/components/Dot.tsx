import React, { useState } from 'react';
import SearchDot, { EEngine } from './SearchDot';
import TimerDot, { EFunctions } from './TimerDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faClock,
   faDotCircle,
   faSearch,
} from '@fortawesome/free-solid-svg-icons';

export enum EDotType {
   Dot,
   Search,
   Timer,
}

export enum EDotSize {
   Dot,
   Wide,
   Tall,
   Full,
}

export interface IDotFunctionProps {
   onExtend?: () => void;
   onCollapse?: () => void;
   onBlock?: () => void;
}

interface IDotProps {
   id: string;
   type: EDotType;
   extended?: boolean;
   onExtend: (id: string) => void;
   onCollapse: (id: string) => void;
   onBlock: (id: string) => void;
}

function Dot({
   id,
   type,
   extended,
   onExtend,
   onCollapse,
   onBlock,
}: IDotProps): React.ReactElement {
   const [dotType] = useState(type);

   function extend(): void {
      if (!extended) {
         onExtend(id);
         setTimeout(collapse, 5000);
      }
   }

   function collapse(): void {
      if (extended) {
         onCollapse(id);
      }
   }

   function block() {
      onBlock(id);
   }

   function getSize(): string {
      switch (dotType) {
         case EDotType.Dot:
            return '';
         case EDotType.Search:
         case EDotType.Timer:
            return 'wide';
      }
   }

   function getIcon(): IconProp {
      switch (dotType) {
         case EDotType.Dot:
            return faDotCircle;
         case EDotType.Search:
            return faSearch;
         case EDotType.Timer:
            return faClock;
      }
   }

   function getComponent(): React.ReactElement {
      switch (type) {
         case EDotType.Dot:
            return <></>;
         default:
         case EDotType.Search:
            return (
               <SearchDot
                  engine={EEngine.google}
                  onCollapse={collapse}
                  onBlock={block}
               />
            );
         case EDotType.Timer:
            return (
               <TimerDot
                  type={EFunctions.all}
                  onExtend={extend}
                  onBlock={block}
               />
            );
      }
   }

   return (
      <div className={['dot', getSize(), extended ? 'extended' : ''].join(' ')}>
         <div
            className="dot-btn"
            onClick={() => (extended ? collapse() : extend())}
         >
            <FontAwesomeIcon icon={getIcon()} />
         </div>
         <div className="dot-content">{getComponent()}</div>
      </div>
   );
}

Dot.defaultProps = {
   extended: false,
};

export default Dot;
