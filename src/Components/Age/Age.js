import React from 'react';

const Age = ({actor}) => {

    function calculate_age (dob) {
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    return (
        <div>
                <p onChange={calculate_age}>{actor.gender}</p>
        </div>
    );
};

export default Age;