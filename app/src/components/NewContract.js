import { useState } from "react";

export function NewContract({ deploy, loading }) {
  const [data, setData] = useState({
    arbiter: "",
    beneficiary: "",
    value: "",
  });

  function handleInputChange({ target: { name, value } }) {
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleAmountChange({ target: { value } }) {
    const mask = /^[0-9]*\.?[0-9]*$/;

    if (mask.test(value))
      setData((prevState) => ({
        ...prevState,
        value: value,
      }));
  }

  return (
    <form noValidate className="contract">
      <h1> New Contract </h1>
      <label htmlFor="arbiter">
        Arbiter Address
        <input
          type="text"
          id="arbiter"
          name="arbiter"
          onChange={handleInputChange}
          value={data.arbiter}
        />
      </label>

      <label htmlFor="beneficiary">
        Beneficiary Address
        <input
          type="text"
          id="beneficiary"
          name="beneficiary"
          onChange={handleInputChange}
          value={data.beneficiary}
        />
      </label>

      <label htmlFor="value">
        Deposit Amount (in ETH)
        <input
          type="number"
          id="value"
          name="value"
          onChange={handleAmountChange}
          value={data.value}
        />
      </label>

      <button
        className={`button ${loading && "button-disable"}`}
        id="deploy"
        type="submit"
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();

          deploy(data);
        }}
      >
        {!loading ? "Deploy" : "Deploying..."}
      </button>
    </form>
  );
}
