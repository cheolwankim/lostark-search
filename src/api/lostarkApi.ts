import axios from "axios";

const API_BASE_URL = "https://developer-lostark.game.onstove.com";
const API_KEY = process.env.REACT_APP_LOSTARK_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 원정대(보유 캐릭터) 조회
export const getCharacterProfile = async (name: string) => {
  const res = await axiosInstance.get(`/characters/${name}/siblings`);
  return res.data;
};

// 캐릭터 상세 정보 조회
export const getCharacterDetail = async (name: string) => {
  const res = await axiosInstance.get(`/armories/characters/${name}`);
  return res.data;
};

//캐릭터 이미지 조회
export const getCharacterProfileImage = async (name: string) => {
  const res = await axiosInstance.get(`/armories/characters/${name}/profiles`);
  return res.data;
};
