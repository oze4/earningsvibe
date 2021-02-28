import React from 'react';
import { Navbar } from 'react-bootstrap';

const { Brand } = Navbar;

export default function Topbar(props) {
  const { brand, ...rest } = props;

  return (
    <Navbar {...rest}>
      <Brand href="#home">{brand}</Brand>
    </Navbar>
  );
}
