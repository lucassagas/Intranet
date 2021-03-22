import logoImg from '../assets/logo.png'
import Link from 'next/link'

import {
  Container,
  Li,
  MenuOption,
  SubMenu
} from '../styles/components/SideMenu'

import {
  BiHomeAlt,
  RiAdminLine,
  IoIosArrowDown,
  HiOutlineUsers,
  AiOutlineLaptop
} from '../styles/icons'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export function SideMenu() {
  const [displaySubMenu, setDisplaySubMenu] = useState('')

  const router = useRouter()

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
          <Li>
            <Link href="/signin">
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
              <RiAdminLine size={22} />
              Adm
              <IoIosArrowDown size={18} />
              <AnimatePresence exitBeforeEnter>
                {displaySubMenu === 'Adm' && (
                  <SubMenu
                    initial={{ y: -25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link href="/adm/users">
                      <MenuOption>
                        <HiOutlineUsers size={22} />
                        Usuários
                      </MenuOption>
                    </Link>
                  </SubMenu>
                )}
              </AnimatePresence>
            </MenuOption>
          </Li>

          <Li>
            <Link href="/signin">
              <MenuOption>
                <BiHomeAlt size={22} />
                Início
              </MenuOption>
            </Link>
          </Li>
        </ul>
      </nav>

      <img src={logoImg} alt="Logo" />
    </Container>
  )
}
