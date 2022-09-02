import {
  ArrowPathIcon,
  ArrowUturnDownIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import {
  useContract,
  useContractCall,
  useContractData,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React from "react";
import toast from "react-hot-toast";
import { currency } from "../constants";

function AdminControls() {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const { data: totalCommission } = useContractData(
    contract,
    "operatorTotalCommission"
  );
  const { mutateAsync: DrawWinnerTicket } = useContractCall(
    contract,
    "DrawWinnerTicket"
  );
  const { mutateAsync: RefundAll } = useContractCall(contract, "RefundAll");
  const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");
  const { mutateAsync: WithdrawCommission } = useContractCall(
    contract,
    "WithdrawCommission"
  );

  const drawWinner = async () => {
    const notification = toast.loading("Picking a lucky winner...");
    try {
      const data = await DrawWinnerTicket([{}]);
      toast.success("A Winner has been selected!", {
        id: notification,
      });
      console.info("Contract call success", data);
    } catch (err) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
    }
  };
  const onWithdrawCommission = async () => {
    const notification = toast.loading("Withdrawing commission...");

    try {
      const data = await WithdrawCommission([{}]);
      toast.success("Your Commission has been withdran successfully!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Whoops something went wrong", {
        id: notification,
      });
    }
  };
  const onRestartDraw = async () => {
    const notification = toast.loading("Restarting Draw...");
    try {
      const data = await restartDraw([{}]);
      toast.success("Draw restarted successfully!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
    }
  };
  const onRefaundAll = async () => {
    const notification = toast.loading("Refunding all...");
    try {
      const data = await RefundAll([{}]);
      toast.success("All refunded successfully!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });
    }
  };
  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
      <h2 className="font-bold">Admin Controls</h2>
      <p className="mb-5">
        Total commission to be withdraw:{" "}
        {totalCommission &&
          ethers.utils.formatEther(totalCommission?.toString())}{" "}
        {currency}
      </p>
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <button
          onClick={drawWinner}
          className="admin-button hover:bg-emerald-500/2"
        >
          <StarIcon className="h-6 mx-auto mb-2" /> Draw Winner
        </button>
        <button
          onClick={onWithdrawCommission}
          className="admin-button hover:bg-emerald-500/2"
        >
          <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
          Withdraw Commission
        </button>
        <button
          onClick={onRestartDraw}
          className="admin-button hover:bg-emerald-500/2"
        >
          <ArrowPathIcon className="h-6 mx-auto mb-2" /> Restart Draw
        </button>
        <button
          onClick={onRefaundAll}
          className="admin-button hover:bg-emerald-500/2"
        >
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" /> Refund All
        </button>
      </div>
    </div>
  );
}

export default AdminControls;
