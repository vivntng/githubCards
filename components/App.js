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
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Error = props => {
  if (props.hasError) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      id: "error"
    }, "Error: please try a different GitHub username."));
  }
};
const Form = props => {
  const [username, setUsername] = (0, _react.useState)(""); // create controlled component, since React is "controlling" the value of input
  // controlled components may be preferred since React is aware of state change for EVERY SINGLE CHAR
  // instead of when the submit button is clicked
  const [hasError, setHasError] = (0, _react.useState)(false);
  let handleSubmit = async e => {
    setHasError(false);
    e.preventDefault(); // prevents refreshing of page when event handled
    try {
      const res = await _axios.default.get(`https://api.github.com/users/${username}`);
      props.onSubmit(res.data);
      setUsername("");
    } catch (err) {
      setHasError(true);
      setUsername("");
    }
  };
  return /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: username,
    onChange: event => setUsername(event.target.value),
    placeholder: "GitHub Username",
    required: true
  }), /*#__PURE__*/_react.default.createElement("button", null, "Add Card"), /*#__PURE__*/_react.default.createElement(Error, {
    hasError: hasError
  }));
};
const CardList = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "cardList"
  }, props.githubProfiles.map(profile => /*#__PURE__*/_react.default.createElement(Card, _extends({
    key: profile.id
  }, profile))));
};
const Card = props => {
  const profile = props;
  // LESSON LEARNED: do not need this.props bc it is not a class so you dont have to ref the component itself
  //https://medium.com/@PhilipAndrews/react-how-to-access-props-in-a-functional-component-6bd4200b9e0b

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "githubProfile"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: profile.avatar_url
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
  const [profiles, setProfiles] = _react.default.useState([]);
  let addNewProfile = profileData => {
    setProfiles([...profiles, profileData]);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, "GitHub Cards App"), /*#__PURE__*/_react.default.createElement(Form, {
    onSubmit: addNewProfile
  }), /*#__PURE__*/_react.default.createElement(CardList, {
    githubProfiles: profiles
  }));
}