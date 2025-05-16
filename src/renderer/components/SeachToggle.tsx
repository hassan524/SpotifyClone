import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchToggle = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <div
            ref={ref}
            className="relative flex items-center gap-2"
        >
            {/* Search Icon Button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="text-white cursor-pointer p-2 rounded-full hover:bg-white/10 transition"
                >
                    <Search size={40} />
                </button>
            )}

            {/* Animated Search Input */}
            <AnimatePresence>
                {open && (
                    <motion.input
                        key="search"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 300, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        autoFocus
                        placeholder="Search in playlist"
                        className="absolute text-xl tracking-wider right-0 px-4 py-4 rounded-md shadow outline-none text-white placeholder-white"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // soft white transparent background
                            backdropFilter: 'blur(8px)', // optional: gives that frosted glass effect
                        }}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

export default SearchToggle;
