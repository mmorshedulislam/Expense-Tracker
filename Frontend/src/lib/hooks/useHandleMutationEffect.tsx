import { useEffect } from "react";
import { toast } from "react-hot-toast";

type UseHandleMutationEffectProps = {
  isLoading: boolean;
  isError?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  isSuccess: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export const useHandleMutationEffect = ({
  isLoading,
  isError,
  error,
  isSuccess,
  data,
}: UseHandleMutationEffectProps): void => {
  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "loading-toast" });
    } else {
      toast.dismiss("loading-toast");
    }

    if (isError) {
      const errorMessage =
        error?.data?.message || error?.message || "An error occurred";
      toast.error(errorMessage, { id: "error-toast" });
    }

    if (isSuccess) {
      toast.success(data?.message || "Operation successful!", {
        id: "success-toast",
      });
    }
  }, [isLoading, isError, error, isSuccess, data]);
};
