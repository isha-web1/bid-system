

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0F172A] text-white z-50">
      {/* Spinning Border Circle */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-t-[#9F62E2] border-b-[#9F62E2] border-l-transparent border-r-transparent animate-spin-slow"></div>
      </div>

      {/* Logo Text */}
      <h1 className="mt-6 text-3xl font-bold tracking-wide animate-pulse">
        Bid<span className="text-[#9F62E2]">System</span>
      </h1>

      {/* Loading Dots */}
      <div className="flex mt-3 gap-1">
        <span className="dot bg-[#9F62E2]"></span>
        <span className="dot bg-[#9F62E2]"></span>
        <span className="dot bg-[#9F62E2]"></span>
      </div>
    </div>
  )
}

export default Loading