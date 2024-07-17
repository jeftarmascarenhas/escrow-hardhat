export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  complete = false,
  buttonName = "Approve",
  handleApprove,
  loadingApprove = false,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} </div>
        </li>
        <button
          className={`${!complete ? "button" : "complete"} `}
          id={address}
          disabled={loadingApprove}
          onClick={(e) => {
            e.preventDefault();
            handleApprove();
          }}
        >
          {buttonName}
        </button>
      </ul>
    </div>
  );
}
