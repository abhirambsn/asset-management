import { Skeleton } from "../ui/skeleton";

const LoaderSkeleton = () => {
  return (
    <section>
      <Skeleton className="w-[200px] h-full bg-sidebar" />
      <Skeleton className="w-full" />
    </section>
  );
};

export default LoaderSkeleton;
