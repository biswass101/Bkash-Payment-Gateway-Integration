import React from 'react';
import {useSearchParams} from 'react-router-dom';
const Error = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  return (
    <div>Payment {message}</div>
  )
}

export default Error