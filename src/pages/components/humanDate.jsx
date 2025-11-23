import React from 'react';

export default function HumanDate({ timestamp, classes }) {
    if (timestamp == "0001-01-01T00:00:00") {
        // None tracked
        return (
            <span className={ classes }>Unknown</span>
        )
    }

    var date = new Date(timestamp);
    
    return (
        <span className={ classes } data-hint={ date.toLocaleString() }>{ date.toLocaleDateString() }</span>
    );
}