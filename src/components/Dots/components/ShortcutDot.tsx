import React from 'react';
import Dot, { EDotSize, IDots } from '../Dot';
import { faGamepad, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ShortcutDot({
   extended,
   onExtend,
   onCollapse,
}: IDots): React.ReactElement {
   function generatedList(): React.ReactElement {
      return (
         <li
            className="btn"
            style={{
               padding: '.5em',
               display: 'grid',
               gridTemplateColumns: '2em 1fr',
               columnGap: '.5em',
               alignItems: 'center',
            }}
         >
            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            <span>Game Title</span>
         </li>
      );
   }
   return (
      <Dot
         icon={faGamepad}
         size={EDotSize.Full}
         extended={extended}
         onExtend={onExtend}
         onCollapse={onCollapse}
      >
         <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <span
               style={{ position: 'absolute', right: '.5em', bottom: '.5em' }}
            >
               <button>
                  <FontAwesomeIcon icon={faPlusCircle} size="2x" />
               </button>
            </span>

            <ul className="unstyled-list">
               {generatedList()}
               {generatedList()}
               {generatedList()}
               {generatedList()}
               {generatedList()}
            </ul>
         </div>
      </Dot>
   );
}

export default ShortcutDot;
