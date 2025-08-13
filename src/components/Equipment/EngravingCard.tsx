interface Props {
  name: string;
  level: string;
}

export default function EngravingCard({ name, level }: Props) {
  const isDebuff = name.includes("감소");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "8px",

        lineHeight: "1.2",
        padding: "0px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          minWidth: "1.5em",
          fontSize: "8px",
          marginRight: "4px",
        }}
      >
        {name}
      </span>
      <span
        className={`font-semibold ${
          isDebuff ? "text-red-500" : "text-blue-700"
        }`}
      >
        {level}
      </span>
    </div>
  );
}
