import axios from "axios";

export const getAllStatus = async (token) =>{
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/status/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data
  } catch (error) {
    throw error;
  }
}