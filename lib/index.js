import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
// @ts-check
import React from 'react'; // WoT imports, needed for several components

import * as Core from '@node-wot/core';
import * as Http from '@node-wot/binding-http';
import * as WebSocket from '@node-wot/binding-websockets';
export var WoT = {
  Core: Core,
  Http: Http,
  WebSocket: WebSocket
};
export var WoTProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WoTProvider, _React$Component);

  function WoTProvider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WoTProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WoTProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      wot: {}
    };

    _this.componentDidMount = function () {
      var servient = new WoT.Core.Servient();
      servient.addClientFactory(new WoT.Http.HttpClientFactory());
      servient.addClientFactory(new WoT.WebSocket.WebSocketClientFactory());
      servient.addClientFactory(new WoT.WebSocket.WebSocketSecureClientFactory());
      servient.start().then(function (wot) {
        _this.setState({
          wot: wot
        });
      });
    };

    return _this;
  }

  _createClass(WoTProvider, [{
    key: "render",
    value: function render() {
      return React.createElement(WoTContext.Provider, {
        value: {
          wot: this.state.wot
        }
      }, this.props.children);
    }
  }]);

  return WoTProvider;
}(React.Component);
export var WoTContext = React.createContext({
  wot: {}
});
export var withWoT = function withWoT(ComponentToWrap) {
  var WithWoT =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(WithWoT, _React$Component2);

    function WithWoT() {
      _classCallCheck(this, WithWoT);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithWoT).apply(this, arguments));
    }

    _createClass(WithWoT, [{
      key: "render",
      value: function render() {
        var WoT = this.context.wot;
        return React.createElement(ComponentToWrap, Object.assign({}, this.props, {
          WoT: WoT
        }));
      }
    }]);

    return WithWoT;
  }(React.Component);

  WithWoT.contextType = WoTContext;
  return WithWoT;
};