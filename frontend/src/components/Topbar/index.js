import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const { Brand } = Navbar;

export default function Topbar(props) {
  const { onSearch, searchPlaceholderText, onSearchClick = (event) => {}, buttonText, brand, ...rest } = props;

  return (
    <Navbar {...rest}>
      <Brand href="#home">{brand}</Brand>
      <Form inline className="ml-auto">
        <FormControl
          type="text"
          placeholder={searchPlaceholderText || 'Search'}
          className="mr-sm-2"
          onClick={e => onSearchClick(e)}
        />
        <Button variant="outline-light">{buttonText || 'Search'}</Button>
      </Form>
    </Navbar>
  );
}
