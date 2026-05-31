export default function Footer() {
  return (
    <footer className="border-t border-gray-200/50 bg-white dark:border-gray-700/50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500 sm:px-6 lg:px-8 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Naveen Singh. All rights reserved.</p>
      </div>
    </footer>
  );
}
