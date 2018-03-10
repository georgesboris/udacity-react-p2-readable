// react
import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Header from "./Header"
import PostsList from "./PostsList"
import PostDetails from "./PostDetails"
import NotFound from "./NotFound"
// redux
import { connect } from "react-redux"
import { fetchCategories } from "../redux/actions"
// etc
import styled, { injectGlobal } from "styled-components"

/**
 * GLOBAL STYLES
 */

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    font-family: -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
  }
  body {
    background: #111;
    color: white;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button:focus,
  button:active {
    outline: none;
  }
`

/**
 * STYLES
 */

const Content = styled.div`
  padding: 2rem 2rem 2rem 32rem;
`

/**
 * COMPONENT
 */

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/:category?"
              render={({ match }) => (
                <Header activeCategory={match.params.category} />
              )}
            />
            <Route path="/" component={Header} />
          </Switch>

          <Content>
            <Switch>
              <Route
                exact
                path="/:category?"
                render={({ match }) => (
                  <PostsList category={match.params.category} />
                )}
              />
              <Route
                exact
                path="/:category/:postId"
                render={({ match }) => (
                  <PostDetails postId={match.params.postId} />
                )}
              />
              <Route path="/" component={NotFound} />
            </Switch>
          </Content>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, {
  fetchCategories
})(App)
