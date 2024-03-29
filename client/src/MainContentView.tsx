import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faEye,
  faComment
} from "@fortawesome/free-solid-svg-icons";
import { Markup } from "interweave";
import classNames from "classnames";
import { Article } from "./types/articleTypes";

interface Props {
  article?: Article;
}

interface State {
  upvote: boolean;
  downvote: boolean;
  comment: boolean;
}

export default class MainContentView extends React.Component<Props> {
  state: State = {
    upvote: false,
    downvote: false,
    comment: false
  };

  handleMouseUp() {
    const selectedText = window.getSelection();
    if (selectedText) {
      console.log(`Selected text: ${selectedText.toString()}`);
    }
  }

  toggleUpVote = () => {
    this.setState({ upvote: !this.state.upvote });
  };

  toggleDownVote = () => {
    this.setState({ downvote: !this.state.downvote });
  };

  render() {
    const { article } = this.props;

    if (!article) {
      return <div>Sorry, we couldn't find this article...</div>;
    }
    const { upvote, downvote, comment } = this.state;

    return (
      <div className="p-5 container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h3 className="mb-1 category">Intro to Programming</h3>
            <h1 className="font-weight-bold mt-1">{article.title}</h1>
            <div className="d-flex flex-row justify-content-between">
              <div>
                <img
                  className="MainContentView__collaborators"
                  src="../assets/mai-headshot.png"
                />
                <img
                  className="MainContentView__collaborators MainContentView__overlap"
                  src="../assets/asher.png"
                />
                <img
                  className="MainContentView__collaborators MainContentView__overlap"
                  src="../assets/ben-headshot.png"
                />
              </div>
              <div className="d-flex flex-row align-items-center MainContentView__reaction">
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                <div className="mr-3 MainContentView__reactionNumber">1496</div>
                <FontAwesomeIcon icon={faComment} className="mr-1" />
                <div className="mr-3 MainContentView__reactionNumber">56</div>
                <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                <div className="mr-3 MainContentView__reactionNumber">234</div>
                <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
                <div className="MainContentView__reactionNumber">34</div>
              </div>
            </div>
            <p className="mt-2 MainContentView__lastEdited">
              Last edited: 02/14/2020
            </p>
            {article.body ? <Markup content={article.body} /> : "Nothing here"}
            {/* <BootstrapTooltip
              title={
                <>
                  <a href="http://iamili.com">click me</a>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={classNames("ml-2 mr-2", {
                      MainContentView__upvoted: upvote
                    })}
                    size="2x"
                    onClick={this.toggleUpVote}
                  />
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    className={classNames("mr-2", {
                      MainContentView__downvoted: downvote
                    })}
                    size="2x"
                    onClick={this.toggleDownVote}
                  />
                  <FontAwesomeIcon
                    icon={faComment}
                    className={classNames("mr-2", {
                      reactionAdded: comment
                    })}
                    size="2x"
                  />
                </>
              }
            >
              <p
                data-tip="hello world"
                className="mt-5"
                onMouseUp={this.handleMouseUp}
              >
                {article.body ? (
                  <Markup content={article.body.content} />
                ) : (
                  "Nothing here"
                )}
              </p>
            </BootstrapTooltip> */}
            <FontAwesomeIcon
              icon={faThumbsDown}
              className={classNames("mr-2", {
                MainContentView__downvoted: downvote
              })}
              size="2x"
              onClick={this.toggleDownVote}
            />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    );
  }
}
