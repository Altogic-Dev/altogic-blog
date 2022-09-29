import Button from "./button";

export default function FollowButton({onClick,isFollowing}) {
  return (
    <Button extraClasses="gap-2 px-[14px] " onClick={onClick}>
      <svg
        className="w-5 h-5"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10.0001 13.75C10.4603 13.75 10.8334 13.3769 10.8334 12.9167C10.8334 12.4564 10.4603 12.0833 10.0001 12.0833V13.75ZM4.03246 13.0602L4.27437 13.8576L4.03246 13.0602ZM0.833415 17.5C0.833415 17.9602 1.20651 18.3333 1.66675 18.3333C2.12699 18.3333 2.50008 17.9602 2.50008 17.5H0.833415ZM1.81028 15.2824L2.60773 15.5243L1.81028 15.2824ZM15.0001 17.5C15.0001 17.9602 15.3732 18.3333 15.8334 18.3333C16.2937 18.3333 16.6667 17.9602 16.6667 17.5H15.0001ZM16.6667 12.5C16.6667 12.0398 16.2937 11.6667 15.8334 11.6667C15.3732 11.6667 15.0001 12.0398 15.0001 12.5H16.6667ZM13.3334 14.1667C12.8732 14.1667 12.5001 14.5398 12.5001 15C12.5001 15.4602 12.8732 15.8333 13.3334 15.8333V14.1667ZM18.3334 15.8333C18.7937 15.8333 19.1667 15.4602 19.1667 15C19.1667 14.5398 18.7937 14.1667 18.3334 14.1667V15.8333ZM6.25009 13.75H10.0001V12.0833H6.25009V13.75ZM6.25009 12.0833C5.14774 12.0833 4.41183 12.0743 3.79056 12.2627L4.27437 13.8576C4.59942 13.759 5.02648 13.75 6.25009 13.75V12.0833ZM2.50008 17.5C2.50008 16.2764 2.50913 15.8493 2.60773 15.5243L1.01283 15.0405C0.824369 15.6617 0.833415 16.3977 0.833415 17.5H2.50008ZM3.79056 12.2627C2.45889 12.6667 1.41679 13.7088 1.01283 15.0405L2.60773 15.5243C2.85011 14.7253 3.47537 14.1 4.27437 13.8576L3.79056 12.2627ZM11.2501 6.25C11.2501 7.86083 9.94425 9.16667 8.33342 9.16667V10.8333C10.8647 10.8333 12.9167 8.78131 12.9167 6.25H11.2501ZM8.33342 9.16667C6.72258 9.16667 5.41675 7.86083 5.41675 6.25H3.75008C3.75008 8.78131 5.80211 10.8333 8.33342 10.8333V9.16667ZM5.41675 6.25C5.41675 4.63917 6.72258 3.33333 8.33342 3.33333V1.66667C5.80211 1.66667 3.75008 3.71869 3.75008 6.25H5.41675ZM8.33342 3.33333C9.94425 3.33333 11.2501 4.63917 11.2501 6.25H12.9167C12.9167 3.71869 10.8647 1.66667 8.33342 1.66667V3.33333ZM16.6667 17.5V12.5H15.0001V17.5H16.6667ZM13.3334 15.8333H18.3334V14.1667H13.3334V15.8333Z"
          fill="currentColor"
        />
      </svg>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
}