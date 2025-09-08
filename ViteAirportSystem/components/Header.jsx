export default function Header() {
  return (
    <div className="fixed  top-0 left-0 w-full bg-gray shadow p-4">
      <div className="grid grid-flow-col gap-1 w-full">
        <section className="flex pl-12">Система Аеропорту "Воля"</section>
        <div className="flex gap-[12px] ml-auto mr-[20px]">
          <a href="/" className="hover:text-gray-300">Головна</a>
          <a href="/flights" className="hover:text-gray-300">Польоти</a>
          <a href="/support" className="hover:text-gray-300">Підтримка</a>
        </div>
        
      </div>
    </div>
  );
}
