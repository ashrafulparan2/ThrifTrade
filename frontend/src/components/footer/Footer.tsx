import {
  faBriefcase,
  faChartLine,
  faEnvelope,
  faInfoCircle,
  faMapMarkerAlt,
  faPhone,
  faQuestionCircle,
  faSignInAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcVisa,
  FaPaypal,
} from 'react-icons/fa'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: #131a22;
  padding: 20px;
  margin-top: 30px;
  text-align: center;
`

const FooterText = styled.p`
  color: #fff;
  font-size: 14px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const FooterIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`

const FooterSection = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  margin-bottom: 10px;
`

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const Logo = styled.div`
  height: 30px;
  width: 30px;
  margin: 0 10px;
`

const FeedbackLink = styled.a`
  color: #fff;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    color: #fff;
  }
`

const WhiteText = styled.p`
  color: white;
`
const RedText = styled.p`
  color: red;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        <FooterSection>
          <FooterIcon icon={faMapMarkerAlt} />
          1234 ThriftTrade Headquarters, CUET
        </FooterSection>
        <FooterSection>
          <FooterIcon icon={faPhone} />
           123-4567
        </FooterSection>
        <FooterSection>
          <FooterIcon icon={faEnvelope} />
          thrifttrade@gmail.com
        </FooterSection>
        <FooterSection>
          <FooterIcon icon={faInfoCircle} />
          About
        </FooterSection>
        <FooterSection>
          <FooterIcon icon={faUser} />
          Login
        </FooterSection>
        <FooterSection>
          <FooterIcon icon={faSignInAlt} />
          Sign Up
        </FooterSection>
        <FooterSection>
          <FooterIcon icon={faQuestionCircle} />
          Help
        </FooterSection>
        <FooterSection>
          <FooterIcon icon={faBriefcase} />
          Career
        </FooterSection>
        <FooterSection>
          <FooterIcon icon={faChartLine} />
          Investor
        </FooterSection>
      </FooterText>
      <LogoContainer>
        <Logo>
          <FaPaypal size={20} color="#fff" />
        </Logo>
        <Logo>
          <FaCcMastercard size={20} color="#fff" />
        </Logo>
        <Logo>
          <FaCcVisa size={20} color="#fff" />
        </Logo>
        <Logo>
          <FaCcAmex size={20} color="#fff" />
        </Logo>
        <Logo>
          <FaCcDiscover size={20} color="#fff" />
        </Logo>
        {/* Add more payment partner logos here */}
      </LogoContainer>
      <WhiteText>
        {' '}
        <h3>Make Money with Us</h3>
        
        <p>Join our affiliate program and start earning today.</p>
      </WhiteText>
     
      
      <FeedbackLink href="#">Give Feedback</FeedbackLink>
    </FooterContainer>
  )
}

export default Footer
