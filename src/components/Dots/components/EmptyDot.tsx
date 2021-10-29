import React from 'react';
import Dot, { IDots } from '../Dot';

function EmptyDot({ onExtend, onCollapse }: IDots): React.ReactElement {
   return <Dot extended={false} onExtend={onExtend} onCollapse={onCollapse} />;
}

export default EmptyDot;
