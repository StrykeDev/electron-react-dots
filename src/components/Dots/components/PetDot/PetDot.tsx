import React, { useState } from 'react';
import Dot, { EDotSize, IDots } from '../../Dot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faAngry,
   faAppleAlt,
   faBacon,
   faBed,
   faBolt,
   faBox,
   faCarrot,
   faCoffee,
   faEgg,
   faFish,
   faFrown,
   faHamburger,
   faHeart,
   faHeartbeat,
   faHeartBroken,
   faKissWinkHeart,
   faLaughBeam,
   faLemon,
   faPizzaSlice,
   faPoop,
   faPrescriptionBottleAlt,
   faShower,
   faTint,
   faToiletPaper,
   faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import egg from './assets/egg.gif';
import './PetDot.css';

function PetDot({ extended, onExtend, onCollapse }: IDots): React.ReactElement {
   const [health] = useState(1);
   const [energy] = useState(1);
   const [love] = useState(1);
   const [hunger] = useState(1);
   const [thirst] = useState(1);
   const [cleanliness] = useState(1);

   function getPrecentage(float: number): string {
      return Math.ceil(float * 100) + '%';
   }

   return (
      <Dot
         icon={faEgg}
         size={EDotSize.Full}
         extended={extended}
         onExtend={onExtend}
         onCollapse={onCollapse}
      >
         <div className="pet-container">
            <div className="score">
               <div>
                  <FontAwesomeIcon icon={faHeartbeat} />
                  <span>{getPrecentage(health)}</span>
               </div>
               <div>
                  <FontAwesomeIcon icon={faBolt} />
                  <span>{getPrecentage(energy)}</span>
               </div>
               <div>
                  <FontAwesomeIcon icon={love > 0 ? faHeart : faHeartBroken} />
                  <span>{getPrecentage(love)}</span>
               </div>
               <div>
                  <FontAwesomeIcon icon={faUtensils} />
                  <span>{getPrecentage(hunger)}</span>
               </div>
               <div>
                  <FontAwesomeIcon icon={faTint} />
                  <span>{getPrecentage(thirst)}</span>
               </div>
               <div>
                  <FontAwesomeIcon
                     icon={cleanliness > 0.25 ? faShower : faPoop}
                  />
                  <span>{getPrecentage(cleanliness)}</span>
               </div>
            </div>

            {/* PREVIEW ONLY */}
            <div className="pet">
               <img src={egg} />
            </div>

            <div className="controls">
               <fieldset
                  disabled={hunger > 0.8 && thirst > 0.8}
                  className="category food"
               >
                  <button className="btn">
                     <FontAwesomeIcon icon={faFish} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faBacon} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faTint} />
                  </button>

                  <button className="btn">
                     <FontAwesomeIcon icon={faCarrot} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faAppleAlt} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faLemon} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faHamburger} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faPizzaSlice} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faCoffee} />
                  </button>
               </fieldset>
               <fieldset disabled={energy < 0.2} className="category activites">
                  <button className="btn">
                     <FontAwesomeIcon icon={faKissWinkHeart} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faLaughBeam} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faFrown} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faAngry} />
                  </button>
                  <button className="btn" disabled={cleanliness > 0.8}>
                     <FontAwesomeIcon icon={faShower} />
                  </button>
                  <button className="btn" disabled={cleanliness > 0.8}>
                     <FontAwesomeIcon icon={faToiletPaper} />
                  </button>
               </fieldset>
               <fieldset className="category wellness">
                  <button className="btn" disabled={energy > 0.5}>
                     <FontAwesomeIcon icon={faBed} />
                  </button>
                  <button className="btn" disabled={health === 1}>
                     <FontAwesomeIcon icon={faPrescriptionBottleAlt} />
                  </button>
                  <button className="btn" style={{ color: '#111111' }}>
                     <FontAwesomeIcon icon={faBox} />
                  </button>
               </fieldset>
            </div>
         </div>
      </Dot>
   );
}

export default PetDot;
