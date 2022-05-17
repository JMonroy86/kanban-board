import { signUp } from "../services/user/singUp";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: null,
      devs: [],
    },
    actions: {
      register: async (data) => {
        setStore({ user: await signUp(data) });
      },
      saveDev: (devData) => {
        const store = getStore();
        setStore({ ...store }, store.devs.push(devData));
      },
    },
  };
};
export default getState;
