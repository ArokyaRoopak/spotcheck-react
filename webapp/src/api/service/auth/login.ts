import { Api } from "../..";
import { CustomError } from "../../util/custom-error";

export interface IloginResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export const login = async ({
  userLoginCredentials,
}: {
  userLoginCredentials: ILoginRequest;
}): Promise<{
  response?: IloginResponse;
  error?: CustomError;
}> => {
  try {
    const response = await Api.getInstance().post<
      ILoginRequest,
      IloginResponse
    >(`users/login`, userLoginCredentials);
    console.log(`response`, response);
    return { response };
  } catch (error) {
    console.log(`error`, error);

    return { error: error as CustomError };
  }
};
