export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#10201D] p-10 lg:pl-80">
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <div className="space-y-3">
          <div className="h-10 w-64 bg-white/10 rounded-lg"></div>
          <div className="h-5 w-96 bg-white/5 rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-white/10 rounded-2xl p-6 border border-white/10">
              <div className="h-6 w-6 bg-white/20 rounded-md mb-4"></div>
              <div className="h-8 w-16 bg-white/20 rounded-md mb-2"></div>
              <div className="h-4 w-24 bg-white/10 rounded-md"></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-white/10 rounded-2xl border border-white/10 p-6"></div>
          <div className="h-96 bg-white/10 rounded-2xl border border-white/10 p-6"></div>
        </div>
      </div>
    </div>
  );
}
