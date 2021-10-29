import React from 'react';
import Dot, { IDots } from '../Dot';

function EmptyDot({
   extended,
   onExtend,
   onCollapse,
}: IDots): React.ReactElement {
   return (
      <Dot
         extended={extended}
         onExtend={onExtend}
         onCollapse={onCollapse}
      ></Dot>
   );
}

export default EmptyDot;
