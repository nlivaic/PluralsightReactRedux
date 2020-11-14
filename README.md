### Pitfalls

- `import { React } from 'react'` will cause issues (e.g. reading route parameters with `props.match.params.whatever`). Make sure you do `import React from 'react'`.

### Setting up a new project

    npm install react-router-dom@5.0.0 bootstrap@4.3.1

### Mock API locally

Allows us to have a local mocked API. Requires us to set up a server (json-server) reading from a file and returning it.

    npm install -D cross-env@5.2.0 npm-run-all@4.1.5 json-server@0.15.0

- `cross-env` - allows for setting environment variables in a cross-platform manner. We are using it to set REACT_APP_API_URL to point to Mock API. Every environment variable prefixed with "REACT_APP" is read by the create_react_app and every reference to it is changed to the underlying value.
- `npm-run-all` allows running multiple scripts in parallel.
- `run-p` is installed with npm-run-all package. It allows running multiple npm scripts in parallel. You can find it in the `packages.json` file.

### Calling APIs

From `componentDidMount()`. This is the first lifecycle method you are allowed to call an external API from. If using functional components you can call an API via the network using `useEffect()` hook, but make sure to include `[]` as second argument.

### Hooks

- Can't be run inside if statement etc. Must be declared on top-level.
- Only with functional components.
- `useState` - const [var, setVar] = setState("");
- `useEffect` - two ways it gets ran:
  - Called immediately after every render. It allows the caller to apply side-effects every time React component renders.
  - Called every time any of the dependencies change. Caller must list all dependencies. This is a list of variables from state or props. If you provide an empty array, useEffect is called only on mount.
  - You can return a function to be called once the component is unmounted. This allows for cleaning up (e.g. timer id from setTimeout).
  - Think of it as combining componentDidMount (when the component first renders), componentDidUpdate (on every state change) and componentWillUnmount (clean up).

### Prop Types

- Only useful (and enabled, by default) during development.
- Use them to document component API.

### React Router

- If a component is loaded via <Route> component, it will have access to props history.
- `<BrowserRouter as Router>`
- `<Route>`
- `<Link>` and `<NavLink>`
- `<Redirect>` or history
- `<Switch>`
- `<Prompt>`

### Forms

- Consult sample project.
- Use `react-toastify` to notify user on save. We are displaying `<ToastContainer>` on the `<App>`, so you can call `toast.success()` from anywhere in the app.

### Redux

#### npm packages

    npm install redux
    npm install react-redux
    npm install redux-immutable-state-invariant
    npm install redux-thunk

#### Cookbook

1. Create action creator (`redux/actions/`).
2. Create reducer and feed it state and action.
3. Create root reducer (`redux/reducers/`) by feeding it all the other reducers.
4. Create store (`redux/configureStore.js`). Feed it root reducer and (optionally) initial state.
5. Instantiate store and wrap your `<App>` in `<Provider>`. Every component now has Redux state available.
6. Connect your components to Redux one by one using `connect()`. Feed it `mapStateToProps` and `mapDispatchToProps`.
7. `mapStateToProps` defines which portion of state should be visible to the component.
8. `mapDispatchToProps` allows access to Redux's `dispatch` via `this.props`. Use `bindActionCreators` to automatically wrap `dispatch` around all provided action creators.

#### Core principles:

- Immutable store
- Actions trigger change
- Reducers return updated state

#### Actions

- Represents user intent.
- An object. Must contain `type` property. All other data is optional, passed through property, representing the desired new state.
- Created by action creators.

#### Store

- `store.dispatch()`, `store.getState()`, `store.subscribe(listener)`, store.replaceReducer()`.
- Store is immutable. Why?
  - By allowing only reducers to change the state, it is easy to understand where a change came from.
  - If the state is referencing a new object in memory, it means the old object (representing the previous state) is no longer valid and this allows Redux to quickly deduce whether a change occurred. This is great for performance, since every state change results in a rerender.
  - Facilitates debugging. Every state is represented by a specific instance of state object.
- To modify store, you will have to copy the state and make the modification. You can do that with `Object.assign()` or spread operator. Both ways perform shallow copy. Make sure you go for deep copy only if something changed in that specific part of the state, otherwise you will be incurring unncecessary rerenders and slow down your application.
- Arrays:
  - use `.push()`, `.pop()` and `.reverse()` only if you previously copied the array (see above bulletpoint). These functions work on the target array.
  - use immutable-friendly functions: `.map()`, `.reduce()`, `.filter()`, `.concat()`, spread operator, since these functions return a new array.

#### Reducers

- Takes `state` and an `action`, returning a new state.
- Must be pure functions, without any side-effects.
- Don'ts:
  - Do not call APIs from a reducer.
  - Do not mutate arguments.
  - Do not perform side-effects.
  - Do not call non-pure functions. Reducer return value must depend only on input values.
- Dos:
  - _Every_ reducer is called dispatch. This means every reducer should check the action type and return immediately if the action type is meant for some other reducer.
  - Each reducer only handles its own slice of the store.
  - Each reducer can handle one or more actions. Each action can be handled by one or more reducers.

#### react-redux

- Integrates React and Redux
- In charge of updating only relevant React components on state changes.
- `Provider` wraps the app.
- `Connect` connects container components to Redux.

#### mapStateToProps

- Limit parts of Redux state you want exposed to components as props.

#### mapDispatchToProps

- Wraps action creators in `dispatch()`.
- If not passed to `connect()`, then `.dispatch()` is injected to component's `props`.

### Async Redux

#### Thunks

- Type of Redux middleware.
- A function that wraps an expression to delay its evaluation.
- Thunk middleware checks if you are trying to dispatch a function instead of an action. If so, it will:
  - Feed the function state: `dispatch` and `getState`. It allows inject an additional argument so you can pass it an external library, e.g. Axios for making API calls.
  - Call the function you fed it (e.g. an API call).
  - kamion
- Using thunks has no impact on your components. Your components have no knowledge whether your action creators are synchronous or asynchronous.

### npm packages

- 'redux'
- 'react-redux'
- `redux-immutable-state-invariant`
- 'PropTypes' to document what the component expects. Enforced only in development environments, due to high cost.
- npm `classNames` package.
- npm `immer` package for immutable data changes. Others: `Immutable.js`
