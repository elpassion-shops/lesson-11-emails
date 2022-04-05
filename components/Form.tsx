import styles from "../styles/Home.module.css";

interface FormProps {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  children?: JSX.Element[] | JSX.Element;
}

export const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form className={styles.form} method="POST" onSubmit={(e) => onSubmit(e)}>
      {children}
    </form>
  );
};
