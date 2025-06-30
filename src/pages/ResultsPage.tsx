import React, { useEffect, useState } from "react";

type Result = { id: string; examId: string; score: number; submitTime: string };

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/results", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setResults(data.results);
    };
    fetchResults();
  }, []);

  return (
    <div className="container max-w-2xl mx-auto p-4 rounded shadow bg-[var(--card)] text-[var(--foreground)] transition">
      <h2 className="font-valky text-xl text-[var(--accent)] mb-4">Kết quả các kỳ thi</h2>

      {results.length === 0 ? (
        <p className="text-[var(--muted-foreground)]">Chưa có kết quả nào.</p>
      ) : (
        <ul className="space-y-2">
          {results.map(r => (
            <li
              key={r.id}
              className="border p-3 rounded bg-[var(--muted)] border-[var(--border)]"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span><strong>Kỳ thi:</strong> {r.examId}</span>
                <span><strong>Điểm:</strong> {r.score}</span>
                <span><strong>Nộp lúc:</strong> {new Date(r.submitTime).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsPage;
