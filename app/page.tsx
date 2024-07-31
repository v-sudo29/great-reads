'use client'
import Image from 'next/image'
import { ButtonLink } from '@components/common/Button'
import { useSession } from 'next-auth/react'
import { Post } from '@components/home/Post'
import PostInComments from '@components/home/PostInComments'
import NestedCommentsSection from '@components/home/NestedCommentsSection'
import RecommendationCard from '@components/home/RecommendationCard'
import { useEffect, useState } from 'react'
import { IPost } from '@customTypes/postType'
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

  // Make body unscrollable if a comments modal is open
  useEffect(() => {
    const isCommentsOpen = commentsVisibilities.some((el) => el === true)
    if (isCommentsOpen) {
      const body = document.querySelector('body')
      if (body) body.style.overflow = 'hidden'
    } else {
      const body = document.querySelector('body')
      if (body) body.style.overflow = 'visible'
    }
  }, [commentsVisibilities])

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
                        <div className="fixed flex justify-center top-0 left-0 w-full h-full overflow-y-auto z-50">
                          {/* Overlay */}
                          <div
                            className="fixed top-0 left-0 w-screen h-full bg-black opacity-20"
                            onClick={() => handleCloseComments(i)}
                            onScroll={() => console.log('scrolling!')}
                          ></div>

                          {/* Modal */}
                          <div className="relative flex flex-col bg-white max-w-[820px] w-full h-full max-h-[1400px] py-8 px-10 mt-[116px] mb-[100px] mx-[40px] rounded-[8px] z-50">
                            {/* Post section */}
                            <div className="flex w-full justify-between">
                              <PostInComments
                                post={post}
                                handleCloseComments={handleCloseComments}
                                index={i}
                              />
                            </div>

                            {/* Comments Section */}
                            <NestedCommentsSection post={post} />
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  )
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
