export default function Input({
  id,
  type,
  placeholder,
  name,
  value,
  onChange,
  defaultValue,
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
      className="border rounded-xl p-2 w-full"
      required
    ></input>
  );
}
