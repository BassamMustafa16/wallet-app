export default function Input({
  id,
  type,
  placeholder,
  name,
  value,
  onChange,
  defaultValue,
  min,
  step,
  required = true,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      defaultValue={defaultValue}
      min={min}
      step={step}
      className="border rounded-xl p-2 w-full"
      required={required}
    ></input>
  );
}
