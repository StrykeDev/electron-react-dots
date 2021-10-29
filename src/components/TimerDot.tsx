import React, { useEffect, useState } from 'react';
import { IDotFunctionProps, EDotVarient } from './Dot';

const OPTIONS = {
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

function TimerDot({
   varient,
   onExtend,
}: IDotFunctionProps): React.ReactElement {
   const [hour, setHour] = useState(0);
   const [min, setMin] = useState(0);
   const [sec, setSec] = useState(15);
   const [action, setAction] = useState('');
   const [isCounting, setIsCounting] = useState(false);

   function getOptions(): { name: string; action: string }[] {
      switch (varient) {
         case EDotVarient.Alarm:
            return OPTIONS.alarm;
         case EDotVarient.Shutdown:
            return OPTIONS.shutdown;
         default:
            return [...OPTIONS.alarm, ...OPTIONS.shutdown];
      }
   }

   function doAction(): void {
      switch (action) {
         case 'alarm':
            alert('Done');
            break;

         default:
            open('action:' + action, '_blank');
      }
      setIsCounting(false);
   }

   function startStopTimer(event: React.FormEvent | undefined): void {
      if (event) {
         event.preventDefault();
         if (!isCounting && action && (sec || min || hour)) {
            setIsCounting(true);
         }
      } else if (isCounting) {
         setIsCounting(false);
      }
   }

   let held = false;
   function holdToStop(isDown: boolean): void {
      if (isCounting) {
         if (isDown) {
            held = true;
            setTimeout(() => {
               if (held) {
                  startStopTimer(undefined);
               }
            }, 1000);
         } else {
            held = false;
         }
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
            onExtend();
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

   const timerStyle: React.CSSProperties = {
      width: '2em',
      textAlign: 'center',
      padding: 0,
   };

   return (
      <form
         onMouseDown={() => holdToStop(true)}
         onMouseUp={() => holdToStop(false)}
         onSubmit={(event) => startStopTimer(event)}
      >
         <fieldset disabled={isCounting}>
            <input
               style={timerStyle}
               type="number"
               min={0}
               max={99}
               step={1}
               value={hour}
               onChange={(event) => setHour(Number(event.currentTarget.value))}
            />
            :
            <input
               style={timerStyle}
               type="number"
               min={0}
               max={60}
               step={1}
               value={min}
               onChange={(event) => setMin(Number(event.currentTarget.value))}
            />
            :
            <input
               style={timerStyle}
               type="number"
               width={1000}
               min={0}
               max={60}
               step={1}
               value={sec}
               onChange={(event) => setSec(Number(event.currentTarget.value))}
            />
            <select
               value={action}
               onChange={(event) => setAction(event.currentTarget.value)}
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
   );
}

export default TimerDot;
