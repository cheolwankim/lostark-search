interface Props {
  name: string;
  level: string;
}

export default function EngravingCard({ name, level }: Props) {
  return (
    <div className="flex justify-between items-center text-sm px-3 py-1 border rounded bg-white shadow-sm">
      <span className="text-gray-800">{name}</span>
      <span className="font-semibold text-blue-700">{level}</span>
    </div>
  );
}
