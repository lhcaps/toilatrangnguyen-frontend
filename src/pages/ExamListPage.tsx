import React, { useEffect, useState } from "react";
type Exam = { id: string; title: string; subject: string };

const ExamListPage: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/exams", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setExams(data.exams);
    };
    fetchExams();
  }, []);

  return (
    <>
        <h2 className="font-valky text-xl mb-4">Danh sách kỳ thi</h2>
        <ul className="space-y-2">
            {exams.map((exam) => (
            <li key={exam.id} className="border p-2 rounded">
                {exam.title} ({exam.subject}) — 
                <a href={`/exams/${exam.id}`} className="underline ml-2">Làm bài</a>
            </li>
            ))}
        </ul>
    </>
  );
};

export default ExamListPage;
