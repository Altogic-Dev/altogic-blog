import { Dialog, Transition } from '@headlessui/react';
import { DateTime } from 'luxon';
import { ChatIcon, HeartIcon, XIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { notificationsActions } from '@/redux/notifications/notificationsSlice';
import { storyActions } from '@/redux/story/storySlice';
import Quill from 'quill';
import { BoldBlot, ItalicBlot } from '@/utils/QuillBlots';
import Button from '../basic/button';
import Avatar from '../profile/Avatar';
import ListObserver from '../ListObserver';

export default function Replies({ story, slideOvers, setSlideOvers }) {
  const dispatch = useDispatch();

  const editor = useRef();

  const replies = useSelector((state) => state.story.replies);
  const replyCount = useSelector((state) => state.story.replyCount);
  const storyIsLoading = useSelector((state) => state.story.isLoading);
  const user = useSelector((state) => state.auth.user);

  const [commentBoxes, setCommentBoxes] = useState([]);
  const [commentText, setCommentText] = useState([]);
  const [showReplies, setShowReplies] = useState([]);
  const [replyLimit, setReplyLimit] = useState(10);
  const [quillInstance, setQuillInstance] = useState();

  const getReplies = () => {
    dispatch(
      storyActions.getStoryRepliesRequest({
        story: story._id,
        limit: replyLimit,
        page: 1,
      })
    );
  };

  const getReplyComments = (reply) => {
    dispatch(storyActions.getReplyCommentsRequest(reply));
  };

  const createReply = (reply) => {
    dispatch(storyActions.createReplyRequest(reply));
  };
  const createComment = (comment) => {
    dispatch(storyActions.createReplyCommentRequest(comment));
  };
  const sendNotification = (type) => {
    if (user._id !== story.user._id) {
      dispatch(
        notificationsActions.createNotificationRequest({
          targetId: story._id,
          targetTitle: story.title,
          sentUsername: user.username,
          sentUser: user._id,
          type,
          targetSlug: story.storySlug,
          sentUserProfilePicture: user.profilePicture,
          user: story.user._id,
        })
      );
    }
  };
  const getComments = (reply) => {
    getReplyComments(reply._id);
  };

  const handleShowComments = (reply, index) => {
    if (!replies[index].comments) {
      getComments(reply, index);
    }
    setShowReplies((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleRespond = (e) => {
    e.preventDefault();

    const reply = {
      story: story._id,
      name: user.name,
      user: user._id,
      type: 'story',
      userProfilePicture: user.profilePicture,
      username: user.username,
      content: quillInstance.root.innerHTML,
      likeCount: 0,
      commentCount: 0,
      author: story.user._id,
    };
    createReply(reply);
    setCommentText('');
    sendNotification('reply');
  };
  const handleComment = (e, reply, index) => {
    e.preventDefault();

    const comment = {
      reply: reply._id,
      name: user.name,
      user: user._id,
      userProfilePicture: user.profilePicture,
      username: user.username,
      content: commentText[index],
    };

    createComment(comment);

    setCommentText((prev) => {
      const temp = [...prev];
      temp[index] = '';
      return temp;
    });
    sendNotification('comment');
  };

  useEffect(() => {
    if (slideOvers) {
      setTimeout(() => {
        const quill = new Quill('#reply-input', {
          placeholder: 'What are you thoughts?',
        });

        setQuillInstance(quill);
        Quill.register(BoldBlot);
        Quill.register(ItalicBlot);
        console.log(quill);
      }, 1);
    }
  }, [slideOvers]);

  useEffect(() => {
    if (story) getReplies();
  }, [story, replyLimit]);

  const boldButton = () => {
    quillInstance.format('bold', true);
  };
  const italicButton = () => {
    quillInstance.format('italic', true);
  };

  return (
    <Transition.Root show={slideOvers} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setSlideOvers}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white p-6 shadow-xl overflow-y-scroll">
                    <div>
                      <div className="flex items-start justify-between pb-3">
                        <Dialog.Title className="text-slate-800 text-lg font-medium tracking-sm">
                          Write a responses
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="bg-white p-3 text-gray-400 rounded-md hover:text-gray-500 focus:ring-2 focus:ring-purple-500"
                            onClick={() => setSlideOvers(!slideOvers)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* Slide Over Form */}
                      <form
                        name="respond"
                        onSubmit={(e) => handleRespond(e)}
                        className="mb-12"
                      >
                        <div className="bg-white p-4 mb-6 border border-slate-50 shadow-md rounded-[10px]">
                          <div className="flex items-center gap-2 mb-4">
                            <Avatar
                              className="w-8 h-8 object-cover rounded-full"
                              src={_.get(user, 'profilePicture')}
                              alt={_.get(user, 'name')}
                            />
                            <span className="text-slate-700 text-sm font-medium tracking-sm">
                              {_.get(user, 'name')}
                            </span>
                          </div>
                          <div className="mb-4 h-24">
                            <div
                              ref={editor}
                              id="reply-input"
                              className="block w-full h-full max-w-lg text-slate-500 p-0 text-sm tracking-sm border-0 placeholder:text-slate-500 focus:outline-none focus:ring-0"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Button
                                onClick={boldButton}
                                type="button"
                                className="group inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-150 hover:bg-slate-50"
                              >
                                <svg
                                  className="w-6 h-6 text-slate-400 transition ease-in-out duration-150 group-hover:text-slate-700"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7 4C7 3.44772 6.55228 3 6 3C5.44772 3 5 3.44772 5 4H7ZM5 20C5 20.5523 5.44772 21 6 21C6.55228 21 7 20.5523 7 20H5ZM9.5 11C8.94772 11 8.5 11.4477 8.5 12C8.5 12.5523 8.94772 13 9.5 13V11ZM4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5V3ZM4 19C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21V19ZM5 4V20H7V4H5ZM9.5 5H15.5V3H9.5V5ZM15.5 11H9.5V13H15.5V11ZM18.5 8C18.5 9.65685 17.1569 11 15.5 11V13C18.2614 13 20.5 10.7614 20.5 8H18.5ZM15.5 5C17.1569 5 18.5 6.34315 18.5 8H20.5C20.5 5.23858 18.2614 3 15.5 3V5ZM9.5 13H16.5V11H9.5V13ZM16.5 19H9.5V21H16.5V19ZM19.5 16C19.5 17.6569 18.1569 19 16.5 19V21C19.2614 21 21.5 18.7614 21.5 16H19.5ZM16.5 13C18.1569 13 19.5 14.3431 19.5 16H21.5C21.5 13.2386 19.2614 11 16.5 11V13ZM8.5 4V20H10.5V4H8.5ZM9.5 3H4V5H9.5V3ZM9.5 19H4V21H9.5V19Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Button>
                              <Button
                                onClick={italicButton}
                                type="button"
                                className="group inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-150 hover:bg-slate-50"
                              >
                                <svg
                                  className="w-6 h-6 text-slate-400 transition ease-in-out duration-150 group-hover:text-slate-700"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.1863 4.35112C14.3802 3.834 14.1182 3.25759 13.6011 3.06367C13.084 2.86975 12.5076 3.13176 12.3137 3.64888L14.1863 4.35112ZM6.31367 19.6489C6.11975 20.166 6.38176 20.7424 6.89888 20.9363C7.416 21.1302 7.99241 20.8682 8.18633 20.3511L6.31367 19.6489ZM17.6863 4.35112C17.8802 3.834 17.6182 3.25759 17.1011 3.06367C16.584 2.86975 16.0076 3.13176 15.8137 3.64888L17.6863 4.35112ZM9.81367 19.6489C9.61975 20.166 9.88176 20.7424 10.3989 20.9363C10.916 21.1302 11.4924 20.8682 11.6863 20.3511L9.81367 19.6489ZM19.5 5C20.0523 5 20.5 4.55229 20.5 4C20.5 3.44772 20.0523 3 19.5 3V5ZM9.5 3C8.94772 3 8.5 3.44772 8.5 4C8.5 4.55228 8.94772 5 9.5 5V3ZM14.5 21C15.0523 21 15.5 20.5523 15.5 20C15.5 19.4477 15.0523 19 14.5 19V21ZM4.5 19C3.94772 19 3.5 19.4477 3.5 20C3.5 20.5523 3.94772 21 4.5 21V19ZM12.3137 3.64888L6.31367 19.6489L8.18633 20.3511L14.1863 4.35112L12.3137 3.64888ZM15.8137 3.64888L9.81367 19.6489L11.6863 20.3511L17.6863 4.35112L15.8137 3.64888ZM19.5 3L9.5 3V5L19.5 5V3ZM14.5 19H4.5V21H14.5V19Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Button>
                            </div>
                            <div className="flex items-center gap-4">
                              <Button primaryColor>Cancel</Button>
                              <Button
                                loading={storyIsLoading && !_.isEmpty(replies)}
                                type="Submit"
                              >
                                Respond
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                      {/* Slide Over All Responses Post */}
                      <ListObserver
                        onEnd={() => setReplyLimit((prev) => prev + 10)}
                      >
                        <h2 className="text-slate-800 pb-6 text-lg font-semibold tracking-sm border-b border-gray-200">
                          All Responses ({replyCount})
                        </h2>
                        <ul className="divide-y divide-gray-200">
                          {replies?.map((reply, index) => (
                            <li key={reply._id} className="py-6 space-y-4">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  className="w-10 h-10 rounded-full object-cover"
                                  src={reply.userProfilePicture}
                                  alt={reply.name}
                                />
                                <div className="flex flex-col">
                                  <span className="text-slate-700 text-base font-medium tracking-sm">
                                    {reply.name}
                                  </span>
                                  <span className="text-slate-500 text-sm tracking-sm">
                                    {DateTime.fromISO(
                                      reply.createdAt
                                    ).toRelative()}
                                  </span>
                                </div>
                              </div>
                              <p
                                className="text-slate-700 text-sm tracking-sm"
                                dangerouslySetInnerHTML={{
                                  __html: reply.content,
                                }}
                              />

                              <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                  <Button className="group flex items-center gap-2 text-slate-400 text-sm tracking-sm">
                                    <HeartIcon className="w-6" />
                                    {reply.likeCount}
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleShowComments(reply, index)
                                    }
                                    className="group flex items-center gap-2 text-slate-400 text-sm tracking-sm"
                                  >
                                    <ChatIcon className="w-6" />
                                    {reply.commentCount}
                                  </Button>
                                </div>
                                <Button
                                  onClick={() => {
                                    setCommentText('');
                                    setCommentBoxes((prev) => {
                                      const temp = [...prev];
                                      temp[index] = !temp[index];
                                      return temp;
                                    });
                                  }}
                                >
                                  {commentBoxes[index] ? 'Hide' : 'Reply'}
                                </Button>
                              </div>

                              {showReplies[index] &&
                                reply.comments &&
                                reply.comments.map((comment) => (
                                  <div
                                    key={comment._id}
                                    className="flex flex-col ml-4 border-l-4 pl-3"
                                  >
                                    <div className="flex items-center ">
                                      <img
                                        src={comment.userProfilePicture}
                                        alt="profile"
                                        className="w-10 h-10 rounded-full"
                                      />
                                      <div className="flex flex-col ml-2">
                                        <div className="flex items-center">
                                          <span className="text-slate-700 text-base font-medium tracking-sm">
                                            {comment.name}
                                          </span>
                                        </div>
                                        <span className="text-slate-500 text-sm tracking-sm">
                                          {DateTime.fromISO(
                                            comment.createdAt
                                          ).toRelative()}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-slate-700 text-sm tracking-sm mt-5">
                                      {comment.content}
                                    </p>
                                  </div>
                                ))}
                              {commentBoxes[index] && (
                                <form
                                  onSubmit={(e) =>
                                    handleComment(e, reply, index)
                                  }
                                  className="flex flex-col items-end"
                                >
                                  <textarea
                                    className="w-[405px] h-32 px-4 py-2 text-sm leading-tight border rounded-lg border-gray-300 focus:outline-none focus:border-gray-500"
                                    placeholder="Write a comment..."
                                    onChange={(event) =>
                                      setCommentText((state) => {
                                        const temp = [...state];
                                        temp[index] = event.target.value;
                                        return temp;
                                      })
                                    }
                                    value={commentText[index]}
                                  />

                                  <Button type="submit" extraClasses="mt-5">
                                    Comment
                                  </Button>
                                </form>
                              )}
                            </li>
                          ))}
                        </ul>
                      </ListObserver>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
