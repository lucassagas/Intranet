import Head from 'next/head'
import React, { useState } from 'react'

import { Header } from '../../components/Header'

import { Groups } from '../../components/Pages/Adm/Users/Groups'
import { Permissions } from '../../components/Pages/Adm/Users/Permissions'
import { Users } from '../../components/Pages/Adm/Users/Users'

import { BiLockAlt, FaRegUser } from '../../styles/icons'

import { Container, ButtonCategory } from '../../styles/pages/adm/user'

function UsersPage() {
  const [category, setCategory] = useState('users')

  return (
    <Container>
      <Head>
        <title> ADM | Usuários</title>
      </Head>

      <Header category="Adm" route="Usuários">
        {category !== 'groups' && (
          <ButtonCategory onClick={() => setCategory('groups')}>
            <FaRegUser size={20} /> Grupos
          </ButtonCategory>
        )}

        {category !== 'users' && (
          <ButtonCategory onClick={() => setCategory('users')}>
            <BiLockAlt size={20} /> Usuários
          </ButtonCategory>
        )}

        {category !== 'permissions' && (
          <ButtonCategory onClick={() => setCategory('permissions')}>
            <BiLockAlt size={20} /> Permissões
          </ButtonCategory>
        )}
      </Header>

      {category === 'users' && <Users />}

      {category === 'groups' && <Groups />}

      {category === 'permissions' && <Permissions />}
    </Container>
  )
}

export default UsersPage
