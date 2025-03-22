import React, { useEffect } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {enqueueSnackbar} from 'notistack'
const Error = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  const navigate = useNavigate();
  useEffect(() => {
    if(message === 'failure') enqueueSnackbar('Payment Failed', {variant : 'error'});
    if(message == 'cancel') enqueueSnackbar('Payment Cancelled', {variant : 'error'});
  })
  return (
    <>
      <div>Payment {message === 'cancel' ? 'Cancelled' : 'Failed'}</div>
      <div>
        <button 
          style={{marginTop: '10px'}}
          onClick={() => navigate('/')}
        >Try Again</button>
      </div>
    </>
  )
}

export default Error