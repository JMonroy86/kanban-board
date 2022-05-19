import { getAllRols } from "../services/rols";
import {
  getAllDevs,
  getAllTagsUsers,
  getAllUsers,
  getOneUser,
  signIn,
  signUp,
} from "../services/user";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentUser: null,
      users: [],
      devs: [],
      devsTags: [],
      error: null,
      rols: [],
    },
    actions: {
      register: async (navigate) => {
        const res = await signUp();
        if (res.message) {
          setStore({ error: res.response.data.message });
        } else {
          sessionStorage.setItem("auth", JSON.stringify(res));
          setStore({ currentUser: res });
          setTimeout(() => {
            navigate("/dashboard/main");
          }, 3000);
        }
      },
      login: async (data, navigate) => {
        const res = await signIn(data);
        if (res.message) {
          setStore({ error: res.response.data.message });
        } else {
          sessionStorage.setItem("auth", JSON.stringify(res));
          setStore({ currentUser: res });
          setTimeout(() => {
            navigate("/dashboard/main");
          }, 3000);
        }
      },
      revalidate: (userData) => {
        setStore({ currentUser: userData });
      },
      getAllUsers: async () => {
        const store = getStore();
        const users = await getAllUsers(store.currentUser?.accessToken);
        setStore({ users: users });
      },
      getAllDevs: async () => {
        const store = getStore();
        const devs = await getAllDevs(store.currentUser?.accessToken);
        setStore({ devs: devs });
      },
      getAllTagsUsers: async () => {
        const store = getStore();
        const devs = await getAllDevs(store.currentUser?.accessToken);
        setStore({ devsTags: devs });
      },
      filterUsers: async (id) => {
        const store = getStore();
        const user = await getOneUser(id, store.currentUser?.accessToken);
        setStore({ devs: user });
      },
      getRols: async () => {
        const store = getStore();
        const rols = await getAllRols(store.currentUser?.accessToken);
        setStore({ rols: rols });
      },
    },
  };
};
export default getState;
