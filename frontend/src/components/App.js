// react
import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Header from "./Header"
import PostsList from "./PostsList"
import PostDetails from "./PostDetails"
import NotFound from "./NotFound"
import Modal from "./Modal"
import FormCreatePost from "./FormCreatePost"
import FormUpdatePost from "./FormUpdatePost"
import FormCreateComment from "./FormCreateComment"
import FormUpdateComment from "./FormUpdateComment"
// redux
import { connect } from "react-redux"
import { fetchCategories, hideModal } from "../redux/actions"
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
    const { modal, hideModal } = this.props
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
                  <PostsList activeCategory={match.params.category} />
                )}
              />
              <Route
                exact
                path="/:category/:postId"
                render={({ match }) => (
                  <PostDetails
                    category={match.params.category}
                    postId={match.params.postId}
                  />
                )}
              />
              <Route path="/" component={NotFound} />
            </Switch>
          </Content>

          {!modal || !modal.type ? null : (
            <Modal onDismiss={hideModal}>
              {modal.type === "CREATE_POST" ? (
                <FormCreatePost onSubmit={hideModal} />
              ) : modal.type === "UPDATE_POST" ? (
                <FormUpdatePost
                  postId={modal.payload.postId}
                  onSubmit={hideModal}
                />
              ) : modal.type === "CREATE_COMMENT" ? (
                <FormCreateComment
                  parentId={modal.payload.parentId}
                  onSubmit={hideModal}
                />
              ) : modal.type === "UPDATE_COMMENT" ? (
                <FormUpdateComment
                  comment={modal.payload.comment}
                  onSubmit={hideModal}
                />
              ) : null}
            </Modal>
          )}
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(state => ({ modal: state.modal }), {
  fetchCategories,
  hideModal
})(App)
