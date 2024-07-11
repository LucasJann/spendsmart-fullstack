import beach from "../images/afternoon.jpg";
import Input from "./Input";

const Goals = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${beach})` }}
    >
      <form className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <div className="flex flex-col items-center bg-black bg-opacity-60 shadow-mg rounded-md text-gray-200 text-center p-2">
          <label htmlFor="currentBalance">Your balance</label>
          <Input
            id="currentBalance"
            name="currentBalance"
            type="number"
            value=""
            className="w-3/4 mb-4"
            disabled
          />
          <hr/>
          <label htmlFor="goalText">Describe your goal</label>
          <Input
            id="goalText"
            name="goalText"
            type="text"
            value=""
            className="w-3/4 mb-4"
          />
          <hr/>

          <label htmlFor="goalValue">Insert the goal's value</label>
          <Input
            id="goalValue"
            name="goalValue"
            type="text"
            value=""
            className="w-3/4 mb-4"
          />
          <hr/>
        </div>
      </form>
    </div>
  );
};

export default Goals;
