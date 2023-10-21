interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  error: string;
}

const FormField = ({
  label,
  id,
  name,
  onChange,
  onBlur,
  value,
  error,
}: FormFieldProps) => (
  <div>
    <label htmlFor={id}>{label}:</label>
    <input
      type="text"
      id={id}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      readOnly={name === "email" || name === "gender"}
    />
    {error && <div>{error}</div>}
  </div>
);

export default FormField;
