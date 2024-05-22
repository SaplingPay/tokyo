import { Home, Search, Settings, User } from "lucide-react"
import Link from "next/link"

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-sm dark:bg-gray-950 dark:border-gray-800">
      <nav className="flex items-center justify-around p-2">
        <Link
          className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          href="/"
        >
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          href="/search"
        >
          <Search className="h-6 w-6" />
          <span className="text-xs">Search</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          href="/profile"
        >
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          href="#"
        >
          <Settings className="h-6 w-6" />
          <span className="text-xs">Settings</span>
        </Link>
      </nav>
    </div>
  )
}