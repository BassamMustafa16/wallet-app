export default function TransactionCard() {
  return (
    <div className="flex flex-col gap-1 p-5 border rounded-xl">
      <h2 className="text-3xl font-semibold">15,000.56</h2>
      <div className="flex flex-row gap-2">
        <h3 className="">Cash</h3> - <h3 className="">Expense</h3>
      </div>
      <h4>15/04/2025</h4>
    </div>
  );
}
