import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function Dot({ icon, children, tall }: IProps): React.ReactElement {
  const [expanded, setExpanded] = useState(false);

  function ToggleSize(): void {
    setExpanded(!expanded);
  }

  const dotClassName = tall ? 'dot dot-tall' : 'dot dot-wide';
  return (
    <div className={expanded ? dotClassName + ' dot-expanded' : dotClassName}>
      <div className="dot-btn" onClick={ToggleSize}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="dot-content">{children}</div>
    </div>
  );
}

interface IProps {
  icon: IconProp;
  children: React.ReactElement;
  tall?: boolean;
}

Dot.defaultProps = {
  icon: faDotCircle,
  children: <>Nothing here</>,
  tall: false,
};

export default Dot;
