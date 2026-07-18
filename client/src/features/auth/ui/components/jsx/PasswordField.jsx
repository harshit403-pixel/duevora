import InputField from "./InputField";

export default function PasswordField({ value, onChange }) {
  return (
    <InputField
      label="PASSWORD"
      type="password"
      name="password"
      placeholder="Enter your password"
      icon="lock"
      value={value}
      onChange={onChange}
      required
    />
  );
}
