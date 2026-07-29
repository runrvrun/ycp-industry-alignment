import { VERDICT_OPTS, VerdictKey } from "@/app/lib/taxonomy-data";

interface VerdictGroupProps {
  itemId: string;
  value: VerdictKey | null;
  onChange: (value: VerdictKey) => void;
}

export default function VerdictGroup({ itemId, value, onChange }: VerdictGroupProps) {
  return (
    <div className="verdicts" data-verdicts={itemId}>
      {VERDICT_OPTS.map((o) => {
        const inputId = `v_${itemId}_${o.k}`;
        return (
          <div className={`verdict ${o.k}`} key={o.k}>
            <input
              type="radio"
              name={`verdict_${itemId}`}
              id={inputId}
              value={o.k}
              checked={value === o.k}
              onChange={() => onChange(o.k)}
            />
            <label htmlFor={inputId}>
              <span className="dot"></span>
              {o.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
