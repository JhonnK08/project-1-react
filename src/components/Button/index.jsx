import "./styles.css";

const Button = ({ disabled, text, onClick }) => {
    return (
        <button className="button" onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};

export default Button;
