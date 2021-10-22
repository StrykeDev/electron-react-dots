import React, { useEffect, useState } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBell, faPowerOff } from '@fortawesome/free-solid-svg-icons';

import Dot from './Dot';

function TimerDot({ action }: IProps): React.ReactElement {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(15);
  const [selected, setSelected] = useState('');
  const [counting, setCounting] = useState(false);
  const numberStyle = { width: '1.5em' };

  const Options = {
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

  function GetOptions(): { name: string; action: string }[] {
    switch (action) {
      case 'alarm':
        return Options.alarm;
      case 'shutdown':
        return Options.shutdown;
    }
  }

  function GetIcon(): IconProp {
    switch (action) {
      case 'alarm':
        return faBell;
      case 'shutdown':
        return faPowerOff;
    }
  }

  function DoAction(): void {
    switch (selected) {
      case 'alarm':
        alert('Done');
        break;

      default:
        open('action:' + selected, '_blank');
    }
    setCounting(false);
  }

  function StartStopTimer(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!counting && selected && (sec || min || hour)) {
      setCounting(true);
    }
  }

  useEffect(() => {
    if (!counting) return;

    if (sec - 1 >= 0) {
      const tickHandler = setInterval(() => {
        setSec((sec) => sec - 1);
      }, 1000);

      return () => clearInterval(tickHandler);
    } else {
      if (hour === 0 && min === 0) {
        DoAction();
      } else if (min > 0) {
        setMin((min) => min - 1);
        setSec(59);
      } else if (hour > 0) {
        setHour((hour) => hour - 1);
        setMin(59);
        setSec(59);
      }
    }
  }, [counting, sec]);

  return (
    <Dot icon={GetIcon()}>
      <form onSubmit={(event) => StartStopTimer(event)} className="form">
        <fieldset disabled={counting} className="input-group">
          <input
            style={numberStyle}
            type="number"
            min={0}
            max={99}
            step={1}
            value={hour}
            onChange={(event) => setHour(Number(event.currentTarget.value))}
          />
          :
          <input
            style={numberStyle}
            type="number"
            min={0}
            max={60}
            step={1}
            value={min}
            onChange={(event) => setMin(Number(event.currentTarget.value))}
          />
          :
          <input
            style={numberStyle}
            type="number"
            width={1000}
            min={0}
            max={60}
            step={5}
            value={sec}
            onChange={(event) => setSec(Number(event.currentTarget.value))}
          />
          <select
            value={selected}
            onChange={(event) => setSelected(event.currentTarget.value)}
            placeholder="Action"
          >
            {GetOptions().map(
              (Option): React.ReactElement => (
                <option key={Option.action} value={Option.action}>
                  {Option.name}
                </option>
              )
            )}
          </select>
        </fieldset>
        <input type="submit" hidden={true} />
      </form>
    </Dot>
  );
}

interface IProps {
  action: 'alarm' | 'shutdown';
}

export default TimerDot;
