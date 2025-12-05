import axios from "axios";

const API_URL = "http://localhost:8080/fines";

export const getAllFines = async () => {
  const response = await axios.get(`${API_URL}/all-fines`);
  return response.data;
};

export const exonerateFine = async (request) => {
  const response = await axios.put(`${API_URL}/exone-fine`, request);
  return response.data;
};
