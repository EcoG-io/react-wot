# react-wot

Wrapper to use the node-wot browser bundle in React.js

## adding it

Usage of this module is typically to include it in your source tree when using a transpiler/bundler like [webpack](https://webpack.js.org/).

It has been developed and tested in conjunction with [Create-React-App](https://facebook.github.io/create-react-app/).

Just add it to your dependencies:

```bash
# using yarn
yarn add react-wot

# or if you insist on using npm
npm install --save react-wot
```

## using it

A provider component `<WoTProvider>` and a [Higher-Order-Component](https://reactjs.org/docs/higher-order-components.html) `withWoT()` allow you to use the WoT object without any further thoughts.

The `<WoTProvider>` will setup a regular servient in the browser with client-bindings for HTTP, HTTPS and WebSockets.

The `withWoT()` [HOC](https://reactjs.org/docs/higher-order-components.html) will make [the `WoT` object](https://www.w3.org/TR/wot-scripting-api/#the-wot-object) accessible in the properties of a component inside the provider.

## Example

```jsx
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      things: []
    };
  }

  addThing = thing => {
    const { things }  = this.state;
    this.setState({ things : [...things, thing] });
  };

  loadThing = () => {
      const { WoT } = this.props;
      const res = await fetch('http://some.thing/td');
      const td = await res.text();
      const thing = WoT.consume(td);
      this.addThing(thing);
  }

  render = () => {
    const { things } = this.state;

    return (
      <WoTProvider>
        <ul>
            {
                things.map(thing => 
                <li key={thing.id}>{thing.name}</li>)
            }
        </ul>
        <Button onClick={this.loadThing()}>
            Load a thing
        </Button>
      </WoTProvider>
    );
  };
}
export default withWoT(App);
```

Instead of just displaying the name, you can of course use `thing` as you regulary would in the [W3C WoT scripting API](https://www.w3.org/TR/wot-scripting-api/#the-consumedthing-interface).

## Kudos

This project is based on the Eclipse project [thingweb.node-wot](https://github.com/eclipse/thingweb.node-wot) and the [W3C Web of Things](https://www.w3.org/WoT/) standards.


## Copyright

(c) 2019 EcoG GmbH

## License

MIT License