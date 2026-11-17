const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-primary" role="status">
      <span className="spinner size-10"></span>
      <p className="text-xs font-bold tracking-[0.3em] text-ink-faint uppercase">Loading</p>
    </div>
  );
};

export default Loading;
