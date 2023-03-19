import ReactDOM from 'react-dom';
import React, {useState} from 'react';
import axios from 'axios';
// import '../styles/githubCard.css';

const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

const Form = () => {
  const [username, setUsername] = useState(""); // create controlled component, since React is "controlling" the value of input
  // controlled components may be preferred since React is aware of state change for EVERY SINGLE CHAR
  // instead of when the submit button is clicked
  let handleSubmit = (e) => {
    e.preventDefault(); // prevents refreshing of page when event handled
    console.log(username);
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
  </form>
  )
}

const CardList = (props) => {
  return (
    <div>
      {props.githubProfiles.map(profile => <Card {...profile}/>)}
    </div>
  )
  
}

const Card = (props) => {
  const profile = props;
  // console.log(props); 
  // LESSON LEARNED: do not need this.props bc it is not a class so you dont have to ref the component itself
  //https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b
  
  return (
    <div className="githubProfile" style={{margin: '1rem'}}>
      <img src={profile.avatar_url} style={{width: '75px'}}/>
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );
}

export function App({ initialData }) {
  // Card
  // CardList

  // const [name, setName] = React.useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const res = await axios.get(`https://api.github.com/users/${this.state.}`)
  // }
  const [profiles, setProfiles] = React.useState(testData);
  return (
    <>
    <div>GitHub Cards App</div>
    <CardList githubProfiles={profiles} />
    <Form />
    </>
  );
}
