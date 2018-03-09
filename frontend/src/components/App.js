import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import styled, { injectGlobal } from "styled-components"
import Header from "./Header"
import PostsList from "./PostsList"
import PostDetails from "./PostDetails"
import NotFound from "./NotFound"

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
`

const Content = styled.div`
  padding: 2rem;
`

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
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

export default App
