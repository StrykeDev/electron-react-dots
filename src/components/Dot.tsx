import React, { useState } from 'react';
import SearchDot from './SearchDot';
import TimerDot from './TimerDot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
   faClock,
   faDotCircle,
   faPowerOff,
   faSearch,
   faBell,
} from '@fortawesome/free-solid-svg-icons';
import {
   faGoogle,
   faWikipediaW,
   faYoutube,
} from '@fortawesome/free-brands-svg-icons';

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

export enum EDotVarient {
   Google,
   Duck,
   Bing,
   YouTube,
   Wiki,
   Shutdown,
   Alarm,
}

export interface IDotFunctionProps {
   varient?: EDotVarient;
   onExtend: () => void;
   onCollapse: () => void;
   onBlock: () => void;
}

interface IDotProps {
   id: string;
   type: EDotType;
   varient?: EDotVarient;
   extended?: boolean;
   onExtend: (id: string) => void;
   onCollapse: (id: string) => void;
   onBlock: (id: string) => void;
}

function Dot({
   id,
   type,
   varient,
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
      switch (varient) {
         case EDotVarient.Google:
            return faGoogle;
         case EDotVarient.YouTube:
            return faYoutube;
         case EDotVarient.Wiki:
            return faWikipediaW;
         case EDotVarient.Shutdown:
            return faPowerOff;
         case EDotVarient.Alarm:
            return faBell;
         default:
            switch (type) {
               case EDotType.Search:
                  return faSearch;
               case EDotType.Timer:
                  return faClock;
               default:
                  return faDotCircle;
            }
      }
   }

   function getComponent(): React.ReactElement {
      const props = {
         varient: varient,
         onExtend: extend,
         onCollapse: collapse,
         onBlock: block,
      };

      switch (type) {
         case EDotType.Search:
            return React.createElement(SearchDot, props);
         case EDotType.Timer:
            return React.createElement(TimerDot, props);
         default:
            return <></>;
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
