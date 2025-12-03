import { ENV } from "@/configs/environment";

const IsDevelopment = ENV.MODE === "development";
const BASE_PATH = "/citation-checker";

export const PATH = {
	NOT_FOUND: "/404",
	HOME: IsDevelopment ? "/" : `${BASE_PATH}/`,
	RESULT: IsDevelopment ? "/results" : `${BASE_PATH}/results`,
	START: IsDevelopment ? "/start" : `${BASE_PATH}/start`,
	HISTORY: IsDevelopment ? "/history" : `${BASE_PATH}/history`,
	REFERENCES: IsDevelopment ? "/references" : `${BASE_PATH}/references`,
	PRIVATE: "/guard/ex",
	ASSET_URL: IsDevelopment ? "" : `${BASE_PATH}`,
};
