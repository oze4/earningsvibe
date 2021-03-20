import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const { Brand } = Navbar;

export default function Topbar(props) {
  const { onSearch, searchPlaceholderText, buttonText, brand, ...rest } = props;

  return (
    <Navbar {...rest}>
      <Brand href="#home">{brand}</Brand>
      <Form inline className="ml-auto">
        <FormControl
          type="text"
          placeholder={searchPlaceholderText || 'Search'}
          className="mr-sm-2"
        />
        <Button variant="outline-light">{buttonText || 'Search'}</Button>
      </Form>
    </Navbar>
  );
}
