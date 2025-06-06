import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(`/characters/${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-5">
      <h1 className="text-3xl font-bold mb-6">로스트아크 캐릭터 검색</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 w-full max-w-md"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="캐릭터 이름을 입력하세요"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>
    </div>
  );
}
