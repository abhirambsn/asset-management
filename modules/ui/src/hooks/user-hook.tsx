import { useQuery } from "@tanstack/react-query";
import { useEndpoint } from "./endpoint-hook";
import { useAuthStore } from "@/store/auth-store";

const useUser = () => {
  const { userService } = useEndpoint();
  const { token, isAuthenticated } = useAuthStore();

  const fetchUser = async () => {
    if (!isAuthenticated) return null;
    const user = await userService.getUser(token);
    return user;
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading || isError) {
    if (error) console.log(`Error: ${error}`);
    return null;
  }

  return data;
};

export default useUser;
