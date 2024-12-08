import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './NewSpotFormAndEdit.css';

function NewSpotFormAndEdit({ imp = { name: 'Gaby' }}) {
    //The function uses object deconstruction to get to the component's parameters
    //In this example the key called "imp" is extracted from object passed into the component. Shown below:
    //<NewSpotFormAndEdit imp={{name: 'Gaby'}}/>
    //If nothing is passed in, a default value of "{ imp = { name: 'Gaby' }" is used.

    //To get the value of the path parameter called "impId"
    const { impId } = useParams();

    //To navigate to a new location
    const navigate = useNavigate();

    //Creates a state variable called "impMood" initialized to "feisty"
    //To change the state to "happy" the following call is used "setImpMood('happy')"
    const [impMood, setImpMood] = useState("feisty");

    //Create a state variable called "impNickName" initialized to "" to track the nickname
    //This variable is used to track the name of the imp.
    const [impNickName, setImpNickName] = useState("");

    //Create a state variable called "errors" initialized to "{}" to track errors
    const [errors, setErrors] = useState({});

    //To provide realtime feedback, use "useEffect". In this example the variable "impNickName"
    //is watched and whenever it changes, the function below is run.
    useEffect(() => {
        const errors = {};

        if (impNickName.length === 0) {
            errors.impNickName = "Name field is required";
        } else if (impNickName.length > 30) {
            errors.impNickName = "Name must be fewer than 30 characters"
        }

        setErrors(errors);
    }, [impNickName]);

    //Create an onClick handler to change the Imp's mood. Clicking on the mood will toggle it
    //between "feisty" and "happy".
    const onClickImp = event => {
        if (event.target.innerHTML === 'feisty') {
            setImpMood('happy');
        } else {
            setImpMood('feisty');
        }
    };

    //Create an onClick handler to go home. Clicking on the button will navigate to "/"
    const onClickHome = event => {
        //Stop default action
        event.preventDefault();

        //Go to '/' route
        navigate('/');
    }

    //The HTML that makes up the component
    return (
        <div className={'new-spot-form-and-edit'}>
            <h1>{imp.name}</h1>
            <p>The mood of the imp is <button className={impMood} onClick={onClickImp}>{impMood}</button>!</p>
            <input type="text" name="nickname" value={impNickName} onChange={e => setImpNickName(e.target.value)} />
            <p className={'error'}>{errors.impNickName}</p>
            <button onClick={onClickHome}>Home</button>
        </div>
    );
}

export default NewSpotFormAndEdit;
