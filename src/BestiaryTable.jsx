import React, {useState} from 'react';
import Select from 'react-select';
import BestiaryTableData from './bestiary.json';

const BestiaryTable = ({addEncounterHandler}) => {

    const [bestiaryTable, setBestiaryTable] = useState(BestiaryTableData);
    const [traitsSelect, setTraitsSelect] = useState([]);
    const [minLevel, setMinLevel] = useState();
    const [maxLevel, setMaxLevel] = useState();

    const [sortBestiaryType, setSortBestiaryType] = useState("name");
    const [sortBestiaryDirection, setSortBestiaryDirection] = useState("asc");
    

    const addEncounterClickHandler = (tableEntry) => {
        addEncounterHandler(tableEntry);
    }

    function sortHandler(sortType){
        if(sortType != sortBestiaryType) 
            return setSortBestiaryType(sortType); 
            
        if(sortBestiaryDirection != "asc")
            return setSortBestiaryDirection("asc");

        setSortBestiaryDirection("dsc");
    }

    function minLevelHandler(minLevelInput){
        setMinLevel(minLevelInput);
    }

    function maxLevelHandler(maxLevelInput){
        setMaxLevel(maxLevelInput)
    }

    let traitsSet = new Set();
    
    bestiaryTable.forEach((entry) =>{
        entry.traits.forEach((traitsEntry) => {
            traitsSet.add(traitsEntry.name);
        });
    });
    
    const traitsList = Array.from(traitsSet).sort().map((entry) =>{
        return {value: entry, label: entry}
    });

    let filteredBestiaryTable = [];
    if(traitsSelect.length === 0){
        filteredBestiaryTable = bestiaryTable;
    }else{
        bestiaryTable.forEach((entry) => {
            entry.traits.forEach((entryTraits) => {
                traitsSelect.forEach((entryTraitsSelect) =>{
                    if(entryTraits.name === entryTraitsSelect.value){
                        filteredBestiaryTable.push(entry);
                    }
                }); 
            });
        });
    }

    let minLevelBoundary = minLevel ?? -1;
    let maxLevelBoundary = maxLevel ?? 25;

    
    if(minLevelBoundary === ''){
        minLevelBoundary = -1;
    }

    if (maxLevelBoundary === ''){
        maxLevelBoundary = 25;
    }

    filteredBestiaryTable = filteredBestiaryTable.filter((entry) => entry.level <= maxLevelBoundary && entry.level >= minLevelBoundary);


    return (
        <div>
        <h1>Bestiary Table</h1>
        
        <Select 
            closeMenuOnSelect={false}
            isMulti
            isSearchable
            onChange={setTraitsSelect}
            options={traitsList} 
        />

        <input type="number" placeholder="Min Level" onChange={(x) => minLevelHandler(x.target.value)} value={minLevel} />
        <input type="number" placeholder="Max Level" onChange={(x) => maxLevelHandler(x.target.value)} value={maxLevel}/>

        <table>
            <tr>
                <th onClick={() => sortHandler("name")}>Name</th>
                <th onClick={() => sortHandler("level")}>Level</th>
                <th>Traits</th>
            </tr>
            
            {filteredBestiaryTable.sort((a, b) =>{
                if(sortBestiaryDirection === "asc"){
                    if(a[sortBestiaryType] < b[sortBestiaryType]){
                        return -1;
                    }
                }else{
                    if(a[sortBestiaryType] > b[sortBestiaryType]){
                        return -1;
                    }
                }
            }).map(tableEntry =>(
            <tr onClick={() => addEncounterClickHandler(tableEntry)}>
                <td>{tableEntry.name}</td>
                <td>{tableEntry.level}</td>
                <td>{
                tableEntry.traits.map(traitsEntry =>(
                    <span>{traitsEntry.name} </span>
                ))
                }</td>
            </tr>
            ))}
            

        </table>
        </div>
    )
}

export default BestiaryTable;