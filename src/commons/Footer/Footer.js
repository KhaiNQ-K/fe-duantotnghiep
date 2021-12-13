import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

function Footer(props) {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <nav>
          <ul>
            <li>
              <a
                href="#"
                target="_blank"
              >
                SMILE DENTIST
              </a>
            </li>
            <li>
              <a>Liên hệ:</a>
              <a
                href="#"
                style={{textDecoration: 'underline', marginLeft: '-0.5rem'}}
              >
                 0364104254
              </a>
            </li>
            <li>
              <a
                href="#"
                style={{textDecoration: 'underline'}}
              >
                phongkhamsmiledentist@gmail.com
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
          <a>
            Địa chỉ: 68 Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội
          </a>
        </div>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
