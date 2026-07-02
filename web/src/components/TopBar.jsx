export default function TopBar() {
  return (
    <header className="hidden md:flex justify-between items-center px-6 h-20 w-full bg-surface-container-lowest border-b border-outline-variant shadow-sm sticky top-0 z-10">
      {/* Search */}
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl">search</span>
          <input
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all outline-none"
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-6 w-1/3">
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
        <div className="h-8 w-px bg-outline-variant mx-2"></div>
        <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-lg ring-2 ring-transparent hover:ring-primary-container transition-all cursor-pointer">
          RM
        </div>
      </div>
    </header>
  );
}
