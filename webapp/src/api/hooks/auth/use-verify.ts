import { useCallback, useState } from "react";
import { verify } from "../../service/auth/verify";
import { IloginResponse } from "../../service/auth/login";

export function useVerify(): {
  verifyUser: () => Promise<IloginResponse | undefined>;
  error: string | undefined;
  loading: boolean;
  clearError: () => void;
} {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const verifyUser = useCallback(async (): Promise<
    IloginResponse | undefined
  > => {
    setLoading(true);
    const sendSigninResponse = await verify();
    setLoading(false);
    if (sendSigninResponse.response) return { ...sendSigninResponse.response };
    else
      setError(
        sendSigninResponse.error?.status === 401
          ? "Couldn't find your account."
          : "Internal Server Error. Please contact support."
      );
  }, []);

  const clearError = useCallback(() => {
    setError(undefined);
  }, []);

  return {
    verifyUser,
    error,
    loading,
    clearError,
  };
}
