import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function Dot({ icon, children, isTall }: IProps): React.ReactElement {
  const [expanded, setExpanded] = useState(false);

  function ToggleSize(): void {
    setExpanded(!expanded);
  }

  const className = isTall ? 'dot-open-tall' : 'dot-open-wide';
  return (
    <div className={expanded ? 'dot ' + className : 'dot'} onClick={ToggleSize}>
      <FontAwesomeIcon icon={icon} />
      <span className="dot-content">{children}</span>
    </div>
  );
}

interface IProps {
  icon: IconProp;
  children: React.ReactElement;
  isTall?: boolean;
}

Dot.defaultProps = {
  icon: faDotCircle,
  children: <p>Nothing here</p>,
  isTall: false,
};

export default Dot;
