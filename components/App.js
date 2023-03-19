"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = App;
var _reactDom = _interopRequireDefault(require("react-dom"));
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import '../styles/githubCard.css';

const testData = [{
  name: "Dan Abramov",
  avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
  company: "@facebook"
}, {
  name: "Sophie Alpert",
  avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
  company: "Humu"
}, {
  name: "Sebastian Markbåge",
  avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
  company: "Facebook"
}];
const Form = () => {
  // use ref by instantiating obj
  // https://dmitripavlutin.com/react-useref-guide/#:~:text=inputRef%20is%20then%20assigned%20to,inputRef.current.focus()%20.
  const userNameInput = _react.default.useRef("");
  let handleSubmit = e => {
    e.preventDefault(); // prevents refreshing of page when event handled
    console.log(userNameInput.current.value);
  };
  return /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "GitHub Username",
    ref: userNameInput,
    required: true
  }), /*#__PURE__*/_react.default.createElement("button", null, "Add Card"));
};
const CardList = props => {
  return /*#__PURE__*/_react.default.createElement("div", null, props.githubProfiles.map(profile => /*#__PURE__*/_react.default.createElement(Card, profile)));
};
const Card = props => {
  const profile = props;
  // console.log(props); 
  // LESSON LEARNED: do not need this.props bc it is not a class so you dont have to ref the component itself
  //https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "githubProfile",
    style: {
      margin: '1rem'
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: profile.avatar_url,
    style: {
      width: '75px'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "info"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "name"
  }, profile.name), /*#__PURE__*/_react.default.createElement("div", {
    className: "company"
  }, profile.company)));
};
function App({
  initialData
}) {
  // Card
  // CardList

  // const [name, setName] = React.useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const res = await axios.get(`https://api.github.com/users/${this.state.}`)
  // }
  const [profiles, setProfiles] = _react.default.useState(testData);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, "GitHub Cards App"), /*#__PURE__*/_react.default.createElement(CardList, {
    githubProfiles: profiles
  }), /*#__PURE__*/_react.default.createElement(Form, null));
}