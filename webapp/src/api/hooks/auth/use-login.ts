import { useCallback, useState } from "react";
import { login, ILoginRequest, IloginResponse } from "../../service/auth/login";

export function useLogin(): {
  loginUser: ({
    userLoginCredentials,
  }: {
    userLoginCredentials: ILoginRequest;
  }) => Promise<IloginResponse | undefined>;
  error: string | undefined;
  loading: boolean;
  clearError: () => void;
} {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const loginUser = useCallback(
    async ({
      userLoginCredentials,
    }: {
      userLoginCredentials: ILoginRequest;
    }): Promise<IloginResponse | undefined> => {
      setLoading(true);
      const sendSigninResponse = await login({
        userLoginCredentials,
      });
      setLoading(false);
      console.log(`sendSigninResponse`, sendSigninResponse);
      if (sendSigninResponse.response)
        return { ...sendSigninResponse.response };
      else
        setError(
          sendSigninResponse.error?.status === 401
            ? "Couldn't find your account."
            : "Internal Server Error. Please contact support."
        );
    },
    []
  );

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  return {
    loginUser,
    error,
    loading,
    clearError,
  };
}
