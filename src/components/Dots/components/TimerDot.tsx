import React, { useEffect, useState } from 'react';
import Dot, { IDots, EDotSize } from '../Dot';
import { faBell, faClock, faPowerOff } from '@fortawesome/free-solid-svg-icons';

const OPTIONS = {
   alarm: [{ name: 'Alarm', action: 'alarm' }],
   power: [
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

export enum EType {
   Alarm,
   Power,
   Any,
}

interface ITimerDot extends IDots {
   type: EType;
}

function TimerDot({
   type,
   extended,
   onExtend,
   onCollapse,
}: ITimerDot): React.ReactElement {
   const [hour, setHour] = useState(0);
   const [min, setMin] = useState(0);
   const [sec, setSec] = useState(15);
   const [selected, setSelected] = useState('');
   const [isCounting, setIsCounting] = useState(false);

   function getIcon() {
      switch (type) {
         case EType.Alarm:
            return faBell;
         case EType.Power:
            return faPowerOff;
         default:
            return faClock;
      }
   }

   function getOptions(): { name: string; action: string }[] {
      switch (type) {
         case EType.Alarm:
            return OPTIONS.alarm;
         case EType.Power:
            return OPTIONS.power;
         default:
            return [...OPTIONS.alarm, ...OPTIONS.power];
      }
   }

   function finished(): void {
      switch (selected) {
         case 'alarm':
            alert('Done');
            break;

         default:
            open('action:' + selected, '_blank');
      }
      setIsCounting(false);
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
            finished();
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

   function startStopTimer(event: React.FormEvent | undefined): void {
      if (event) {
         event.preventDefault();
         if (!isCounting && selected && (sec || min || hour)) {
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

   const timerStyle: React.CSSProperties = {
      width: '2em',
      textAlign: 'center',
   };

   return (
      <Dot
         icon={getIcon()}
         size={EDotSize.Wide}
         extended={extended}
         onExtend={onExtend}
         onCollapse={onCollapse}
      >
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
                  onChange={(event) =>
                     setHour(Number(event.currentTarget.value))
                  }
               />
               :
               <input
                  style={timerStyle}
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
                  style={timerStyle}
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
                  value={selected}
                  onChange={(event) => setSelected(event.currentTarget.value)}
                  placeholder="Action"
               >
                  <option value="">Select</option>
                  {getOptions().map(
                     (option): React.ReactElement => (
                        <option key={option.action} value={option.action}>
                           {option.name}
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

export default TimerDot;
