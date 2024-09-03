import React from "react";
import { Dropdown } from "react-bootstrap";
import Flag from "react-country-flag";
import { useTranslation } from "react-i18next";

// App imports
import { PrefContext } from "contexts/preferrence";
import { LANGUAGES } from "helpers/constants";

const LanguageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const { t } = useTranslation();
  const { language, changeLanguage } = React.useContext(PrefContext);

  return (
    <>
      <Dropdown className="nav-item language" align="start">
        <Dropdown.Toggle role="button" as={"li"} className="nav-link">
          <Flag
            countryCode={language.toUpperCase()}
            style={{
              width: "1.3em",
              height: "1em",
              margin: "5px",
              border: "1px solid #7987a1",
            }}
            svg
          />
          {t(language)}
        </Dropdown.Toggle>
        <Dropdown.Menu className="language-switch dropdown-menu">
          {LANGUAGES.map((lang: string) => {
            return (
              <Dropdown.Item
                key={lang}
                className="dropdown-item py-2"
                onClick={() => changeLanguage(lang)}
              >
                <Flag
                  countryCode={lang.toUpperCase()}
                  style={{
                    width: "1.3em",
                    height: "1em",
                    margin: "5px",
                    border: "1px solid #7987a1",
                  }}
                  svg
                />
                {t(lang)}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default LanguageDropdown;
