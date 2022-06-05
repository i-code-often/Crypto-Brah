import classes from './Input.module.css';

function Input(props) {
  return (
    <input {...props} className={classes.input +' '+ props.className} />
  );
}

export default Input;