import React, { useEffect, useState } from 'react';
import Dot from './Dot';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBell, faPowerOff } from '@fortawesome/free-solid-svg-icons';

function TimerDot({ action }: IProps): React.ReactElement {
   const [hour, setHour] = useState(0);
   const [min, setMin] = useState(0);
   const [sec, setSec] = useState(15);
   const [selectedAction, setSelectedAction] = useState('');
   const [isCounting, setIsCounting] = useState(false);

   const options = {
      alarm: [{ name: 'Alarm', action: 'alarm' }],
      shutdown: [
         {
            name: 'Shutdown',
            action: 'shutdown',
         },
         {
            name: 'Reboot',
            action: 'reboot',
         },
         {
            name: 'Sleep',
            action: 'sleep',
         },
      ],
   };

   function getOptions(): { name: string; action: string }[] {
      switch (action) {
         case 'alarm':
            return options.alarm;
         case 'shutdown':
            return options.shutdown;
      }
   }

   function getIcon(): IconProp {
      switch (action) {
         case 'alarm':
            return faBell;
         case 'shutdown':
            return faPowerOff;
      }
   }

   function doAction(): void {
      switch (selectedAction) {
         case 'alarm':
            alert('Done');
            break;

         default:
            open('action:' + selectedAction, '_blank');
      }
      setIsCounting(false);
   }

   function startStopTimer(event: React.FormEvent<HTMLFormElement>): void {
      event.preventDefault();

      if (!isCounting && selectedAction && (sec || min || hour)) {
         setIsCounting(true);
      }
   }

   useEffect(() => {
      if (!isCounting) return;

      if (sec - 1 >= 0) {
         const tickHandler = setInterval(() => {
            setSec((sec) => sec - 1);
         }, 1000);

         return () => clearInterval(tickHandler);
      } else {
         if (hour === 0 && min === 0) {
            doAction();
         } else if (min > 0) {
            setMin((min) => min - 1);
            setSec(59);
         } else if (hour > 0) {
            setHour((hour) => hour - 1);
            setMin(59);
            setSec(59);
         }
      }
   }, [isCounting, sec]);

   return (
      <Dot icon={getIcon()} size="wide">
         <form
            onClick={() => setIsCounting(false)}
            onSubmit={(event) => startStopTimer(event)}
         >
            <fieldset disabled={isCounting}>
               <input
                  type="number"
                  min={0}
                  max={99}
                  step={1}
                  value={hour}
                  onChange={(event) =>
                     setHour(Number(event.currentTarget.value))
                  }
               />
               :
               <input
                  type="number"
                  min={0}
                  max={60}
                  step={1}
                  value={min}
                  onChange={(event) =>
                     setMin(Number(event.currentTarget.value))
                  }
               />
               :
               <input
                  type="number"
                  width={1000}
                  min={0}
                  max={60}
                  step={1}
                  value={sec}
                  onChange={(event) =>
                     setSec(Number(event.currentTarget.value))
                  }
               />
               <select
                  value={selectedAction}
                  onChange={(event) =>
                     setSelectedAction(event.currentTarget.value)
                  }
                  placeholder="Action"
               >
                  <option value="">Select</option>
                  {getOptions().map(
                     (Option): React.ReactElement => (
                        <option key={Option.action} value={Option.action}>
                           {Option.name}
                        </option>
                     ),
                  )}
               </select>
               <input type="submit" hidden={true} />
            </fieldset>
         </form>
      </Dot>
   );
}

interface IProps {
   action: 'alarm' | 'shutdown';
}

export default TimerDot;
