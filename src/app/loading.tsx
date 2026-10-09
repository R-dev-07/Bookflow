export default function Loading() {
  return (
    <div className="min-h-screen bg-[#10201D] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#C08A3E] flex items-center justify-center animate-pulse">
          <span className="text-2xl font-bold text-[#10201D]">B</span>
        </div>
        <div className="text-[#F4EFE3] text-sm font-medium tracking-wide animate-pulse">
          Loading BookFlow...
        </div>
      </div>
    </div>
  );
}
