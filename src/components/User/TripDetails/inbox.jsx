import React, { Component } from "react";
import api from "../../../Environment";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { apiConstants } from "./../../Constant/constants";

let socket;

class Inbox extends Component {
  state = {
    chatList: null,
    loadingChatList: true,
    socket: false,
    inputMessage: null,
    chatData: null,
    loadingChatData: true,
    headerDetail: null,
    headerDetailsLoadFirst: true,
    headerContentLoading: true,
    loadingStatus: true,
    loadingContent: null,
    loadingStatusChatHistory: true,
    loadingContentChatHistory: null,
    chatListskipCount: 0,
    chatHistorySkipCount: 0,
    loadMoreChatHistory: false,
    chatIndex: 0
  };
  componentDidMount() {
    this.chatListApiCall(0);
  }

  chatListApiCall = loadMoreStatus => {
    let items;
    api
      .postMethod("bookings_inbox", { skip: this.state.chatListskipCount })
      .then(response => {
        if (response.data.success) {
          if (this.state.chatList != null) {
            items = [...this.state.chatList, ...response.data.data];
          } else {
            items = [...response.data.data];
          }
          this.setState({
            chatList: items,
            loadingChatList: false,
            chatListskipCount:
              response.data.data.length + this.state.chatListskipCount,
            loadingStatus: true
          });

          if (this.state.chatList.length > 0 && loadMoreStatus == 0) {
            this.headerDetails(0);
            this.chatDetailsApiCall(0);
          } else {
            this.setState({
              headerContentLoading: false
            });
          }
        }
      });
  };

  socketConnectionfun = (userId, providerId, hostId) => {
    socket = io(apiConstants.socketUrl, {
      query:
        `commonid: 'user_id_` +
        userId +
        `_provider_id_` +
        providerId +
        `_host_id_` +
        hostId +
        `', myid: ` +
        userId
    });

    socket.emit("update sender", {
      commonid:
        "user_id_" +
        userId +
        "_provider_id_" +
        providerId +
        "_host_id_" +
        hostId,
      myid: userId
    });
    let chatContent;
    socket.on("message", newData => {
      //  if(newData.chattype)

      let content = [];
      content.push(newData);
      chatContent = [...this.state.chatData, ...content];
      this.setState({ chatData: chatContent });
    });
  };

  chatDetailsApiCall = index => {
    let inputData;
    if (this.state.chatList[index].booking_id == 0) {
      inputData = {
        host_id: this.state.chatList[index].host_id,
        provider_id: this.state.chatList[index].provider_id,
        skip: this.state.chatHistorySkipCount
      };
    } else {
      inputData = {
        booking_id: this.state.chatList[index].booking_id,
        host_id: this.state.chatList[index].host_id,
        provider_id: this.state.chatList[index].provider_id,
        skip: this.state.chatHistorySkipCount
      };
    }

    api.postMethod("bookings_chat_details", inputData).then(response => {
      let chathistory;
      if (response.data.success) {
        if (this.state.loadMoreChatHistory) {
          if (this.state.chatData != null) {
            chathistory = [
              ...response.data.data.reverse(),
              ...this.state.chatData
            ];
          } else {
            chathistory = [...response.data.data.reverse()];
          }
          this.setState({
            chatData: chathistory,
            loadingChatData: false,
            chatHistorySkipCount:
              response.data.data.length + this.state.chatHistorySkipCount,
            loadingStatusChatHistory: true,
            loadMoreChatHistory: false
          });
        } else {
          chathistory = response.data.data.reverse();
          this.setState({
            chatData: chathistory,
            loadingChatData: false,
            chatHistorySkipCount: response.data.data.length,
            loadingStatusChatHistory: true,
            chatIndex: index
          });
        }
      } else {
        //
      }
    });
  };

  headerDetails = async index => {
    await this.setState({
      headerDetail: this.state.chatList[index],
      headerContentLoading: false
    });

    if (!this.state.headerContentLoading) {
      this.socketConnectionfun(
        localStorage.getItem("userId"),
        this.state.headerDetail.provider_id,
        this.state.headerDetail.host_id
      );
    }
  };

