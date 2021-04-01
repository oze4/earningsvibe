import React from 'react';
import { Container } from 'react-bootstrap';

export default function BodyContainer(props) {
  const { children, ...rest } = props;

  return <Container {...rest}>{children}</Container>;
}