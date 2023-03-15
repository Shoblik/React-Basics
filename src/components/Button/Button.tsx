import styles from './Button.module.css' 

interface Props {
    buttonType: string;
    text: string;
    onClick: () => void;
}

export const Button = ({buttonType, text, onClick}: Props) => {
  return (
    <button type="button" className={[styles.btn, styles['btn-' + buttonType]].join(' ')} onClick={onClick}>{text}</button>
  )
}
