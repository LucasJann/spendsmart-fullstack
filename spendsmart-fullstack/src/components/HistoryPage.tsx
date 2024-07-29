import night from "../images/night.jpg";
const HistoryPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${night})` }}
    >
      <section className="mas-w-sm w-2/4 bg-black bg-opacity-60 rounded-md text-white">Oi</section>
    </div>
  );
};

export default HistoryPage;
