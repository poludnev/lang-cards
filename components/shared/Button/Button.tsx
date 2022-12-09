import { IButtonProps } from './ButtonProps';
import styles from './Button.module.scss';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: 2rem;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
export const Button: React.FC<IButtonProps> = ({ children, type }) => {
  return (
    <div className={styles.container}>
      <StyledButton type={type} onClick={() => console.log('click')}>
        {children}
      </StyledButton>
    </div>
  );
};
