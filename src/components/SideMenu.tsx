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
  RiLogoutCircleLine
} from '../styles/icons'

export function SideMenu() {
  const [displaySubMenu, setDisplaySubMenu] = useState('')

  const router = useRouter()
  const { handleSignOut } = useAuth()

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
        <strong>Lucas Sagás</strong>
      </header>

      <nav>
        <ul>
          <Li isCategory={router.pathname === '/'}>
            <Link href="/">
              <MenuOption>
                <BiHomeAlt size={22} />
                Início
              </MenuOption>
            </Link>
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
