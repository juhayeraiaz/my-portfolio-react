import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
    return <div className='text-center'><Spinner size='lg' animation="grow" /></div>;
}

export default Loading;