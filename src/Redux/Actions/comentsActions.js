import axios from "axios";

export const addComents = (coment) => {
    return {
      type: 'ADD_COMENT',
      coment
    };
  };