import { useEffect, useState } from "react";
import Input from "./Input";

const user = localStorage.getItem("user")?.replace(/"/g, "");
const formatBalance = (value: number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return formatter.format(value / 100);
};

const Balance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [initialBalance, setInitialBalance] = useState<number>(0);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  useEffect(() => {
    const balanceValue = async () => {
      try {
        const balanceResponse = await fetch(
          `http://localhost:8080/balance/${user}`
        );

        if (!balanceResponse.ok) {
          throw new Error(
            `Failed to fetch balance data. Status: ${balanceResponse.status}`
          );
        }
        const balanceJson = await balanceResponse.json();
        if (balanceJson.balance === "0") {
          return setShowBalanceModal(true);
        }

        setBalance(balanceJson.balance);
      } catch (err) {
        console.error(err);
      }
    };
    balanceValue();
  }, []);

  const getBalanceTextColor = () => {
    if (balance === null) {
      return;
    }

    if (balance > 0) {
      return "text-green-300";
    } else if (balance < 0) {
      return "text-red-300";
    }
    return "text-gray-300";
  };

  const submitHandler = async () => {
    await fetch(`http://localhost:8080/balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, balance: initialBalance }),
    });
    setShowBalanceModal(false);
    window.location.reload();
  };

  return (
    <>
      <Input
        id="balance"
        type="text"
        name="balance"
        value={formatBalance(balance)}
        disabled={true}
        className={`w-full mr-5 text-right rounded-md shadow-sm focus:ring-0 border-transparent ${getBalanceTextColor()} bg-transparent text-md`}
      />
      {showBalanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 bg-white shadow-mg rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Definir saldo</h2>
            <input
              type="string"
              value={formatBalance(initialBalance)}
              className="w-full border px-3 py-2 mb-4 rounded text-gray-800"
              onChange={(e) => {
                const targetValue = e.target.value;
                const numericValue =
                  parseInt(targetValue.replace(/[^0-9]/g, ""), 10) || 0;
                setInitialBalance(numericValue);
              }}
              placeholder="Digite seu saldo inicial"
            />
            <button
              onClick={submitHandler}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Balance;
