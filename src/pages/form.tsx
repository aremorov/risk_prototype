import React, { useState } from "react";

type FormProps = {
  troops: string;
  setTroops: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: string;
};

const Form: React.FC<FormProps> = ({ troops, setTroops, handleSubmit }) => {
  return (
    <div>
      <form>
        <label>
          Troops Attacking:
          <input
            type="text"
            value={troops}
            onChange={(e) => setTroops(e.target.value)}
            required
          />
        </label>
        <input type="submit" />
      </form>
      {troops}
    </div>
  );
};

export default Form;
