import axios from "axios";

export const signUp = async (formData) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/signUp",
      formData
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
