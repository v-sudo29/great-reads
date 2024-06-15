import { Button } from "@components/common/Button"
import Image from "next/image"
import GreenDotIcon from "@components/common/icons/GreenDotIcon"
import HeartIcon from "@components/common/icons/HeartIcon"
import CommentsIcon from "@components/common/icons/CommentsIcon"
import ShareIcon from "@components/common/icons/ShareIcon"
import FilledStar from "@components/common/icons/FilledStar"
import UnfilledStar from "@components/common/icons/UnfilledStar"

export const Post = () => {
  return (
    <div className='grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9] xl:border xl:border-[#DFE7EB] xl:rounded-[8px] xl:py-8 xl:px-10 xl:flex xl:flex-col xl:bg-white'>
          
      {/* Profile Icon */}
      <div className='xl:flex xl:items-center xl:gap-3 xl:rounded-[4px]'>
        <Image
          src='/tempPostIcon1.png'
          alt=''
          width='40'
          height='40'
        />
        <p className='font-lora font-bold text-primary text-xl'>
          Sasuke Uchiha
        </p>
      </div>

      {/* Post Content */}
      <div className='w-full'>

        {/* User's name + timestamp */}
        <div className='flex items-center gap-2 font-lora font-bold text-primary xl:hidden'>
          <p>Sasuke Uchiha</p>
          <GreenDotIcon/>
          <span className='font-semibold'>
            2 mins
          </span>
        </div>

        {/* Post caption */}
        <div className='mt-[6px]'>
          <p className='font-montserrat font-medium text-primary text-[14px] leading-[20px] xl:text-[18px]'>
            This book delves into the darker side of human nature, the shadows we carry. It&apos;s a reflection of the path I&apos;ve walked...
            <span className='text-[#8D8D8D] pl-2 cursor-pointer xl:hidden'>
              more
            </span>
          </p>
          <p className='font-montserrat font-semibold text-[13px] text-[#878787] leading-[30px] mt-2'>
            2 minutes ago
          </p>
        </div>

        {/* Post image */}
        <div className='w-full mt-4 xl:mt-8'>
          <Image
            className='w-full'
            src='/tempPostImage1.png'
            alt='Temporary alt description here'
            width='314'
            height='176'
            objectFit='cover'
          />
        </div>

        {/* Buttons Container */}
        <div className='flex mt-3 gap-2 xl:mt-8 xl:gap-4'>
          <Button
            type='tertiary'
            bordersRounded={true}
            icon={<HeartIcon/>}
            clickHandler={()=>{}}
          >
            12k
          </Button>
          <Button
            type='tertiary'
            bordersRounded={true}
            icon={<CommentsIcon/>}
            clickHandler={()=>{}}
          >
            562
          </Button>
          <Button
            type='tertiary'
            bordersRounded={true}
            icon={<ShareIcon/>}
            clickHandler={()=>{}}
            className='ml-auto'
          >
            Share
          </Button>
        </div>

      </div>
    </div>
  )
}

export const TempUpdatePost = () => {
  return (
    <div className='grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9]'>
      
      {/* Profile Icon */}
      <div>
        <Image
          src='/tempPostIcon2.png'
          alt=''
          width='40'
          height='40'
        />
      </div>  

      {/* Post Content */}
      <div className='w-full'>

        {/* User's name + timestamp */}
        <div className='flex items-center gap-1 font-lora font-bold text-primary flex-wrap'>
          <p>Naruto Uzumaki</p>
          <span className='font-medium'>
            just completed:
          </span>
        </div>

        {/* Book Image + Book Details */}
        <div className='flex gap-4 mt-4'>

          {/* Book */}
          <div className='w-[75px] h-[116px]'>
            <Image
              src='/tempUpdateImage1.png'
              alt=''
              width='75'
              height='116'
            />
          </div>

          {/* Book Details */}
          <div className='font-montserrat text-primary leading-[20px]'>
            <p className='font-bold text-[15px] leading-[20px] mb-1'>
              Seals and Symbols: A Guide to Fuinjutsu
            </p>
            <p className='font-medium text-[14px] leading-[24px]'>
              by Minato Uzumaki
            </p>
            <div className='flex gap-1 mt-[6px]'>
              <FilledStar/>
              <FilledStar/>
              <FilledStar/>
              <FilledStar/>
              <UnfilledStar/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export const TempUpdatePost2 = () => {
  return (
    <div className='grid grid-cols-[40px_1fr] gap-3 w-full py-6 border-b border-b-[#D9D9D9]'>
      
      {/* Profile Icon */}
      <div>
        <Image
          src='/tempPostIcon3.png'
          alt=''
          width='40'
          height='40'
        />
      </div>  

      {/* Post Content */}
      <div className='w-full'>

        {/* User's name + timestamp */}
        <div className='flex items-center gap-1 font-lora font-bold text-primary flex-wrap'>
          <p>Sakura Haruno</p>
          <span className='font-medium'>
            wants to read:
          </span>
        </div>

        {/* Book Image + Book Details */}
        <div className='flex gap-4 mt-4'>

          {/* Book */}
          <div className='w-[75px] h-[116px]'>
            <Image
              src='/tempUpdateImage2.png'
              alt=''
              width='75'
              height='116'
            />
          </div>

          {/* Book Details */}
          <div className='font-montserrat text-primary leading-[20px]'>
            <p className='font-bold text-[15px] leading-[20px] mb-1'>
              The Uchiha Clan: A History of Power and Tragedy
            </p>
            <p className='font-medium text-[14px] leading-[24px]'>
              by Itachi Uchiha
            </p>
            <div className='flex gap-1 mt-[6px]'>
              <FilledStar/>
              <FilledStar/>
              <FilledStar/>
              <FilledStar/>
              <UnfilledStar/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}