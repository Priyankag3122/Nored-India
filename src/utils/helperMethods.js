export const isEmail = string => {
    // eslint-disable-next-line no-useless-escape
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (string.trim().match(regEx)) return true;
    else return false;
  };
  
  export const isEmpty = string => {
    if (string.trim() === "") return true;
    else return false;
  };