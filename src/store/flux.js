import { getAllRols } from "../services/rols";
import { getAllStatus } from "../services/status";
import { getAllTasks } from "../services/tasks";
import {
  createPsw,
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
      tasks: [],
      devsTags: [],
      error: null,
      rols: [],
      devsTask: [],
      status: [],
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
      createPsw: async (data) => {
        const res = await createPsw(data);
        if (res.message) {
          return res
        } else {
          sessionStorage.setItem("auth", JSON.stringify(res));
          setStore({ error: null, currentUser: res });
          return res
        }
      },
      login: async (data, navigate) => {
        const res = await signIn(data);
        if (res.message) {
          setStore({ error: res.response.data.message });
        } else {
          sessionStorage.setItem("auth", JSON.stringify(res));
          setStore({ error: null, currentUser: res });
          setTimeout(() => {
            navigate("/dashboard/main");
          }, 3000);
        }
      },
      logout: (navigate) =>{
        sessionStorage.clear();
        setStore({ error: null, currentUser: null });
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
        const devs = await getOneUser(id, store.currentUser?.accessToken);
        setStore({ devsTask: devs });
      },
      getRols: async () => {
        const store = getStore();
        const rols = await getAllRols(store.currentUser?.accessToken);
        setStore({ rols: rols });
      },
      getAllTasks: async () => {
        const store = getStore();
        const devs = await getAllTasks(store.currentUser?.accessToken);
        setStore({ devsTask: devs });
      },
      getAllStatus: async () => {
        const store = getStore();
        const status = await getAllStatus(store.currentUser?.accessToken);
        setStore({ status: status });
      },
    },
  };
};
export default getState;
