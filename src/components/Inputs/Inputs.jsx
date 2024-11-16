import styled from "styled-components";

const Inputs = ({ value, onChange, placeholder, error, type = "text" }) => {
  return (
    <StyledWrapper>
      <div className="input-group">
        <input
          required
          type={type}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className={`input ${error ? "input-error" : ""}`}
        />
        <label className="user-label">{placeholder}</label>
        {error && <p className="error-text">{error}</p>}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .input {
    border: 1.5px solid #9e9e9e;
    border-radius: 1rem;
    background: none;
    padding: 1rem;
    width: 100%;
    font-size: 1rem;
    color: black;
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .user-label {
    position: absolute;
    left: 15px;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input:focus,
  .input:valid {
    outline: none;
    border: 2px solid #30847f;
  }

  .input:focus ~ .user-label,
  .input:valid ~ .user-label {
    transform: translateY(-50%) scale(0.8);
    background-color: white;
    padding: 0 0.2em;
    color: black;
  }

  .error-text {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .input-error {
    border-color: red;
  }
`;

export default Inputs;
