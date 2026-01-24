import { User, Bell, Shield, Moon, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface SettingItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description?: string;
  onClick?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
}

function SettingItem({
  icon: Icon,
  label,
  description,
  onClick,
  toggle,
  toggleValue,
  onToggleChange,
}: SettingItemProps) {
  return (
    <button
      onClick={toggle ? undefined : onClick}
      className="w-full card-serene p-4 flex items-center gap-4 text-left"
    >
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-accent-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{label}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {toggle ? (
        <Switch checked={toggleValue} onCheckedChange={onToggleChange} />
      ) : (
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      )}
    </button>
  );
}

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border safe-area-inset-top">
          <div className="container py-4">
            <h1 className="font-serif text-xl font-bold">Settings</h1>
          </div>
        </header>

        {/* Profile section */}
        <div className="container py-6">
          <div className="card-serene p-6 flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              G
            </div>
            <div className="flex-1">
              <p className="font-serif text-lg font-bold">Guest User</p>
              <p className="text-sm text-muted-foreground">
                Sign in to sync your data
              </p>
            </div>
            <Button variant="outline">Sign In</Button>
          </div>

          {/* Settings groups */}
          <div className="space-y-6">
            {/* Account */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
                ACCOUNT
              </h2>
              <div className="space-y-2">
                <SettingItem
                  icon={User}
                  label="Profile"
                  description="Manage your account details"
                />
                <SettingItem
                  icon={Shield}
                  label="Family Circles"
                  description="Manage private sharing groups"
                />
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
                PREFERENCES
              </h2>
              <div className="space-y-2">
                <SettingItem
                  icon={Bell}
                  label="Notifications"
                  description="Tribute alerts and updates"
                  toggle
                  toggleValue={true}
                />
                <SettingItem
                  icon={Moon}
                  label="Dark Mode"
                  description="Reduce eye strain"
                  toggle
                  toggleValue={false}
                />
              </div>
            </div>

            {/* Support */}
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
                SUPPORT
              </h2>
              <div className="space-y-2">
                <SettingItem
                  icon={HelpCircle}
                  label="Help & FAQ"
                  description="Get answers to common questions"
                />
              </div>
            </div>
          </div>

          {/* App info */}
          <div className="mt-12 text-center">
            <img src={logo} alt="Grave Finder" className="w-12 h-12 mx-auto mb-2 opacity-70" />
            <p className="text-sm text-muted-foreground">Grave Finder v1.0.0</p>
            <p className="text-xs text-muted-foreground mt-1">
              Helping families find peace
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
