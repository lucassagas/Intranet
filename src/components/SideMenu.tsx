import logoImg from '../assets/logo.png'
import Link from 'next/link'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/auth'

import {
  Container,
  Li,
  MenuOption,
  SubMenu,
  SubMenuOption
} from '../styles/components/SideMenu'

import {
  BiHomeAlt,
  RiAdminLine,
  IoIosArrowDown,
  HiOutlineUsers,
  RiLogoutCircleLine,
  HiOutlineUserGroup,
  BiGroup,
  RiFirstAidKitLine,
  FiPhone
} from '../styles/icons'

export function SideMenu() {
  const [displaySubMenu, setDisplaySubMenu] = useState('')

  const router = useRouter()
  const { handleSignOut } = useAuth()
  const { permissions, user } = useAuth()

  function toggleMenu(category: string | undefined) {
    displaySubMenu === category
      ? setDisplaySubMenu('')
      : setDisplaySubMenu(category)
  }
  return (
    <Container>
      <header>
        <img
          src="https://avatars.githubusercontent.com/u/41124763?v=4"
          alt="Profile"
        />
        <strong>{user && user.user_name.toLowerCase()}</strong>
      </header>

      <nav>
        <ul>
          <Li isCategory={router.pathname === '/'}>
            <Link href="/" prefetch>
              <MenuOption>
                <BiHomeAlt size={22} />
                Início
              </MenuOption>
            </Link>
          </Li>

          <Li isCategory={router.pathname.includes('/rh/')}>
            <MenuOption
              isActive={displaySubMenu === 'Rh'}
              onClick={() => toggleMenu('Rh')}
            >
              <HiOutlineUserGroup size={20} />
              Rh
              <IoIosArrowDown size={18} />
              <AnimatePresence exitBeforeEnter>
                {displaySubMenu === 'Rh' && (
                  <>
                    <SubMenu
                      key="Rh/colaboradores"
                      initial={{ y: -25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {permissions.includes('RH.COLABORADORES.VISUALIZAR') && (
                        <Link href="/rh/contributors">
                          <SubMenuOption>
                            <BiGroup size={22} />
                            Colaboradores
                          </SubMenuOption>
                        </Link>
                      )}

                      {permissions.includes('RH.EXAMES.VISUALIZAR') && (
                        <Link href="/rh/exams">
                          <SubMenuOption>
                            <RiFirstAidKitLine size={20} />
                            Exames
                          </SubMenuOption>
                        </Link>
                      )}

                      {permissions.includes('RH.RAMAIS.VISUALIZAR') && (
                        <Link href="/rh/branches">
                          <SubMenuOption>
                            <FiPhone size={20} />
                            Ramais
                          </SubMenuOption>
                        </Link>
                      )}
                    </SubMenu>
                  </>
                )}
              </AnimatePresence>
            </MenuOption>
          </Li>

          <Li isCategory={router.pathname.includes('/adm/')}>
            <MenuOption
              isActive={displaySubMenu === 'Adm'}
              onClick={() => toggleMenu('Adm')}
            >
              <RiAdminLine size={20} />
              Adm
              <IoIosArrowDown size={18} />
              <AnimatePresence exitBeforeEnter>
                {displaySubMenu === 'Adm' && (
                  <SubMenu
                    key="adm/users"
                    initial={{ y: -25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link href="/adm/users">
                      <SubMenuOption>
                        <HiOutlineUsers size={20} />
                        Usuários
                      </SubMenuOption>
                    </Link>
                  </SubMenu>
                )}
              </AnimatePresence>
            </MenuOption>
          </Li>

          <Li onClick={handleSignOut}>
            <MenuOption>
              <RiLogoutCircleLine size={20} />
              Logout
            </MenuOption>
          </Li>
        </ul>
      </nav>

      <img src={logoImg} alt="Logo" />
    </Container>
  )
}