  handleOnChange = ({ currentTarget: input }) => {
    this.setState({ inputMessage: input.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let chatData = [
      {
        user_id: this.state.chatData[0].user_id,
        provider_id: this.state.chatData[0].provider_id,
        message: this.state.inputMessage,
        host_id: this.state.chatData[0].host_id,
        booking_id: this.state.chatData[0].booking_id,
        chat_type: "up",
        user_picture: localStorage.getItem("user_picture")
      }
    ];

    socket.emit("message", chatData[0]);

    let messages;

    if (this.state.chatData != null) {
      messages = [...this.state.chatData, ...chatData];
    } else {
      messages = [...chatData];
    }
    this.setState({
      chatData: messages,
      inputMessage: ""
    });
  };

  changeChatfun = async (event, index) => {
    event.preventDefault();
    socket.disconnect();
    await this.setState({ chatHistorySkipCount: 0 });
    this.headerDetails(index);
    this.chatDetailsApiCall(index);
  };

  loadMoreChatList = event => {
    event.preventDefault();
    this.setState({ loadingStatus: false, loadingContent: "Loading..." });

    this.chatListApiCall(1);
  };

  loadMoreChatHistory = event => {
    event.preventDefault();
    this.setState({
      loadingStatusChatHistory: false,
      loadingContentChatHistory: "Loading...",
      loadMoreChatHistory: true
    });
    this.chatDetailsApiCall(this.state.chatIndex);
  };

  render() {
    const {
      chatList,
      loadingChatList,
      chatData,
      loadingChatData,
      headerDetail,
      headerContentLoading,
      loadingStatus,
      loadingContent,
      loadingContentChatHistory,
      loadingStatusChatHistory
    } = this.state;

    return (
      <div className="main">
        {loadingChatList ? (
          "Loading"
        ) : chatList.length > 0 ? (
          <div className="row m-0">
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

                <div
                  className="chat-list-block collapse navbar-collapse"
                  id="chat-list"
                >
                  {chatList.map((list, index) => (
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
                <div className="text-center">
                  {loadingStatus ? "" : loadingContent}
                  {chatList.length > 0 ? (
                    <a
                      href="#"
                      className="show-all"
                      onClick={this.loadMoreChatList}
                    >
                      show more
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-9 chat-rightsec">
              {loadingChatList ? (
                "Loading.. "
              ) : (
                <div className="relative height-100">
                  {headerContentLoading ? (
                    "Loading..."
                  ) : headerDetail ? (
                    <div className="chat-header">
                      <div className="chat-list-box single-chat-box">
                        <div className="chat-prof-img">
                          <img src={headerDetail.provider_picture} />
                        </div>
                        <div className="chat-prof-content">
                          <h5 className="chat-name">
                            {headerDetail.provider_name}
                          </h5>
                          <p className="chat-date">{headerDetail.updated_at}</p>
                        </div>
                        <div className="clear-both" />
                      </div>
                    </div>
                  ) : (
                    <div className="chat-name m-t-10">
                      <p className="text-center">No Messages found.</p>
                    </div>
                  )}

                  {loadingChatData ? (
                    ""
                  ) : (
                    <div className="chat-content">
                      {chatData.length > 0 ? (
                        <div className="text-center">
                          {loadingStatusChatHistory
                            ? ""
                            : loadingContentChatHistory}
                          <a
                            href="category/index.html"
                            className="show-all"
                            onClick={event => this.loadMoreChatHistory(event)}
                          >
                            show more
                          </a>
                        </div>
                      ) : (
                        ""
                      )}

                      {chatData.map((chat, index) =>
                        chat.chat_type == "pu" ? (
                          <div className="chat-left">
                            <div className="display-inline">
                              <img
                                className="chat-img-left"
                                src={chat.provider_picture}
                              />
                              <div className="chat-content-right">
                                <div className="chat-message">
                                  {chat.message}{" "}
                                </div>
                                <p className="clearfix m-0" />
                                <p className="chat-time">{chat.updated_at}</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="clearfix" />
                            <div className="chat-right">
                              <div className="display-inline">
                                <div className="chat-content-right">
                                  <div className="chat-message">
                                    {chat.message}{" "}
                                  </div>
                                  <p className="clearfix m-0" />
                                  <p className="chat-time text-right">
                                    {chat.updated_at}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div className="chat-footer">
                    <form onSubmit={this.handleSubmit}>
                      <div className="input-group dropdown">
                        <input
                          type="text"
                          className="form-control dropdown-toggle"
                          data-toggle="dropdown"
                          placeholder="enter your message"
                          name="message"
                          value={this.state.inputMessage}
                          onChange={this.handleOnChange}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text" id="basic-addon">
                            <i className="fas fa-paper-plane" />
                          </span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          "There is no message for you..."
        )}
      </div>
    );
  }
}

export default Inbox;
