import React, { useState } from "react";

import BestiaryTable from "./BestiaryTable";
import EncounterTable from "./EncounterTable";
import PartyConfig from "./PartyConfig";

const App = () => {
  const [partyLevel, setPartyLevel] = useState(1);
  const [partySize, setPartySize] = useState(4);
  const [encounterList, setEncounterList] = useState([]);

  const partyLevelHandler = (partyLevel) => {
    setPartyLevel(partyLevel);
  };

  const partySizeHandler = (partySize) => {
    setPartySize(partySize);
  };

  const addEncounterHandler = (encounterEntry) => {
    setEncounterList((prevEncounters) => [
      ...prevEncounters,
      { ...encounterEntry },
    ]);
  };

  const removeEncounterHandler = (encounterKey) => {
    setEncounterList((prevEncounters) =>
      prevEncounters.filter((entry) => entry !== encounterKey)
    );
  };

  return (
    <div className="container">
      <PartyConfig
        partyLevelHandler={partyLevelHandler}
        partyLevel={partyLevel}
        partySizeHandler={partySizeHandler}
        partySize={partySize}
      />
      <BestiaryTable addEncounterHandler={addEncounterHandler} />
      <EncounterTable
        encounterList={encounterList}
        removeEncounterHandler={removeEncounterHandler}
        partyLevel={partyLevel}
        partySize={partySize}
      />
    </div>
  );
};

export default App;
