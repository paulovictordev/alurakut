import React from 'react';
import nookies from 'nookies'
import { useRouter } from 'next/router'
import styled from 'styled-components';

const Message = styled.div`
  color: blue;
`
export default function Logout() {
  const router = useRouter()
  React.useEffect(() => {
    nookies.destroy(null, 'USER_TOKEN')
    router.push('/login')
  }, [])

  return (
    <Message>
      Loading...
    </Message>
  )
}