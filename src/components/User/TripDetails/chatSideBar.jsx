import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helper from "../../Helper/Helper";

class ChatSideBar extends Helper {
  state = {
    changeChat: false
  };
  render() {
    return (
      <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-3 chat-leftsec">
        <div className="chat-list-wrap">
          <button
            className="navbar-toggler chat-menu"
            type="button"
            data-toggle="collapse"
            data-target="#chat-list"
            aria-controls="chat-list"
            aria-expanded="false"
          >
            <span className="float-left">Chat List</span>
            <span className="navbar-toggler-icon chat-menu-icon float-right">
              <img src="assets/img/comment.svg" />
            </span>
          </button>
          <div className="input-group mb-3 search-box">
            <div className="input-group-prepend">
              <span className="input-group-text" id="search">
                <i className="fas fa-search" />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search Here"
              aria-label="Username"
              aria-describedby="search"
            />
          </div>

          <div
            className="chat-list-block collapse navbar-collapse"
            id="chat-list"
          >
            {this.props.chatList.map((list, index) => (
              <Link
                to="#"
                key={list.provider_id}
                className="chat-list-box"
                onClick={event => this.changeChatfun(event, index)}
              >
                <div className="chat-prof-img">
                  <img src={list.provider_picture} />
                </div>
                <div className="chat-prof-content">
                  <h5 className="chat-name">{list.provider_name}</h5>
                  <p className="chat-msg">{list.message}</p>
                  <p className="chat-date">{list.updated_at}</p>
                </div>
                <div className="clear-both" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatSideBar;
