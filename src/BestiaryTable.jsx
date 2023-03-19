import React, {useState} from 'react';
import BestiaryTableData from './bestiary.json';

const BestiaryTable = ({addEncounterHandler}) => {

    const [bestiaryTable, setBestiaryTable] = useState(BestiaryTableData);
    const [sortBestiary, setSortBestiary] = useState("name");

    const clickHandler = (tableEntry) => {
        addEncounterHandler(tableEntry);
    }

    return (
        <div>
        <h1>Bestiary Table</h1>
        <table>
            <tr>
                <th onClick={() => setSortBestiary("name")}>Name</th>
                <th onClick={() => setSortBestiary("level")}>Level</th>
                <th>Traits</th>
            </tr>
            
            {bestiaryTable.sort((a, b) =>{
                if(a[sortBestiary] < b[sortBestiary]){
                    return -1;
                }
            }).map(tableEntry =>(
            <tr onClick={() => clickHandler(tableEntry)}>
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