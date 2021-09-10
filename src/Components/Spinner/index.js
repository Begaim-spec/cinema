import React from 'react';

const Spinner = ({isLoading}) => {

    return (
        <div key={isLoading}>
            <div className="text-center margin o auto">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;