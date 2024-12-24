import { useState } from "react";
import React from "react"; // Import React explicitly


// Named export
export const useAuth = () => {
    const [user, setUser] = useState(null);
    // Define your logic for getting user and logout function
    return { user, logout: () => { } };
};