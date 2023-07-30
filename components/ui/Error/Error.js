const ErrorMessage = (props) => {
    return ( 
        <div className="p-2 rounded bg-danger text-red-500 font-semibold text-center h4 ">
            {props.error}
        </div>

      );
}
 
export default ErrorMessage;