interface Props {
  title: string;
  label: string;
  type: "date" | "week" | "month";
  value: string;
  onChange: (value: string) => void;
}

export default function PeriodSelector({ title, label, type, value, onChange }: Props) {
  return (
    <div className="card">
      <h1>{title}</h1>

      <div className="form-group">
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}