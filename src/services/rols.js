import axios from "axios";

export const getAllRols = async (token) => {
  try {
    const res = await axios.get("http://localhost:5000/api/rols/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
