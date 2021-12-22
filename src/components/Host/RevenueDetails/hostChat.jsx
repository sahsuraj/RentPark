import React, { Component } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import openSocket from "socket.io-client";
import api from "../../../HostEnvironment";
import HostHelper from "../../Helper/hostHelper";
import { apiConstants } from "./../../Constant/constants";

let socket;

let host_details;
let user_details;
let pricing_details;
let page;

class HostChat extends HostHelper {
  constructor(props) {
    super(props);

    // States and props usage
  }

  state = {
    message: null,
    data: null,
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
    chatIndex: 0,
    loading: true
  };

  componentDidMount() {
    // Call api function
    if (this.props.location.state) {
      if (this.props.location.state.page == "singletrip") {
        host_details = this.props.location.state.booking_details;
        user_details = this.props.location.state.booking_details.user_details;
        pricing_details = this.props.location.state.booking_details
          .pricing_details;
        page = "singletrip";
      }

      this.setState({ loading: false });
      this.socketConnectionfun(
        user_details.user_id,
        localStorage.getItem("hostId"),
        host_details.host_id
      );
      this.chatDetailsApiCall();
    } else {
      this.props.history.goBack();
    }
  }

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
        providerId
    });

    socket.emit("update sender", {
      commonid:
        "user_id_" +
        userId +
        "_provider_id_" +
        providerId +
        "_host_id_" +
        hostId,
      myid: providerId
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

  chatDetailsApiCall = () => {
    let inputData;

    if (host_details.booking_id === undefined) {
      inputData = {
        host_id: host_details.host_id,
        user_id: user_details.user_id,
        skip: this.state.chatHistorySkipCount
      };
    } else {
      inputData = {
        booking_id: host_details.booking_id,
        host_id: host_details.host_id,
        user_id: user_details.user_id,
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
            loadingStatusChatHistory: true
          });
        }
      } else {
        //
      }
    });
  };

  handleOnChange = ({ currentTarget: input }) => {
    this.setState({ inputMessage: input.value });
    //
  };

  handleSubmit = event => {
    event.preventDefault();

    let chatData = [
      {
        provider_id: localStorage.getItem("hostId"),
        user_id: user_details.user_id,
        message: this.state.inputMessage,
        host_id: host_details.host_id,
        booking_id: host_details.booking_id,
        chat_type: "pu",
        provider_picture: localStorage.getItem("host_picture")
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

  loadMoreChatHistory = event => {
    event.preventDefault();
    this.setState({
      loadingStatusChatHistory: false,
      loadingContentChatHistory: "Loading...",
      loadMoreChatHistory: true
    });
    this.chatDetailsApiCall();
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
      loadingStatusChatHistory,
      loading
    } = this.state;

    return (
      <div className="main">
        {loading ? (
          "Loading..."
        ) : (
          <div className="row m-0">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-4 chat-leftsec">
              <div className="chat-details text-center">
                <img src={user_details.picture} className="chat-profile-img" />
                <h4 className="chat-provider-head">{user_details.user_name}</h4>

                <div className="text-left">
                  <h2 className="chathead">trip details</h2>
                  {host_details.host_name}
                  <p className="overview-line" />

                  {page == "history" ? (
                    <div>
                      <h5 className="choosen-details">
                        <i className="fas fa-user mr-3" />
                        {host_details.duration}
                      </h5>
                      <h5 className="choosen-details">
                        <i className="far fa-calendar-alt mr-3" />
                        {host_details.checkin} {host_details.checkin_time}
                        <i className="fas fa-arrow-right ml-3 mr-3" />
                        {host_details.checkout} {host_details.checkout_time}
                      </h5>
                      <p className="overview-line" />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="row">
                    <div className="col-6">
                      <h5 className="choosen-details">Total </h5>
                    </div>
                    <div className="col-6 text-right">
                      <h5 className="choosen-details">
                        {host_details.total_formatted}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8 chat-rightsec">
              <div className="relative height-100">

                <div className="chat-header">
                    <div className="chat-list-box single-chat-box">
                        <div className="chat-prof-img">
                            <img src={user_details.picture}></img>
                        </div>
                        <div className="chat-prof-content">
                            <h5 className="chat-name">{user_details.user_name}</h5>
                            {/* <p className="chat-date">10 Days Ago</p> */}
                        </div>
                        <div className="clear-both"></div>
                    </div>
                </div>

                <div className="chat-content">
                  <div className="text-center">
                    {loadingStatusChatHistory ? "" : loadingContentChatHistory}
                    <a
                      href="category/index.html"
                      className="show-all"
                      onClick={event => this.loadMoreChatHistory(event)}
                    >
                      {loadingChatData
                        ? ""
                        : chatData.length > 0
                        ? "Show More"
                        : ""}
                    </a>
                  </div>
                  {loadingChatData
                    ? ""
                    : chatData.map((chat, index) =>
                        chat.chat_type == "up" ? (
                          <div className="chat-left">
                            <div className="display-inline">
                              <img
                                className="chat-img-left"
                                src={chat.user_picture}
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

                <div className="chat-footer">
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-group dropdown">
                      <input
                        type="text"
                        className="form-control dropdown-toggle"
                        data-toggle="dropdown"
                        placeholder="Enter your message"
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
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HostChat;
