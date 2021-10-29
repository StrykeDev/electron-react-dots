import React, { useState } from 'react';
import Dot, { EDotSize, IDots } from '../../Dot';
import {
   faAppleAlt,
   faBacon,
   faBed,
   faBolt,
   faCarrot,
   faCookie,
   faEgg,
   faFish,
   faHamburger,
   faHeart,
   faHeartbeat,
   faHeartBroken,
   faLemon,
   faMortarPestle,
   faPizzaSlice,
   faPoop,
   faPrescriptionBottleAlt,
   faShower,
   faTint,
   faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import egg from './assets/egg.gif';
import './PetDot.css';

function PetDot({ extended, onExtend, onCollapse }: IDots): React.ReactElement {
   const [health] = useState(1);
   const [energy] = useState(1);
   const [love] = useState(0.1);
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
                  {getPrecentage(health)}
               </div>
               <div>
                  <FontAwesomeIcon icon={faBolt} />
                  {getPrecentage(energy)}
               </div>
               <div>
                  <FontAwesomeIcon icon={love > 0 ? faHeart : faHeartBroken} />
                  {getPrecentage(love)}
               </div>
               <div>
                  <FontAwesomeIcon icon={faUtensils} />
                  {getPrecentage(hunger)}
               </div>
               <div>
                  <FontAwesomeIcon icon={faTint} />
                  {getPrecentage(thirst)}
               </div>
               <div>
                  <FontAwesomeIcon
                     icon={cleanliness > 0.25 ? faShower : faPoop}
                  />
                  {getPrecentage(cleanliness)}
               </div>
            </div>
            <img src={egg} />
            <div className="controls">
               <button className="btn">
                  <FontAwesomeIcon icon={faFish} />
               </button>
               <button className="btn">
                  <FontAwesomeIcon icon={faBacon} />
               </button>
               <button className="btn">
                  <FontAwesomeIcon icon={faHamburger} />
               </button>
               <button className="btn">
                  <FontAwesomeIcon icon={faPizzaSlice} />
               </button>
               <button className="btn">
                  <FontAwesomeIcon icon={faCookie} />
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
                  <FontAwesomeIcon icon={faTint} />
               </button>

               <div className="controls">
                  <button className="btn">
                     <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faHeartBroken} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faPrescriptionBottleAlt} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faMortarPestle} />
                  </button>
                  <button className="btn">
                     <FontAwesomeIcon icon={faBed} />
                  </button>
               </div>
            </div>
         </div>
      </Dot>
   );
}

export default PetDot;
