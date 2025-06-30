import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Exam = { id: string; title: string; subject: string };

const ExamListPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/exams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setExams(data.exams);
    };
    fetchExams();
  }, []);

  return (
    <div className="container max-w-2xl mx-auto p-4 rounded shadow bg-background text-foreground border border-border transition-colors duration-300">
      <h2 className="font-valky text-xl text-accent mb-4">Danh sách kỳ thi</h2>
      {exams.length === 0 ? (
        <p className="text-muted-foreground">Không có kỳ thi nào.</p>
      ) : (
        <ul className="space-y-2">
          {exams.map((exam) => (
            <li
              key={exam.id}
              className="border border-border p-3 rounded bg-card text-card-foreground"
            >
              <div className="flex justify-between items-center">
                <span>
                  <strong>{exam.title}</strong> ({exam.subject})
                </span>
                <Link
                  to={`/exams/${exam.id}`}
                  className="underline text-accent hover:text-accent-foreground transition"
                >
                  Làm bài
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamListPage;
