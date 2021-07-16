import axios, {AxiosInstance, CancelTokenStatic} from "axios";

export interface GifterApi extends AxiosInstance {
    CancelToken: CancelTokenStatic;
    isCancel(value: any): boolean;
}

const Api = axios.create({
    baseURL: "https://" + process.env.NEXT_PUBLIC_API_ENDPOINT
}) as GifterApi;

Api.CancelToken = axios.CancelToken;
Api.isCancel = axios.isCancel;

export default Api;
