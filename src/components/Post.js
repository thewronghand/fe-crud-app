import { React, useState, useRef } from "react";
import { postUtils } from "../firebase/utils";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTrashCan,
  faPenToSquare,
  faEllipsis,
  faXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import EditForm from "./EditForm";

import { useRecoilValue } from "recoil";
import { userState } from "../recoil/login/loginAtom";

const MenuPopover = styled(Popover)`
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  --bs-popover-bg: ${(props) => (props.bgColor ? props.bgColor : "white")};
  width: 100px;
  display: flex;
  border: 1px solid black;
  padding-left: none;
  z-index: 0;
  --bs-popover-arrow-border: black;
  --bs-popover-arrow-color: red;
  > .popover-body {
    > .sub_button {
      color: ${(props) => (props.color ? props.color : "black")};
      cursor: pointer;
      &:hover {
        color: ${(props) => (props.alt ? props.alt : "red")};
      }
    }
  }
`;

const PostContainer = styled.li`
  color: ${(props) => (props.color ? props.color : "black")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 250px;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  transition: 0.2s;
  > .post_content {
    padding: 10px;
    > .post_title {
      font-size: 1.5rem;
      margin-bottom: 6px;
    }
    > .createdAt {
      font-size: 0.8rem;
    }
    > .updatedAt {
      font-size: 0.8rem;
    }
    > .post_message {
      margin-top: 10px;
      white-space: normal;
      word-break: break-all;
    }
  }

  > .post_info {
    display: flex;
    border-top: 1px solid black;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    > .profile_picture {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${(props) => (props.color ? props.color : "black")};
      border-radius: 70%;
      margin: 5px;
      > img {
        width: 40px;
        border-radius: 70%;
      }
    }
    > .username {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1.2em;
    }
    > .popover_toggle {
      width: 50px;
      height: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      border-left: 1px solid black;
      transition: 0.2s;
      &:hover {
        background-color: #de3e7d;
        color: black;
        cursor: pointer;
      }
      &:active {
        background-color: #cc2570;
        color: ${(props) => (props.color ? props.color : "black")};
      }
    }
  }
`;

const MoreButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.color ? props.color : "black")};
  border: 1px solid ${(props) => (props.color ? props.color : "black")};
  border-radius: 10px;
  width: 30px;
  height: 30px;
  transition: 0.2s;
  &:hover {
    background-color: #de3e7d;
  }
  &:active {
    background-color: transparent;
    color: ${(props) => (props.color ? props.color : "black")};
    border: 1px solid ${(props) => (props.color ? props.color : "black")};
    border-radius: 10px;
  }
`;

const PostInfoWrapper = styled.div`
  display: flex;
  border-top: 1px solid black;
  height: 50px;
  align-items: center;
  > .profile_picture_no_user {
    position: absolute;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) => (props.color ? props.color : "black")};
    border-radius: 70%;
    margin: 5px;
    order: 1;
    > img {
      width: 40px;
      border-radius: 70%;
    }
  }
  > .username_no_user {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    margin: auto;
  }
`;

function PostInfoNoOverlay({ postData }) {
  return (
    <PostInfoWrapper>
      <div className="profile_picture_no_user">
        <img src={postData.user.photoURL} alt={postData.user.displayName} />
      </div>
      <div className="username_no_user">{postData.user.displayName}</div>
    </PostInfoWrapper>
  );
}

function Post({ postData }) {
  const [isMoreButtonClicked, setIsMoreButtonClicked] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const user = useRecoilValue(userState);

  const HandleMoreButtonClick = () => {
    setIsMoreButtonClicked(!isMoreButtonClicked);
  };

  const openEditFormHandler = () => {
    setEditFormOpen(!editFormOpen);
  };

  const popover = (
    <MenuPopover
      className="popover_menu"
      bgColor={postData.colorScheme.background}
      color={postData.colorScheme.color}
      alt={postData.colorScheme.alt}
    >
      <Popover.Body onClick={() => document.body.click()}>
        <div className="sub_button" onClick={openEditFormHandler}>
          <FontAwesomeIcon icon={faPenToSquare} />
          {" edit"}
        </div>
        <div
          className="sub_button"
          onClick={() => {
            handleDeleteButtonClick(postData.id);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          {" delete"}
        </div>
      </Popover.Body>
    </MenuPopover>
  );

  const handleDeleteButtonClick = async (postId) => {
    await postUtils.deletePost(postId);
    console.log("post deleted");
  };

  return (
    <PostContainer
      color={postData.colorScheme.color}
      bgColor={postData.colorScheme.background}
    >
      {editFormOpen ? (
        <EditForm
          modalCloseHandler={openEditFormHandler}
          postDataProp={postData}
        />
      ) : null}
      <div className="post_content">
        <div className="post_title">{postData.title}</div>
        <div className="createdAt">{`작성됨 : ${postData.createdAt}`}</div>
        {!postData.updatedAt ? null : (
          <div className="updatedAt">{`수정됨 : ${postData.updatedAt}`}</div>
        )}
        <div className="post_message">
          {postData.content.length > 210 ? (
            !isMoreButtonClicked ? (
              <div>
                {postData.content.slice(0, 210) + "... "}

                <MoreButton
                  color={postData.colorScheme.color}
                  bgColor={postData.colorScheme.background}
                  alt={postData.colorScheme.alt}
                  onClick={HandleMoreButtonClick}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </MoreButton>
              </div>
            ) : (
              <div>
                {postData.content + " "}
                <MoreButton
                  color={postData.colorScheme.color}
                  bgColor={postData.colorScheme.background}
                  alt={postData.colorScheme.alt}
                  onClick={HandleMoreButtonClick}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </MoreButton>
              </div>
            )
          ) : (
            postData.content
          )}
        </div>
      </div>
      {user ? (
        user.uid === postData.user.uid ? (
          <div className="post_info">
            <div className="profile_picture">
              <img
                src={postData.user.photoURL}
                alt={postData.user.displayName}
              />
            </div>
            <div className="username">{postData.user.displayName}</div>

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              rootClose
            >
              <div className="popover_toggle">
                <FontAwesomeIcon icon={faBars} />
              </div>
            </OverlayTrigger>
          </div>
        ) : (
          <PostInfoNoOverlay postData={postData} />
        )
      ) : (
        <PostInfoNoOverlay postData={postData} />
      )}
    </PostContainer>
  );
}

export default Post;
