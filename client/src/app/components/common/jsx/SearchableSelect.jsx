import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { HiMagnifyingGlass, HiChevronDown, HiXMark, HiPlus } from "react-icons/hi2";
import Modal from "./Modal";
import s from "../css/SearchableSelect.module.css";

export default function SearchableSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  loading = false,
  disabled = false,
  onCreateNew,
  createLabel = "Create new",
  createForm,
  getOptionLabel,
  getOptionValue,
}) {
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [localOptions, setLocalOptions] = useState([]);
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);

  const allOptions = useMemo(() => [...options, ...localOptions], [options, localOptions]);

  const getLabel = useCallback(
    (opt) => {
      if (getOptionLabel) return getOptionLabel(opt);
      return opt.label || opt.name || opt.displayName || String(opt.value || opt);
    },
    [getOptionLabel]
  );

  const getValue = useCallback(
    (opt) => {
      if (getOptionValue) return getOptionValue(opt);
      return opt.value || opt._id || opt.id || String(opt);
    },
    [getOptionValue]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return allOptions;
    const q = search.toLowerCase();
    return allOptions.filter((opt) => {
      const label = getLabel(opt);
      return label && label.toLowerCase().includes(q);
    });
  }, [allOptions, search, getLabel]);

  const selectedLabel = useMemo(() => {
    if (!value) return "";
    const found = allOptions.find((opt) => getValue(opt) === value);
    return found ? getLabel(found) : "";
  }, [value, allOptions, getValue, getLabel]);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightIndex];
      if (item) item.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    const total = filtered.length + (onCreateNew || createForm ? 1 : 0);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev <= 0 ? total - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filtered.length) {
        const selected = filtered[highlightIndex];
        onChange(getValue(selected));
        setOpen(false);
      } else if (highlightIndex === filtered.length && (onCreateNew || createForm)) {
        handleCreateClick();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleSelect = (opt) => {
    onChange(getValue(opt));
    setOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
  };

  const handleCreateClick = () => {
    setOpen(false);
    if (createForm) {
      setCreateOpen(true);
    } else if (onCreateNew) {
      onCreateNew();
    }
  };

  const handleCreated = (newItem) => {
    const label = getLabel(newItem);
    const val = getValue(newItem);
    setLocalOptions((prev) => [...prev, { value: val, label }]);
    onChange(val);
    setCreateOpen(false);
  };

  const showCreate = onCreateNew || createForm;

  return (
    <>
      <div className={s.container} ref={containerRef}>
        <button
          type="button"
          className={`${s.trigger} ${open ? s.triggerOpen : ""} ${disabled ? s.triggerDisabled : ""}`}
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
        >
          <span className={selectedLabel ? s.triggerValue : s.triggerPlaceholder}>
            {loading ? "Loading..." : selectedLabel || placeholder}
          </span>
          <span className={s.triggerIcons}>
            {selectedLabel && !disabled && (
              <span className={s.clearBtn} onClick={handleClear} role="button" tabIndex={-1}>
                <HiXMark size={14} />
              </span>
            )}
            <HiChevronDown size={16} className={`${s.chevron} ${open ? s.chevronOpen : ""}`} />
          </span>
        </button>

        {open && (
          <div className={s.dropdown}>
            <div className={s.searchWrap}>
              <HiMagnifyingGlass size={14} className={s.searchIcon} />
              <input
                ref={searchRef}
                type="text"
                className={s.searchInput}
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightIndex(-1);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className={s.list} ref={listRef}>
              {loading ? (
                <div className={s.empty}>Loading...</div>
              ) : filtered.length === 0 ? (
                <div className={s.empty}>No results found</div>
              ) : (
                filtered.map((opt, i) => (
                  <button
                    key={getValue(opt)}
                    type="button"
                    className={`${s.option} ${getValue(opt) === value ? s.optionSelected : ""} ${i === highlightIndex ? s.optionHighlight : ""}`}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => setHighlightIndex(i)}
                  >
                    {getLabel(opt)}
                  </button>
                ))
              )}

              {showCreate && (
                <>
                  {filtered.length > 0 && <div className={s.divider} />}
                  <button
                    type="button"
                    className={`${s.createBtn} ${highlightIndex === filtered.length ? s.optionHighlight : ""}`}
                    onClick={handleCreateClick}
                    onMouseEnter={() => setHighlightIndex(filtered.length)}
                  >
                    <HiPlus size={14} />
                    {createLabel}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {createForm && createPortal(
        <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title={createLabel}>
          {createForm({ onCreated: handleCreated, onClose: () => setCreateOpen(false) })}
        </Modal>,
        document.body
      )}
    </>
  );
}
