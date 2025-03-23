import axios, { AxiosResponse } from "axios";

// 배포된 백엔드 주소로 변경
const apiServer: string = "https://api.ssdw.store";

export const customAxios = axios.create({
  baseURL: apiServer,
});

export const fetcherWithToken = async (
  accessToken: string | null,
  url: string
): Promise<any> => {
  const response: AxiosResponse = await customAxios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export const postWithToken = async (
  accessToken: string | null,
  url: string,
  data: any
): Promise<any> => {
  const response: AxiosResponse = await customAxios.post(url, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export const putWithToken = async (
  accessToken: string | null,
  url: string,
  data: any
): Promise<any> => {
  const response: AxiosResponse = await customAxios.put(url, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

export const deleteWithToken = async (
  accessToken: string | null,
  url: string
): Promise<any> => {
  const response: AxiosResponse = await customAxios.delete(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};
