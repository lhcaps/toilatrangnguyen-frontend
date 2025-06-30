import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Question = { id: string; content: string; options: string[] };
type Answer = { questionId: string; answer: string };

const ExamPage: React.FC = () => {
  const { id } = useParams();

  const [exam, setExam] = useState<{ title: string; questions: Question[] } | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchExam = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setExam(data.exam);
    };
    fetchExam();
  }, [id]);

  const handleAnswer = (qid: string, ans: string) => {
    setAnswers(prev => [
      ...prev.filter(a => a.questionId !== qid),
      { questionId: qid, answer: ans }
    ]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/exams/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    if (data.success) alert(`Bạn đạt ${data.score} điểm`);
    else alert(data.message || "Nộp bài thất bại");
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 rounded shadow bg-background text-foreground transition-colors duration-300">
      <h2 className="font-valky text-xl text-center text-accent mb-4">
        {exam?.title}
      </h2>

      {exam?.questions.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold mb-2">{q.content}</p>
          <div className="space-y-1">
            {q.options.map((opt, idx) => (
              <label key={idx} className="block cursor-pointer">
                <input
                  type="radio"
                  name={q.id}
                  onChange={() => handleAnswer(q.id, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      {exam && (
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-accent text-accent-foreground py-2 rounded hover:opacity-90 transition"
        >
          Nộp bài
        </button>
      )}
    </div>
  );
};

export default ExamPage;
