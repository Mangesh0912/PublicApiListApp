import React from 'react';

const ErrorComponent = (error) => {

    const { error: errorMsg } = error

    return(
        <div className="error">{errorMsg.message}</div>
    )
}

export default ErrorComponent;