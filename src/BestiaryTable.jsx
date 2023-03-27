import React, { useMemo, useState } from "react";
import Select from "react-select";
import BestiaryTableData from "./bestiary.json";

const SORT_DIRECTION_STATE_MAP = {
  asc: "desc",
  desc: undefined,
  [undefined]: "asc",
};

const ALL_TRAITS = new Set(); // SCREAMING_SNAKE_CASE

BestiaryTableData.forEach((entry) => {
  entry.traits.forEach((traitsEntry) => {
    ALL_TRAITS.add(traitsEntry.name);
  });
});

const TRAITS_LIST = Array.from(ALL_TRAITS)
  .sort()
  .map((entry) => {
    return { value: entry, label: entry };
  });

const BestiaryTable = ({ addEncounterHandler }) => {
  const [selectedTraits, setSelectedTraits] = useState([]);

  const [inputMinLevel, setInputMinLevel] = useState();
  const [inputMaxLevel, setInputMaxLevel] = useState();

  const minLevel = inputMinLevel === "" ? -1 : Number(inputMinLevel);
  const maxLevel = inputMaxLevel === "" ? -1 : Number(inputMaxLevel);

  const [sortBestiaryType, setSortBestiaryType] = useState("name");
  const [sortBestiaryDirection, setSortBestiaryDirection] = useState("asc");

  const addEncounterClickHandler = (tableEntry) => {
    addEncounterHandler(tableEntry);
  };

  function handleChangeSortType(sortType) {
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
    setInputMinLevel(minLevelInput);
  }

  function maxLevelHandler(maxLevelInput) {
    setInputMaxLevel(maxLevelInput);
  }

  const filteredBestiaryTable = useMemo(() => {
    return BestiaryTableData;
    // Write this fresh
  }, [selectedTraits]);

  const filteredAndSortedBestiaryTable = filteredBestiaryTable
    .filter((entry) => entry.level <= maxLevel && entry.level >= minLevel)
    .sort(); // Write this fresh

  return (
    <div>
      <h1>Bestiary Table</h1>

      <Select
        closeMenuOnSelect={false}
        isMulti
        isSearchable
        onChange={setSelectedTraits}
        options={TRAITS_LIST}
      />

      <input
        type="number"
        placeholder="Min Level"
        onChange={(e) => minLevelHandler(e.target.value)}
        value={inputMinLevel}
      />
      <input
        type="number"
        placeholder="Max Level"
        onChange={(e) => maxLevelHandler(e.target.value)}
        value={inputMaxLevel}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => handleChangeSortType("name")}>Name</th>
            <th onClick={() => handleChangeSortType("level")}>Level</th>
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
