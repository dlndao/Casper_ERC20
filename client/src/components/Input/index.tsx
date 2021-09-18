import React from 'react';

function Input({
  name,
  placeholder,
  doChange,
  type = 'text',
  className,
  value,
  disabled = false,
}: any) {
  return (
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={doChange}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  );
}
export { Input };
