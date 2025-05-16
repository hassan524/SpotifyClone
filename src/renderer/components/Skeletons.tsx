import { Skeleton } from './ui/skeleton';

export const PlaylistSkeleton = () => (
    <div className="flex items-center gap-4 rounded-lg px-5 py-3">
        <Skeleton className="w-[70px] h-[70px] rounded-md bg-[#252323]" />
        <div className="flex flex-col flex-1 gap-2">
            <Skeleton className="h-6 bg-[#252323] w-3/4 rounded-xl" />
            <Skeleton className="h-4 bg-[#252323] w-1/2 rounded-xl" />
        </div>
    </div>
);


export const TracksSkeleton = () => {
  return (
    <div className="flex items-center gap-6 py-3 px-4 text-2xl">
      {/* Index Placeholder */}
      <div className="w-[5%]">
        <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
      </div>

      {/* Image + Text */}
      <div className="w-[50%] flex gap-4 items-center">
        <Skeleton className="h-[70px] w-[70px] rounded-md bg-white/10" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[180px] rounded bg-white/10" />
          <Skeleton className="h-4 w-[120px] rounded bg-white/10" />
        </div>
      </div>

      {/* Date */}
      <div className="w-[32%]">
        <Skeleton className="h-4 w-[100px] rounded bg-white/10" />
      </div>

      {/* Duration */}
      <div className="w-[13%] flex justify-end">
        <Skeleton className="h-4 w-[50px] rounded bg-white/10" />
      </div>
    </div>
  );
};
