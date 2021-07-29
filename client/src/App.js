import React, { useEffect } from "react";
import "./App.css";
import Home from "./screens/Home";
import EditProfile from "./screens/EditProfile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Protected from "./components/Protected";
import UnProtected from "./components/UnProtected";
import TodosScreen from "./screens/TodosScreen";
import CreateTodo from "./screens/CreateTodo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditTodo from "./screens/EditTodo";
import { load_todos } from "./redux/actions/TodoReducerActions";
import { useSelector, useDispatch } from "react-redux";
import { get_all_users } from "./redux/actions/AllUsersActions";
import ShowProfile from "./screens/ShowProfile";
import Comments from "./screens/Comments";
import { load_comments } from "./redux/actions/CommentsReducer_Actions";

function App() {
  const dispatch = useDispatch();
  let AuthReducer = useSelector((state) => state.AuthReducer);
  let TodoReducer = useSelector((state) => state.TodoReducer);
  let CommentsReducer = useSelector((state) => state.CommentsReducer);
  const AllUsers = useSelector((state) => state.AllUsers);

  useEffect(() => {
    dispatch(load_todos());
    dispatch(load_comments());
    console.log("running 1");
  }, []);

  useEffect(() => {
    dispatch(get_all_users());
    console.log("running 2");
  }, []);

  return (
    <Router>
      <Switch>
        {/* Un-Protected Routes */}
        <Route exact path="/">
          <UnProtected Cmp={Login} />
        </Route>
        <Route exact path="/Register">
          <UnProtected Cmp={Register} />
        </Route>
        <Route exact path="/TodosScreen" component={TodosScreen} />

        {/* Un-Protected Routes */}

        {/* Protected Routes */}
        <Route exact path="/Home">
          <Protected Cmp={Home} />
        </Route>
        <Route exact path="/EditProfile/:id">
          <Protected Cmp={EditProfile} />
        </Route>
        <Route exact path="/TodosScreen">
          <Protected Cmp={TodosScreen} />
        </Route>
        <Route exact path="/CreateTodo">
          <Protected Cmp={CreateTodo} />
        </Route>
        <Route exact path="/EditTodo/:id">
          <Protected Cmp={EditTodo} />
        </Route>
        <Route exact path="/ShowProfile/:id">
          <Protected Cmp={ShowProfile} />
        </Route>
        <Route exact path="/Comments/:id">
          <Protected Cmp={Comments} />
        </Route>
        {/* Protected Routes */}
      </Switch>
    </Router>
  );
}

export default App;
