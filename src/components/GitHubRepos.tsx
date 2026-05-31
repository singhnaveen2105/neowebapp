"use client";

import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export default function GitHubRepos({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    )
      .then((res) => res.json())
      .then((data: Repo[]) => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="py-8 text-center text-gray-600 dark:text-gray-400">
        Loading repositories...
      </div>
    );
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 dark:bg-gray-900" id="repos">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          My GitHub Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {repo.name}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                {repo.description || "No description"}
              </p>
              <div className="flex items-center justify-between text-sm">
                {repo.language && (
                  <span className="text-blue-600 dark:text-blue-400">
                    {repo.language}
                  </span>
                )}
                <span className="text-gray-500">⭐ {repo.stargazers_count}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
