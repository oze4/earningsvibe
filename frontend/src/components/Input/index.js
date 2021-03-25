import React from 'react';
import './index.css';

export default function Input(props) {
  const { className, isLoading = false, ...rest } = props;
  return (
    <div class="inputcontainer">
      <input className={`${className}`} {...rest} />
      {isLoading && (
        <div class="icon-container">
          <i class="loader"></i>
        </div>
      )}
    </div>
  );
}
