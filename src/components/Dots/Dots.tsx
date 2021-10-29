import React, { useState } from 'react';
import EmptyDot from './components/EmptyDot';
import SearchDot, { EEngine } from './components/SearchDot';
import TimerDot, { EType } from './components/TimerDot';
import './Dots.css';

function Dots(): React.ReactElement {
   const [dots] = useState([
      {
         component: EmptyDot,
         props: {},
      },
      {
         component: SearchDot,
         props: { engine: EEngine.Google },
      },
      {
         component: SearchDot,
         props: { engine: EEngine.YouTube },
      },
      {
         component: TimerDot,
         props: { type: EType.Power },
      },
   ]);
   const [extendedDot, setExtendedDot] = useState('');
   const [canExtend, setCanExtend] = useState(true);

   function handleExtend(key: string): void {
      if (canExtend) {
         setExtendedDot(key);
      }
   }

   function handleCollapse(key: string): void {
      if (canExtend) {
         setExtendedDot('');
      } else if (!canExtend && extendedDot == key) {
         setExtendedDot('');
         setCanExtend(true);
      }
   }

   function handleBlock(key: string): void {
      if (canExtend) {
         setExtendedDot(key);
         setCanExtend(false);
      } else if (key == extendedDot) {
         setCanExtend(true);
      }
   }

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   function createDot(dot: any, key: string): React.ReactElement {
      const props = {
         key: key,
         extended: key === extendedDot,
         onExtend: () => handleExtend(key),
         onCollapse: () => handleCollapse(key),
         onBlock: () => handleBlock(key),
         ...dot.props,
      };

      return React.createElement(dot.component, props);
   }

   return (
      <div className="dots">
         {dots.map((dot, i) => {
            return createDot(dot, `dot-${i}`);
         })}
      </div>
   );
}

export default Dots;
