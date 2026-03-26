
import { TailSpin } from 'react-loader-spinner';

const TopBar = ({ user, loading }) => {
    return (
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-50 h-20 bg-[#0b1326]/80 backdrop-blur-xl flex justify-between items-center px-8 border-b border-outline-variant/5">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-primary tracking-tight font-headline">Ledger of Light</h2>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden md:flex bg-surface-container-low items-center px-4 py-2 rounded-full border border-outline-variant/10 focus-within:border-primary/50 transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
                    <input className="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface placeholder:text-on-surface-variant/40 outline-none" placeholder="  Search analytics..." type="text" />
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-primary/60 hover:text-primary transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full border-2 border-surface"></span>
                    </button>



                    <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-primary/20">
                        <div className="w-full h-full flex items-center justify-center text-primary font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;