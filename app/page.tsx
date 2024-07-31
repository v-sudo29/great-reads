'use client'
import Image from 'next/image'
import { ButtonLink } from '@components/common/Button'
import { useSession } from 'next-auth/react'
import { Post } from '@components/home/Post'
import PostInComments from '@components/home/PostInComments'
import RecommendationCard from '@components/home/RecommendationCard'
import { useEffect, useState } from 'react'
import { IPost } from '@customTypes/postType'
import ExitIcon from '@components/common/icons/ExitIcon'
import React from 'react'

export default function Home() {
  const { data: session } = useSession()
  const [commentsVisibilities, setCommentsVisibilities] = useState<boolean[]>(
    []
  )
  const [recentPosts, setRecentPosts] = useState<IPost[] | []>([])

  const handleOpenComments = (index: number) => {
    if (commentsVisibilities) {
      const newCommentsVisibilities = [...commentsVisibilities]
      newCommentsVisibilities[index] = true
      setCommentsVisibilities(newCommentsVisibilities)
    }
  }

  const handleCloseComments = (index: number) => {
    if (commentsVisibilities) {
      const newCommentsVisibilities = [...commentsVisibilities]
      newCommentsVisibilities[index] = false
      setCommentsVisibilities(newCommentsVisibilities)
    }
  }

  // Fetch all posts on first render
  useEffect(() => {
    if (session) {
      const fetchRecentPosts = async () => {
        try {
          const response = await fetch(`/api/posts`)
          const data = await response.json()
          setRecentPosts(data.data)
          setCommentsVisibilities(data.data.map(() => false))
        } catch (err) {
          console.log(err)
        }
      }
      fetchRecentPosts()
    }
  }, [session])

  if (session === undefined) return <></>
  return (
    <>
      {/* Authenticated UI */}
      {session && (
        <section className="px-3 w-full xl:py-10 xl:px-12 xl:flex">
          <div className="xl:pr-[104px] xl:w-[820px]">
            <h1 className="hidden font-lora font-bold text-[24px] text-primary leading-[60px] mb-4 xl:block">
              Latest Updates
            </h1>
            <div className="xl:flex xl:flex-col xl:gap-8 xl:w-full">
              {recentPosts.length > 0 &&
                recentPosts.map((post, i) => {
                  if (i === 0) {
                    return (
                      <React.Fragment key={`${i}-${post._id}-latest-post`}>
                        {/* POST */}
                        <Post
                          post={post}
                          handleOpenComments={handleOpenComments}
                          index={i}
                        />

                        {/* COMMENTS MODAL */}
                        {commentsVisibilities && commentsVisibilities[i] && (
                          <div className="fixed flex justify-center top-0 left-0 w-full h-full">
                            {/* Overlay */}
                            <div
                              className="fixed w-full h-full bg-black opacity-20"
                              onClick={() => handleCloseComments(i)}
                            ></div>

                            {/* Modal */}
                            <div className="relative flex flex-col bg-white max-w-[820px] w-full max-h-[1431px] py-8 px-10 mt-[116px] mx-[40px] rounded-[8px]">
                              <div className="flex w-full justify-between">
                                <PostInComments
                                  post={post}
                                  handleCloseComments={handleCloseComments}
                                  index={i}
                                />
                              </div>

                              {/* Input */}
                              <div>
                                <input
                                  className="flex w-full border border-black p-1"
                                  type="text"
                                  placeholder="Type your comment..."
                                  // onKeyDown={(e) => handleEnterKeyPressedCreateComment(e)}
                                  data-post-id={post._id}
                                />
                              </div>

                              {/* Past Comments */}
                              <div>
                                {post.comments.length > 0 ? (
                                  post.comments.map(
                                    (comment: any, i: number) => {
                                      return (
                                        <div
                                          key={`${post._id}-${i}-comment`}
                                          className="border mt-4 px-4 py-3"
                                          data-user-id={comment.userId}
                                        >
                                          <p className="font-bold">
                                            {comment.firstName}{' '}
                                            {comment.lastName}
                                          </p>
                                          <p>{comment.userComment}</p>
                                          {comment.userId ===
                                            session.user.id && (
                                            <button
                                              className="bg-red-400 text-white font-montserrat font-semibold rounded-[4px] px-5 py-1 mt-5"
                                              // onClick={(e) => handleDeleteComment(e)}
                                              data-post-id={post._id}
                                              data-comment-id={comment._id}
                                            >
                                              Delete
                                            </button>
                                          )}
                                        </div>
                                      )
                                    }
                                  )
                                ) : (
                                  <>No comments</>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    )
                  }
                })}
            </div>
          </div>
          {/* FUTURE FEATURE */}
          {/* <div className="hidden border-l border-l-[#DFE7EB] min-w-[390px] pl-10 xl:block">
            <h1 className="font-lora font-bold text-[24px] text-primary leading-[60px]">
              Recommendations For You
            </h1>
            <div className="flex flex-col gap-8">
              <RecommendationCard />
              <RecommendationCard />
              <RecommendationCard />
            </div>
          </div> */}
        </section>
      )}

      {/* Unauthenticated UI */}
      {!session && (
        <section className="flex flex-col items-center py-[60px] px-[12px] w-full h-full xl:py-[186px]">
          <div className="w-max">
            <Image
              src="/great-reads-hero-image.png"
              className="xl:w-[532px] xl:h-[390px]"
              width="304"
              height="222"
              alt=""
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="font-lora text-xl text-primary font-semibold mt-10 xl:text-[32px]">
              Discover, Share, Connect.
            </h1>
            <p className="font-montserrat text-primary text-[14px] font-medium tracking-[-0.5px] mb-8 mt-4 xl:text-xl">
              Sign up to unlock a world of literary adventures!
            </p>
          </div>
          <div className="flex gap-2 xl:gap-4 xl:justify-center xl:mt-12">
            <ButtonLink href="/sign-up" type="secondary" bordersRounded={true}>
              Create Account
            </ButtonLink>
            <ButtonLink href="/sign-in" type="primary" bordersRounded={true}>
              Sign In
            </ButtonLink>
          </div>
        </section>
      )}
    </>
  )
}
