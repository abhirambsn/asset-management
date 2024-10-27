import { useQuery } from "@tanstack/react-query";
import { useEndpoint } from "./endpoint-hook";

const useUser = () => {
  const {userService} = useEndpoint();

  const fetchUser = async () => {
    const user = await userService.getUser();
    return user;
  }

  const {isLoading, isError, data, error} = useQuery({queryKey: ['user'], queryFn: fetchUser, staleTime: 1000 * 60 * 60});

  if (isLoading || isError) {
    if (error) console.log(`Error: ${error}`);
    return null;
  }

  return data;
}

export default useUser