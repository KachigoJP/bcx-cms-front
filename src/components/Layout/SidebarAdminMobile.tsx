import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// UI Imports
import {
  MdSettings,
  MdSupervisorAccount,
  MdLogout,
  MdCircleNotifications,
  MdManageAccounts,
  MdAccountBox,
} from 'react-icons/md'

// App imports
import { PrefContext } from '../../contexts/preferrence'
import { AuthContext } from '../../contexts/auth'
import { ROUTES } from '../../helpers/constants'
import { useApi } from '../../helpers/api'
import { API } from '../../helpers/constants'

const Sidebar: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = React.useContext(AuthContext)
  const { isOpenMobileNav, toggleSidebarMobile } = useContext(PrefContext)

  // Apis
  const { state, sendRequest } = useApi(API.LOGOUT)

  // Hooks
  React.useEffect(() => {
    const response = state.data
    if (response && response.status === 200) {
      logout()
      navigate(ROUTES.LOGIN)
    }
  }, [state])

  // Methods
  const onClickMenu = () => {
    toggleSidebarMobile()
  }

  const signOut = () => {
    sendRequest({
      method: 'post',
      data: {},
    })
  }

  const onClickItem = () => {
    toggleSidebarMobile()
  }

  return (
    <React.Fragment>
      <nav className="sidebar-mobile d-block d-lg-none">
        <div className="sidebar-header">
          <div
            className={`sidebar-toggler ${
              isOpenMobileNav ? 'active' : 'not-active'
            }`}
            onClick={onClickMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="sidebar-body">
          <ul className="nav">
            <li className="nav-item nav-category">{t('Home')}</li>
            {/* <li
              className={`nav-item ${
                location.pathname === ROUTES.DASHBOARD ? 'active' : ''
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.DASHBOARD} className="nav-link">
                <MdDashboard className="link-icon" />
                <span className="link-title">{t('Menu')}</span>
              </Link>
            </li> */}
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_NOTIFICATION ? 'active' : ''
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.ADMIN_NOTIFICATION} className="nav-link">
                <MdCircleNotifications className="link-icon" />
                <span className="link-title">{t('Notifications')}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_LIST_USER ? 'active' : ''
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.ADMIN_LIST_USER} className="nav-link">
                <MdSupervisorAccount className="link-icon" />
                <span className="link-title">{t('Users')}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_UPGRADE_MASTER
                  ? 'active'
                  : ''
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.ADMIN_UPGRADE_MASTER} className="nav-link">
                <MdManageAccounts className="link-icon" />
                <span className="link-title">{t('Upgrade Master User')}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_FEE_SETTING ? 'active' : ''
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.ADMIN_FEE_SETTING} className="nav-link">
                <MdAccountBox className="link-icon" />
                <span className="link-title">{t('Reward Setting')}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.ADMIN_SETTING ? 'active' : ''
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.DEPOSIT} className="nav-link">
                <MdSettings className="link-icon" />
                <span className="link-title">{t('Settings')}</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === ROUTES.KYC_MANAGER ? 'active' : ''
              }`}
              onClick={onClickItem}
            >
              <Link to={ROUTES.KYC_MANAGER} className="nav-link">
                <MdSettings className="link-icon" />
                <span className="link-title">{t('KYC Management')}</span>
              </Link>
            </li>
            <li className={`nav-item`} onClick={onClickItem}>
              <Link to="#" className="nav-link" onClick={signOut}>
                <MdLogout className="link-icon" />
                <span className="link-title">{t('Logout')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Sidebar
