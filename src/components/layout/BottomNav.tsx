import { useLocation, useNavigate } from "react-router-dom";
import { Map, Bookmark, Settings } from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: "/", label: "Explore", icon: Map },
  { path: "/saved", label: "My Saved", icon: Bookmark },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav shadow-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`bottom-nav-item touch-target ${isActive ? "active" : ""}`}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <motion.div
              initial={false}
              animate={isActive ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <span className="text-sm font-medium">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
