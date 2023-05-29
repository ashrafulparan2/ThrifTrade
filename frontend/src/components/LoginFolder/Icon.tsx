import styled from "styled-components";

interface IconProps {
  color: string;
  children: React.ReactNode;
}

const Icon: React.FC<IconProps> = ({ color, children }) => {
  return <StyledIcon background={color}>{children}</StyledIcon>;
};

const StyledIcon = styled.div<{ background: string }>`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default Icon;
