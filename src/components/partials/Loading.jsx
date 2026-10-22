const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-primary">
      <div className="relative grid size-16 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-secondary/30"></span>
        <span className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-secondary to-fuchsia-500 text-3xl text-white shadow-xl shadow-secondary/40">
          <i className="ri-remix-line"></i>
        </span>
      </div>
      <p className="text-sm font-medium tracking-[0.25em] text-zinc-500 uppercase">Loading</p>
    </div>
  )
}

export default Loading
