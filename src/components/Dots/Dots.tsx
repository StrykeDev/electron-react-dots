import React, { useEffect, useState } from 'react';
import EmptyDot from './components/EmptyDot';
import PetDot from './components/PetDot/PetDot';
import SearchDot, { EEngine } from './components/SearchDot';
import ShortcutDot from './components/ShortcutDot';
import TimerDot, { EType } from './components/TimerDot';
import './Dots.css';

function Dots(): React.ReactElement {
   const [dots] = useState([
      {
         component: SearchDot,
         props: { engine: EEngine.Google },
      },
      {
         component: PetDot,
      },
      {
         component: ShortcutDot,
      },
      {
         component: TimerDot,
         props: { type: EType.Power },
      },
   ]);
   const [extendedDot, setExtendedDot] = useState('');
   const [canExtend, setCanExtend] = useState(true);

   useEffect(() => {
      if (dots.length > 6 || dots.length < 3) {
         throw new Error(
            `${dots.length} is invalid dots amount, min = 3, max = 6.`,
         );
      }
      const root = document.documentElement;
      root.style.setProperty('--dot-amount', dots.length.toString());
   }, [dots]);

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
   function createDot(dot: any, index: number): React.ReactElement {
      const key = `dot-${index}`;
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
      <div className="dots-container">
         {dots.map((dot, i): React.ReactElement => {
            return createDot(dot, i);
         })}
      </div>
   );
}

export default Dots;
