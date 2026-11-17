const pretty = (o) => o.replaceAll("_", " ");

const Dropdown = ({ title, option, value, func }) => {
  return (
    <label className="select">
      <span className="sr-only">{title}</span>
      <select value={value ?? ""} onChange={func} name={title} aria-label={title}>
        {value === undefined && (
          <option value="" disabled>
            {title}
          </option>
        )}
        {option.map((o) => (
          <option key={o} value={o}>
            {pretty(o)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
