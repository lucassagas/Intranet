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
  FiPhone,
  FiHeadphones,
  FaListUl,
  AiOutlineTag,
  BiBuildings,
  AiOutlineDatabase,
  SiWikipedia,
  FiBox,
  BiCoin,
  RiStore3Line,
  RiCustomerService2Line,
  RiFileCopy2Line,
  RiMoneyDollarCircleLine,
  AiOutlineLaptop
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
            <Link href="/">
              <MenuOption>
                <BiHomeAlt size={22} />
                Início
              </MenuOption>
            </Link>
          </Li>

          <Li isCategory={router.pathname.includes('/wiki/')}>
            <MenuOption
              isActive={displaySubMenu === 'Wiki'}
              onClick={() => toggleMenu('Wiki')}
            >
              <SiWikipedia size={20} />
              Wiki
              <IoIosArrowDown size={18} />
              <AnimatePresence exitBeforeEnter>
                {displaySubMenu === 'Wiki' && (
                  <SubMenu
                    key="wiki/estoque"
                    initial={{ y: -25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
                      <Link href="/wiki/estoque">
                        <SubMenuOption>
                          <FiBox size={20} />
                          Estoque
                        </SubMenuOption>
                      </Link>
                    )}

                    {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
                      <Link href="/wiki/financeiro">
                        <SubMenuOption>
                          <BiCoin size={20} />
                          Financeiro
                        </SubMenuOption>
                      </Link>
                    )}

                    {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
                      <Link href="/wiki/recepcao">
                        <SubMenuOption>
                          <RiStore3Line size={20} />
                          Recepção
                        </SubMenuOption>
                      </Link>
                    )}

                    {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
                      <Link href="/wiki/suporte">
                        <SubMenuOption>
                          <RiCustomerService2Line size={20} />
                          Suporte
                        </SubMenuOption>
                      </Link>
                    )}

                    {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
                      <Link href="/wiki/relatorio">
                        <SubMenuOption>
                          <RiFileCopy2Line size={20} />
                          Relatórios
                        </SubMenuOption>
                      </Link>
                    )}

                    {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
                      <Link href="/wiki/vendas">
                        <SubMenuOption>
                          <RiMoneyDollarCircleLine size={20} />
                          Vendas
                        </SubMenuOption>
                      </Link>
                    )}

                    {permissions?.includes('WIKI.TIPOS.VISUALIZAR') && (
                      <Link href="/wiki/noc">
                        <SubMenuOption>
                          <AiOutlineLaptop size={20} />
                          NOC
                        </SubMenuOption>
                      </Link>
                    )}
                  </SubMenu>
                )}
              </AnimatePresence>
            </MenuOption>
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
                      {permissions?.includes('RH.COLABORADORES.VISUALIZAR') && (
                        <Link href="/rh/contributors">
                          <SubMenuOption>
                            <BiGroup size={22} />
                            Colaboradores
                          </SubMenuOption>
                        </Link>
                      )}

                      {permissions?.includes('RH.EXAMES.VISUALIZAR') && (
                        <Link href="/rh/exams">
                          <SubMenuOption>
                            <RiFirstAidKitLine size={20} />
                            Exames
                          </SubMenuOption>
                        </Link>
                      )}

                      {permissions?.includes('RH.RAMAIS.VISUALIZAR') && (
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

          <Li isCategory={router.pathname.includes('/sac/')}>
            <MenuOption
              isActive={displaySubMenu === 'Sac'}
              onClick={() => toggleMenu('Sac')}
            >
              <FiHeadphones size={20} />
              Sac
              <IoIosArrowDown size={18} />
              <AnimatePresence exitBeforeEnter>
                {displaySubMenu === 'Sac' && (
                  <SubMenu
                    key="sac/plans"
                    initial={{ y: -25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {permissions?.includes('SAC.CONDOMINIOS.VISUALIZAR') && (
                      <Link href="/sac/condominium">
                        <SubMenuOption>
                          <BiBuildings size={20} />
                          Condominios
                        </SubMenuOption>
                      </Link>
                    )}

                    {permissions?.includes('SAC.PLANOS.VISUALIZAR') && (
                      <Link href="/sac/plans">
                        <SubMenuOption>
                          <FaListUl size={20} />
                          Planos
                        </SubMenuOption>
                      </Link>
                    )}

                    {permissions?.includes('SAC.SERVICOS.VISUALIZAR') && (
                      <Link href="/sac/services">
                        <SubMenuOption>
                          <AiOutlineTag size={20} />
                          Serviços
                        </SubMenuOption>
                      </Link>
                    )}
                  </SubMenu>
                )}
              </AnimatePresence>
            </MenuOption>
          </Li>

          <Li isCategory={router.pathname.includes('/noc/')}>
            <MenuOption
              isActive={displaySubMenu === 'Noc'}
              onClick={() => toggleMenu('Noc')}
            >
              <AiOutlineLaptop size={20} />
              Noc
              <IoIosArrowDown size={18} />
              <AnimatePresence exitBeforeEnter>
                {displaySubMenu === 'Noc' && (
                  <SubMenu
                    key="noc/backup"
                    initial={{ y: -25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {permissions?.includes('NOC.BACKUP.VISUALIZAR') && (
                      <Link href="/noc/backup">
                        <SubMenuOption>
                          <AiOutlineDatabase size={20} />
                          Backup
                        </SubMenuOption>
                      </Link>
                    )}
                  </SubMenu>
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
