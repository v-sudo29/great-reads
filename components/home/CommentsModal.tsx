import PostInComments from './PostInComments'
import NestedCommentsSection from './NestedCommentsSection'
import { IPost } from '@customTypes/postType'

interface CommentsModalProps {
  post: IPost
  index: number
  handleCloseComments: (index: number) => void
}

const CommentsModal = ({
  post,
  index,
  handleCloseComments,
}: CommentsModalProps) => {
  return (
    <div className="fixed flex justify-center top-0 left-0 w-full h-full overflow-y-auto z-50">
      {/* Overlay */}
      <div
        className="fixed top-0 left-0 w-screen h-full bg-black opacity-20"
        onClick={() => handleCloseComments(index)}
        onScroll={() => console.log('scrolling!')}
      ></div>

      {/* Modal */}
      <div className="relative flex flex-col bg-white max-w-[820px] w-full h-full max-h-[1400px] py-8 px-10 mt-[116px] mb-[100px] mx-[40px] rounded-[8px] z-50">
        {/* Post section */}
        <div className="flex w-full justify-between">
          <PostInComments
            post={post}
            handleCloseComments={handleCloseComments}
            index={index}
          />
        </div>

        {/* Comments Section */}
        <NestedCommentsSection post={post} />
      </div>
    </div>
  )
}

export default CommentsModal
