"use strict";

var React = _interopRequireWildcard(require("react"));
require("@testing-library/jest-dom/extend-expect");
var _App = require("./App");
var _react2 = require("@testing-library/react");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
describe('App', () => {
  it('renders ansd increments counter', () => {
    const {
      getByText,
      getByTitle,
      asFragment
    } = (0, _react2.render)( /*#__PURE__*/React.createElement(_App.App, {
      initialData: {
        appName: 'TEST'
      }
    }));
    expect(getByText('TEST')).toMatchInlineSnapshot(`
      <h1>
        TEST
      </h1>
    `);
    const button = _react2.screen.getByTitle('increment');
    _react2.fireEvent.click(button);
    expect(getByTitle('increment')).toHaveTextContent('1');
    expect(asFragment()).toMatchSnapshot();
  });
});