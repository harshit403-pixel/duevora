import { useState } from "react";
import Button from "./Button";
import s from "../css/QuickCreateForm.module.css";

export default function QuickCreateForm({ fields, apiFn, onCreated, onClose }) {
  const [values, setValues] = useState(() => {
    const init = {};
    fields.forEach((f) => { init[f.name] = f.defaultValue || ""; });
    return init;
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (name, val) => {
    setValues((v) => ({ ...v, [name]: val }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newErrors = {};
    fields.forEach((f) => {
      if (f.required && !String(values[f.name] || "").trim()) {
        newErrors[f.name] = `${f.label} is required`;
      }
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await apiFn(values);
      const created = res?.data?.data || res?.data || res;
      onCreated(created);
    } catch (err) {
      setServerError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.fields}>
        {fields.map((f) => (
          <label key={f.name} className={s.label}>
            {f.label}
            {f.type === "textarea" ? (
              <textarea
                rows={2}
                value={values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
                placeholder={f.placeholder || ""}
                className={`${s.input} ${errors[f.name] ? s.inputError : ""}`}
              />
            ) : (
              <input
                type={f.type || "text"}
                value={values[f.name]}
                onChange={(e) => handleChange(f.name, e.target.value)}
                placeholder={f.placeholder || ""}
                className={`${s.input} ${errors[f.name] ? s.inputError : ""}`}
              />
            )}
            {errors[f.name] && <span className={s.error}>{errors[f.name]}</span>}
          </label>
        ))}
      </div>

      {serverError && <div className={s.serverError}>{serverError}</div>}

      <div className={s.actions}>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          Create
        </Button>
      </div>
    </form>
  );
}
