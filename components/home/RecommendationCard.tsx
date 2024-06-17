import Image from 'next/image'
import FilledStar from '@components/common/icons/FilledStar'
import UnfilledStar from '@components/common/icons/UnfilledStar'

const truncateText = (string: string, maxCharacters = 32) => {
  return string.substring(0, 35) + '...'
}

const RecommendationCard = () => {
  const truncatedTitle = truncateText(
    'Chakra Mastery: Unveiling Hidden Potential'
  )

  return (
    <div className="flex gap-6">
      <Image
        src="/tempUpdateImage1.png"
        alt=""
        width="90"
        height="40"
        style={{ objectFit: 'cover' }}
      />
      <div className="flex flex-col">
        <p className="font-montserrat font-bold text-primary text-xl leading-[28px]">
          {truncatedTitle}
        </p>
        <p className="font-montserrat font-semibold text-[#707070] leading-[24px] mt-1">
          by Jiraiya
        </p>
        <div className="mt-auto mb-1">
          <div className="flex gap-1">
            <FilledStar />
            <FilledStar />
            <FilledStar />
            <FilledStar />
            <UnfilledStar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationCard
