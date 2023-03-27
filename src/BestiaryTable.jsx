import React, { useMemo, useState } from "react";
import Select from "react-select";
import BestiaryTableData from "./bestiary.json";

const SORT_DIRECTION_STATE_MAP = {
  asc: "desc",
  desc: undefined,
  [undefined]: "asc",
};

const BestiaryTable = ({ addEncounterHandler }) => {
  const [traitsSelect, setTraitsSelect] = useState([]);
  const [minLevel, setMinLevel] = useState(); // sug: name suggests numeric value, should likely provide numeric default
  const [maxLevel, setMaxLevel] = useState(); // sug: name suggests numeric value, should likely provide numeric default

  const [sortBestiaryType, setSortBestiaryType] = useState("name");
  const [sortBestiaryDirection, setSortBestiaryDirection] = useState("asc");

  const addEncounterClickHandler = (tableEntry) => {
    addEncounterHandler(tableEntry);
  };

  function sortHandler(sortType) {
    if (sortType !== sortBestiaryType) {
      setSortBestiaryType(sortType);
      setSortBestiaryDirection("asc");
      return;
    }

    setSortBestiaryDirection((prevDirection) => {
      return SORT_DIRECTION_STATE_MAP[prevDirection];
    });
  }

  function minLevelHandler(minLevelInput) {
    setMinLevel(minLevelInput);
  }

  function maxLevelHandler(maxLevelInput) {
    setMaxLevel(maxLevelInput);
  }

  const traitsSet = new Set();

  BestiaryTableData.forEach((entry) => {
    entry.traits.forEach((traitsEntry) => {
      traitsSet.add(traitsEntry.name);
    });
  });

  const traitsList = Array.from(traitsSet)
    .sort()
    .map((entry) => {
      return { value: entry, label: entry };
    });

  // smell: Something's off about this.
  let filteredBestiaryTable = [];
  if (traitsSelect.length === 0) {
    filteredBestiaryTable = BestiaryTableData;
  } else {
    BestiaryTableData.forEach((entry) => {
      entry.traits.forEach((entryTraits) => {
        traitsSelect.forEach((entryTraitsSelect) => {
          if (entryTraits.name === entryTraitsSelect.value) {
            filteredBestiaryTable.push(entry);
          }
        });
      });
    });
  }

  let minLevelBoundary = minLevel ?? -1;
  let maxLevelBoundary = maxLevel ?? 25;

  if (minLevelBoundary === "") {
    minLevelBoundary = -1;
  }

  if (maxLevelBoundary === "") {
    maxLevelBoundary = 25;
  }

  filteredBestiaryTable = filteredBestiaryTable.filter(
    (entry) =>
      entry.level <= maxLevelBoundary && entry.level >= minLevelBoundary
  );

  const filteredAndSortedBestiaryTable = useMemo(() => {
    return filteredBestiaryTable.sort((a, b) => {
      console.log(90, { sortBestiaryType, sortBestiaryDirection });

      if (
        a[sortBestiaryType] < b[sortBestiaryType] &&
        sortBestiaryDirection === "asc"
      ) {
        return -1;
      }

      if (
        a[sortBestiaryType] < b[sortBestiaryType] &&
        sortBestiaryDirection === "desc"
      ) {
        return 1;
      }

      return 0;
    });
  }, [
    sortBestiaryType,
    sortBestiaryDirection,
    JSON.stringify(filteredBestiaryTable),
  ]);

  return (
    <div>
      <h1>Bestiary Table</h1>

      {/* warn: Something feels off about this, no data-bind */}
      <Select
        closeMenuOnSelect={false}
        isMulti
        isSearchable
        onChange={setTraitsSelect}
        options={traitsList}
      />

      <input
        type="number"
        placeholder="Min Level"
        onChange={(e) => minLevelHandler(e.target.value)}
        value={minLevel}
      />
      <input
        type="number"
        placeholder="Max Level"
        onChange={(e) => maxLevelHandler(e.target.value)}
        value={maxLevel}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => sortHandler("name")}>Name</th>
            <th onClick={() => sortHandler("level")}>Level</th>
            <th>Traits</th>
          </tr>
        </thead>

        <tbody>
          {filteredAndSortedBestiaryTable.map((tableEntry, idx) => (
            <tr key={idx} onClick={() => addEncounterClickHandler(tableEntry)}>
              <td>{tableEntry.name}</td>
              <td>{tableEntry.level}</td>
              <td>
                {tableEntry.traits.map((traitsEntry, teIdx) => (
                  <span key={teIdx}>{traitsEntry.name} </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestiaryTable;
