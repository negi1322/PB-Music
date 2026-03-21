export const InputField = ({ label, type, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>
      <input
        type={type}
        className="form-control custom-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
