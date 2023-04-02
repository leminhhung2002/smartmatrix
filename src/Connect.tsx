import { shortenAddress } from "@usedapp/core";
import { useConnect } from "../../hooks/useConnect";

export default function Connect(): JSX.Element {
  const { connect, deactivate, activeProvider, account } = useConnect();
  return (
    <button
      onClick={() => (account ? deactivate() : activeProvider())}
      className="flex items-center justify-center px-6 py-1 transition-all bg-pink-600 rounded-full hover:bg-sky-500"
    >
      <span className="text-white flex mb-0.5">
        {account ? shortenAddress(account) : "Connect Wallet"}
      </span>
    </button>
  );
}
