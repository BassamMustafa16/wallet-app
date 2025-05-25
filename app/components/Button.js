import { useRouter } from "next/navigation";

export default function Button({ content, type, to }) {
  const router = useRouter();

  const handleClick = (e) => {
    if (to) {
      e.preventDefault();
      router.push(to);
    }
  };

  return (
    <button
      className="border p-2 rounded-xl flex-1"
      type={type}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}