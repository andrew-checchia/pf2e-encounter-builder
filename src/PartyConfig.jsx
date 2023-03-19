import React, {useState} from 'react';

const PartyConfig = ({partyLevelHandler, partyLevel, partySizeHandler, partySize}) =>{
    
    return(
        <div>
            <div>
                Party Level: <input onChange={(x) => partyLevelHandler(x.target.value)} value={partyLevel} />
                Party Size: <input onChange={(x) => partySizeHandler(x.target.value)} value={partySize} />
            </div>
            <div>
                <h1>XP Allowance</h1>
            </div>
        </div>



    );
}

export default PartyConfig;