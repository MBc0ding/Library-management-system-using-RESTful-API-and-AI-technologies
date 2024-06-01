import React from 'react';

const ProtectedPage = () => {
    return (
        <div>
            <h1>This is a protected page</h1>
            <p>Only authenticated users can see this.</p>
        </div>
    );
};

export default ProtectedPage;
