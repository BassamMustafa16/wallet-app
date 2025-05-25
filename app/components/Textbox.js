export default function Textbox({id, type, placeholder, name}) {
  return <div>
    <input id={id} type={type} placeholder={placeholder} name={name} className="border rounded-xl p-2 w-full" required></input>
  </div>;
}
