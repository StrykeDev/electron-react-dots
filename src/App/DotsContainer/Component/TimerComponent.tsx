import React, { useEffect, useState } from 'react';

function TimerComponent({ actions }: IProps): React.ReactElement {
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(15);
  const [action, setAction] = useState(actions[0].action);
  const [counting, setCounting] = useState(false);
  const numberStyle = { width: '1.5em' };

  function DoAction(): void {
    switch (action) {
      case 'alarm':
        alert('Done');
        break;

      default:
        open('action:' + action, '_blank');
    }
    setCounting(false);
  }

  function StartStopTimer(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!counting && action && (sec || min || hour)) {
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
          value={action}
          onChange={(event) => setAction(event.currentTarget.value)}
          placeholder="Action"
        >
          {actions.map((action) => {
            return (
              <option key={action.action} value={action.action}>
                {action.name}
              </option>
            );
          })}
        </select>
      </fieldset>
      <input type="submit" hidden={true} />
    </form>
  );
}

interface IProps {
  actions: { name: string; action: string }[];
}

TimerComponent.defaultProps = {
  actions: [{ name: 'Alarm', action: 'alarm' }],
};

export default TimerComponent;
