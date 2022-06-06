import React from 'react';

function Container({ children, as = 'div' }) {
  const Tag = as;

  return <Tag className="wrapper">{children}</Tag>;
}

export default Container;
