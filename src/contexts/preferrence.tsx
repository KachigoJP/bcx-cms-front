import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useApi } from "helpers/api";
import { API, COOKIES } from "helpers/constants";

// app imports

type Toast = {
  type: "error" | "success" | "warning";
  message: string;
};
type PrefProps = {
  isFoldedSidebar: boolean;
  toggleSidebar: Function;
  isOpenMobileNav: boolean;
  toggleSidebarMobile: Function;
  language: "us" | "jp";
  changeLanguage: Function;
  toastArr: Toast[];
  showToast: Function;
  feeConfig: any;
  getFeeConfig: Function;
};

export const PrefContext = React.createContext<PrefProps>({
  isFoldedSidebar: true,
  toggleSidebar: () => {},
  isOpenMobileNav: false,
  toggleSidebarMobile: () => {},
  language: "jp",
  changeLanguage: (lang: PrefProps["language"]) => {},
  toastArr: [],
  showToast: (toast: Toast) => {},
  feeConfig: {},
  getFeeConfig: () => {},
});

const Provider = (props: any) => {
  const [cookies, setCookie] = useCookies([COOKIES.SIDEBAR_STATE]);
  const [toastArr, setToast] = React.useState<Toast[]>([]);
  const [isFoldedSidebar, setIsFoldedSidebar] = React.useState(
    cookies[COOKIES.SIDEBAR_STATE] || false
  );
  const [isOpenMobileNav, setIsOpenMobileNav] = React.useState(false);

  const [language, setLanguage] = React.useState(
    cookies[COOKIES.LANGUAGE] || "jp"
  );
  const [feeConfig, setFeeConfig] = React.useState({});
  // APIs
  // const { state, sendRequest } = useApi(API.SYSTEM_CONFIG_FEE)

  const { i18n } = useTranslation();

  useEffect(() => {
    // sendRequest()
  }, []);

  // useEffect(() => {
  //   const response = state.data
  //   if (response?.status === 200) {
  //     const config = response.data.data
  //     setFeeConfig(config)
  //   }
  // }, [state])

  const toggleSidebar = () => {
    const newState = !isFoldedSidebar;
    setIsFoldedSidebar(newState);
    setCookie(cookies[COOKIES.SIDEBAR_STATE], newState);
    if (newState) {
      document.body.classList.add("sidebar-folded");
    } else {
      document.body.classList.remove("sidebar-folded");
    }
  };

  const toggleSidebarMobile = () => {
    const newState = !isOpenMobileNav;
    setIsOpenMobileNav(newState);
    if (newState) {
      document.body.classList.add("sidebar-mobile-open");
    } else {
      document.body.classList.remove("sidebar-mobile-open");
    }
  };

  const changeLanguage = (lang: PrefProps["language"]) => {
    setLanguage(lang);
    setCookie(cookies[COOKIES.LANGUAGE], lang);
    i18n.changeLanguage(lang);
  };

  const showToast = (toast: Toast) => {
    toastArr.push(toast);
    setToast(toastArr);
  };

  const getFeeConfig = () => {
    // sendRequest()
  };

  return (
    <PrefContext.Provider
      value={{
        isFoldedSidebar,
        toggleSidebar,
        isOpenMobileNav,
        toggleSidebarMobile,
        language,
        changeLanguage,
        toastArr,
        showToast,
        feeConfig,
        getFeeConfig,
      }}
    >
      <>{props.children}</>
    </PrefContext.Provider>
  );
};

export default Provider;
