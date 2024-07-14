import Escrow from "../Escrow";

export function ExistingContract({ escrows = [] }) {
  return (
    <div className="existing-contracts">
      <h1> Existing Contracts </h1>
      <div id="container">
        {escrows.map((escrow) => {
          return <Escrow key={escrow.address} {...escrow} />;
        })}
      </div>
    </div>
  );
}
