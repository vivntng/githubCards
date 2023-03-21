import ReactDOM from 'react-dom';
import React, {useState} from 'react';
import axios from 'axios';

const Error = (props) => {
  if (props.hasError) {
    return (
      <>
        <div id="error">Error: please try a different GitHub username.</div>
      </>
    )
  }
}

const Form = (props) => {
  const [username, setUsername] = useState(""); // create controlled component, since React is "controlling" the value of input
  // controlled components may be preferred since React is aware of state change for EVERY SINGLE CHAR
  // instead of when the submit button is clicked
  const [hasError, setHasError] = useState(false);
  let handleSubmit = async (e) => {
    setHasError(false);
    e.preventDefault(); // prevents refreshing of page when event handled
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`)
      props.onSubmit(res.data);
      setUsername("");
    } catch (err) {
      setHasError(true);
      setUsername("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <input 
      type="text"
      value={username}
      onChange={event => setUsername(event.target.value)}
      placeholder="GitHub Username"
      required
    />
    <button>Add Card</button>
    <Error hasError={hasError}/>
  </form>
  )
}

const CardList = (props) => {
  return (
    <div id="cardList">
      {props.githubProfiles.map(profile => <Card key={profile.id} {...profile}/>)}
    </div>
  )
}

const Card = (props) => {
  const profile = props;
  // LESSON LEARNED: do not need this.props bc it is not a class so you dont have to ref the component itself
  //https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b
  
  return (
    <div className="githubProfile">
      <img src={profile.avatar_url}/>
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );
}

export function App({ initialData }) {
  const [profiles, setProfiles] = React.useState([]);

  let addNewProfile = (profileData) => {
    setProfiles([...profiles, profileData]);
  }

  return (
    <>
    <div className="header">GitHub Cards App</div>
    <Form onSubmit={addNewProfile}/>
    <CardList githubProfiles={profiles} />
    </>
  );
}
