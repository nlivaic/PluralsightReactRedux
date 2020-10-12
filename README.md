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
- <BrowserRouter as Router>
- <Route>
- <Link> and <NavLink>
- <Redirect> or history
- <Switch>
- <Prompt>

### Forms

- Consult sample project.
- Use `react-toastify` to notify user on save. We are displaying `<ToastContainer>` on the `<App>`, so you can call `toast.success()` from anywhere in the app.

### Redux

- Three core principles:
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
- To change store, you will have to copy the state and make the change. You can do that with `Object.assign()` and spread operator. Both ways perform shallow copy. Make sure you go for deep copy only if something changed in that specific part of the state, otherwise you will be incurring unncecessary rerenders and slow down your application.
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

* Dos:
  - _Every_ reducer is called dispatch. This means every reducer should check the action type and return immediately if the action type is meant for some other reducer.
* Each reducer only handles its own slice of the store.
* EAch reducer can handle one or more actions. Each action can be handled by one or more reducers.

#### mapStateToProps

- Limit parts of Redux state you want exposed to components as props.

#### mapDispatchToProps

- Wraps action creators in `dispatch()`.

### Try out

- npm `classNames` package.
- npm `immer` package for immutable data changes. Others: `Immutable.js`

* npm `redux-immutable-state-invariant` package, issuing a warning when you change Redux state directly. Run this only in development, it is expensive.
