import React from 'react';

function H2({ title, subtitle, addClassName }) {
  return (
    <>
      {subtitle && <h4 className={addClassName}>{subtitle}</h4>}
      <h2 className={addClassName}>{title}</h2>
    </>
  );
}

export default H2;
