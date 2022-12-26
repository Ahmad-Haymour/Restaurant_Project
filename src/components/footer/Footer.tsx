/* eslint-disable jsx-a11y/anchor-is-valid */

import facebook from '../../images/cart.svg'
import instagram from '../../images/instagram.svg'
import twitter from '../../images/twitter.svg'
import linkedin from '../../images/linkedin.svg'

export default function Footer() {
  return (
    <div id='Footer'>
      <div className="img-container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRddHz4kqmHrcCe5Iep-CQprbTgQSxxmJ_JFA&usqp=CAU" alt="Logo img" />
      </div>
      <div className="left">
            <ul>
              <li>Employer</li>
              <li>Employee</li>
              <li>Terms</li>
              <li>Privacy policy</li>
              <li>Imprint</li>
              <li>Blog</li>
            </ul>
            <ul>
              <li>Contact</li>
              <li>Descriptions</li>
              <li>Imprint</li>
              <li>Terms</li>
              <li>Privacy policy</li>
              <li>Imprint</li>
            </ul>
          </div>

          <div className="right">
            <ul>
              <li>
                <a href="#"><img src={facebook} alt="Facebook icon" /></a>
              </li>
              <li>
                <a href="#"><img src={instagram} alt="Instagram icon" /></a>
              </li>
              <li>
                <a href="#"><img src={twitter} alt="Twitter icon" /></a>
              </li>
              <li>
                <a href="#"><img src={linkedin} alt="LinkedIn icon" /></a>
              </li>
            </ul>
          </div>
    </div>
  )
}
