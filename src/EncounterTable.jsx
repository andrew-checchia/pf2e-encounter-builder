import React from "react";

import { XP_BUDGET, THREAT_TABLE } from "./constants";
import clampLevelDifference from "./clampLevelDifference";

const EncounterTable = ({
  encounterList,
  removeEncounterHandler,
  partyLevel,
  partySize,
}) => {
  const removeClickHandler = (encounterKey) => {
    removeEncounterHandler(encounterKey);
  };

  const encounterXP = encounterList
    .map(
      (creature) =>
        XP_BUDGET.find(
          (entry) =>
            entry.creatureLevel ===
            clampLevelDifference(partyLevel, creature.level)
        ).creatureXP
    )
    .reduce((prevSum, currSum) => currSum + prevSum, 0);

  const threatLevel = THREAT_TABLE.map((entry) => {
    const threatEntry = {};

    threatEntry.threat = entry.threat;
    threatEntry.threatXP =
      entry.threatXP + (partySize - 4) * entry.characterAdjustment;

    return threatEntry;
  }).findLast(
    (entry, entryIndex) => entryIndex === 0 || entry.threatXP <= encounterXP
  ).threat;

  if (encounterList.length === 0) {
    return null;
  }

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Family</th>
          <th></th>
        </tr>

        {encounterList.map((tableEntry, idx) => (
          <tr key={idx}>
            <td>{tableEntry.name}</td>
            <td>{tableEntry.level}</td>
            <td>{tableEntry.family}</td>
            <td onClick={() => removeClickHandler(tableEntry)}>Remove?</td>
          </tr>
        ))}
      </table>
      <p>Total XP: {encounterXP}</p>
      <p>Threat Level: {threatLevel} </p>
    </div>
  );
};

export default EncounterTable;
