const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      devs: [],
    },
    actions: {
      saveDev: (devData) => {
        const store = getStore();
        setStore({ ...store }, store.devs.push(devData));
      },
    },
  };
};
export default getState;
