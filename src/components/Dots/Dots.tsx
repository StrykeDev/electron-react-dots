import React, { useState } from 'react';
import Dot, { EDotType } from '../Dot';
import './Dots.css';

function Dots(): React.ReactElement {
   const [dots] = useState([
      {
         type: EDotType.Search,
      },
      {
         type: EDotType.Dot,
      },
      {
         type: EDotType.Dot,
      },
      {
         type: EDotType.Timer,
      },
   ]);
   const [extendedDot, setExtendedDot] = useState<string>();
   const [canExtend, setCanExtend] = useState(true);

   function handleExtend(id: string): void {
      if (canExtend) {
         setExtendedDot(id);
      }
   }

   function handleCollapse(id: string): void {
      if (canExtend) {
         setExtendedDot(undefined);
      } else if (!canExtend && extendedDot == id) {
         setExtendedDot(undefined);
         setCanExtend(true);
      }
   }

   function handleBlock(id: string): void {
      if (canExtend) {
         setExtendedDot(id);
         setCanExtend(false);
      }
   }

   return (
      <div className="dots">
         {dots.map((dot, i) => {
            const key = 'dot-' + i;
            const props = {
               key: key,
               id: key,
               type: dot.type,
               extended: key === extendedDot,
               onExtend: handleExtend,
               onCollapse: handleCollapse,
               onBlock: handleBlock,
            };
            return React.createElement(Dot, props);
         })}
      </div>
   );
}

export default Dots;
