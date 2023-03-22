import React, {useState} from 'react';

import BestiaryTable from './BestiaryTable';
import EncounterTable from './EncounterTable';
import PartyConfig from './PartyConfig';

const App = () =>{
  const [partyLevel, setPartyLevel] = useState(1);
  const [partySize, setPartySize] = useState(4);
  
  const [encounterList, setEncounterList] = useState([]);

  const xpBudget = [
    {creatureLevel: -4, creatureXP: 10 },
    {creatureLevel: -3, creatureXP: 15 },
    {creatureLevel: -2, creatureXP: 20 },
    {creatureLevel: -1, creatureXP: 30 },
    {creatureLevel: 0, creatureXP: 40 },
    {creatureLevel: 1, creatureXP: 60 },
    {creatureLevel: 2, creatureXP: 80 },
    {creatureLevel: 3, creatureXP: 120 },
    {creatureLevel: 4, creatureXP: 160 }
  ];

  function clampLevelDifference(partyLevel, creatureLevel){
    return Math.min(Math.max(creatureLevel - partyLevel, -4), 4);
  }

  const encounterXP = encounterList
    .map((creature) => xpBudget
      .find((entry) => entry.creatureLevel === clampLevelDifference(partyLevel, creature.level)).creatureXP)
    .reduce((prevSum, currSum) => currSum + prevSum, 0);

  const partyLevelHandler = (partyLevel) =>{    
    setPartyLevel(partyLevel);  
  }

  const threatTable = [
    {threat: 'Trivial', threatXP: 40, characterAdjustment: 10},
    {threat: 'Low', threatXP: 60, characterAdjustment: 15},
    {threat: 'Moderate', threatXP: 80, characterAdjustment: 20},
    {threat: 'Severe', threatXP: 120, characterAdjustment: 30},
    {threat: 'Extreme', threatXP: 160, characterAdjustment: 40}
  ];

  const threatLevel = threatTable
    .map((entry) => {
      const threatEntry = {};

      threatEntry.threat = entry.threat;
      threatEntry.threatXP = entry.threatXP + ((partySize - 4) * entry.characterAdjustment);
      
      return threatEntry;
    }).findLast((entry, entryIndex) => entryIndex === 0 || entry.threatXP <= encounterXP).threat;

  const partySizeHandler = (partySize) =>{
    setPartySize(partySize);
  }

  const addEncounterHandler = (encounterEntry) =>{
    setEncounterList((prevEncounters) => [...prevEncounters, {...encounterEntry}]);
  }

  const removeEncounterHandler = (encounterKey) =>{
    setEncounterList((prevEncounters) => prevEncounters.filter(entry => entry !== encounterKey));
  }

  return(
    <div className="container">
      <PartyConfig partyLevelHandler={partyLevelHandler} partyLevel={partyLevel} partySizeHandler={partySizeHandler} partySize={partySize}/>
      <BestiaryTable addEncounterHandler={addEncounterHandler}/>
      <EncounterTable encounterList={encounterList} removeEncounterHandler={removeEncounterHandler} encounterXP={encounterXP} threatLevel={threatLevel} />
    </div>
  );
}

export default App;