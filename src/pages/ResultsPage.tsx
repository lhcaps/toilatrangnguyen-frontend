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
    <>
      <h2 className="font-valky text-xl mb-4">Kết quả các kỳ thi</h2>
      <ul className="space-y-2">
        {results.map(r => (
          <li key={r.id} className="border p-2 rounded">
            Kỳ thi: {r.examId} | Điểm: {r.score} | Nộp lúc: {new Date(r.submitTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ResultsPage;
