const Input = (props) => {
  // Composant qui gere les différents type d'inputs utilisé dans les formulaires de ce sites.
  let inputElement;
  const inputClasses = ["py-2 px-3 border-5 border-black rounded-lg p-4 w-full"];

  // Permet d'ajouter la classe invalid si un input ne correspond pas au régle editer dans le formulaire
  if (!props.valid && props.touched) {
    inputClasses.push('invalid');
  }

  // Gere les différents type d'input (input , texteArea , select...)
  switch (props.type) {
    case 'input':
      inputElement = (
        <input
          {...props.config}
          value={props.value}
          onChange={props.changed}
          className={inputClasses}
          id={props.id}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea          
          {...props.config}
          value={props.value}
          onChange={props.changed}
          className={inputClasses} 
          id={props.id}
        ></textarea>
      );
      break;
    case 'select':
      inputElement = (
        <select
          value={props.value}
          onChange={props.changed}
          className={inputClasses.join(' ')}
          id={props.id}
        >
          {props.config.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      break;
  }

  return (
    <div className=" flex flex-col mb-4 text-xl ">
      <label className="mb-2" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="p-2">{inputElement}</div>

      {/* Affiche le message prévue en cas de non respect de regles du formulaire */}
      {!props.valid && props.touched ? <p className="text-red-500">{props.errorMessage}</p> : null}
    </div>
  );
};

export default Input;
