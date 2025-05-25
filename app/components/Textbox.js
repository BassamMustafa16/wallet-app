export default function Textbox({
  id,
  type,
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="border rounded-xl p-2 w-full"
        required
      ></input>
    </div>
  );
}
