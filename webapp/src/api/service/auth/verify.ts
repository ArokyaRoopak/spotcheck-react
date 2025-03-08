import { Api } from "../..";
import { CustomError } from "../../util/custom-error";
import { IloginResponse } from "./login";

export const verify = async (): Promise<{
  response?: IloginResponse;
  error?: CustomError;
}> => {
  try {
    const response = await Api.getInstance().get<IloginResponse>(
      `users/verify`
    );
    console.log(`response`, response);
    return { response };
  } catch (error) {
    console.log(`error`, error);

    return { error: error as CustomError };
  }
};
