import React from 'react';
import { Container } from 'react-bootstrap';

export default function BodyContainer(props) {
  const { children, ...rest } = props;

  return <Container {...rest}>{children}</Container>;
}

function MyComponent() {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <div>
      Rendered at {dimensions.width} x {dimensions.height}
    </div>
  );
}
