import night from "../images/night.jpg";
const HistoryPage = () => {
  return (
    <div>
      <section
        className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${night})` }}

      ></section>
    </div>
  );
};

export default HistoryPage;
