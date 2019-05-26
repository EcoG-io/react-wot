// @ts-check

import React from 'react';

// WoT imports, needed for several components
import * as Core from '@node-wot/core';
import * as Http from '@node-wot/binding-http';
import * as WebSocket from '@node-wot/binding-websockets';

export const WoT = {
  Core,
  Http,
  WebSocket
};

export class WoTProvider extends React.Component {
  state = {
    wot: {}
  };

  componentDidMount = () => {
    const servient = new WoT.Core.Servient();
    servient.addClientFactory(new WoT.Http.HttpClientFactory());
    servient.addClientFactory(new WoT.WebSocket.WebSocketClientFactory());
    servient.addClientFactory(new WoT.WebSocket.WebSocketSecureClientFactory());
    servient.start().then(wot => {
      this.setState({ wot });
    });
  };

  render() {
    return (
      <WoTContext.Provider value={{ wot: this.state.wot }}>
        {this.props.children}
      </WoTContext.Provider>
    );
  }
}

export const WoTContext = React.createContext({ wot: {} });

export const withWoT = ComponentToWrap => {
  class WithWoT extends React.Component {
    render() {
      let WoT = this.context.wot;
      return <ComponentToWrap {...this.props} WoT={WoT} />;
    }
  }
  WithWoT.contextType = WoTContext;
  return WithWoT;
};
