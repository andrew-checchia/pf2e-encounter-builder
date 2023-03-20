import React from 'react';

const EncounterTable = ({encounterList, removeEncounterHandler, encounterXP, threatLevel}) =>{

    const removeClickHandler = (encounterKey) => {
        removeEncounterHandler(encounterKey);
    }

    if(encounterList.length != 0){
        return(
            <div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Family</th>
                        <th></th>
                    </tr>

                {encounterList.map(tableEntry =>(
                <tr>
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
    }
}

export default EncounterTable;