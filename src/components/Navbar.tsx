import React from 'react';

const Navbar =async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories")
    const data =await res.json()
    console.log(data)
    return (
        <div>
            
        </div>
    );
};

export default Navbar;