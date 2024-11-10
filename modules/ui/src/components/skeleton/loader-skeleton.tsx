import { Spinner } from "../ui/spinner";

const LoaderSkeleton = () => {
  return (
    <section className="w-screen h-screen flex items-center justify-center flex-col gap-2">
      <Spinner size="large" />
      <div className="flex flex-col gap-1 items-center justify-center">
        <h3 className="font-bold test-2xl">Loading</h3>
        <p className="opacity-90 text-sm">
          Please wait while the screens are loading...
        </p>
      </div>
    </section>
  );
};

export default LoaderSkeleton;
