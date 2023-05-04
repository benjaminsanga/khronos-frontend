import React from "react";

export default React.createContext({
    token: null,
    userInfo: null,
    accountType: null,
    login: (token, userInfo, tokenExpiration, accountType) => {},
    logout: () => {},
    expiration: null
});

