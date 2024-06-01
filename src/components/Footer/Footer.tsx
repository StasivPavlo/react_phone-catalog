import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Footer.scss';

export const Footer: FC = () => {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 100);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="logo-link">
            <Logo />
          </Link>
          <div className="footer__nav nav">
            <ul className="nav-list">
              <li className="nav-list__item">
                <a
                  href="https://github.com/StasivPavlo"
                  target="_blank"
                  className="nav-list__link"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li className="nav-list__item">
                <a href="/contacts" className="nav-list__link">
                  Contacts
                </a>
              </li>
              <li className="nav-list__item">
                <a href="/right" className="nav-list__link">
                  Right
                </a>
              </li>
            </ul>
          </div>
          {isScroll && (
            <div className="back-to-top">
              <span className="back-to-top__text">Back to top</span>
              <button
                className="back-to-top__button small-button"
                type="button"
                onClick={() => window.scrollTo(0, 0)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.52858 10.4712C3.26823 10.2109 3.26823 9.78878 3.52858
                    9.52843L7.528585.52843C7.78892 5.268088.21103 5.26808
                    8.47138 5.52843L12.4714 9.52843C12.7317 9.78878 12.7317
                    10.2109 12.4714 10.4712C12.211 10.7316 11.7889 10.7316
                    11.5286 10.4712L7.99998 6.94265L4.47138 10.4712C4.21103
                    10.7316 3.78892 10.7316 3.52858 10.4712Z"
                    fill="#313237"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
