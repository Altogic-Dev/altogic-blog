import { subscribeConnectionActions } from '@/redux/subscribeConnection/subscribeConnectionSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function AboutSubscribeCard({ profileId, name, mailAddress }) {
  const isLoadingSubscribe = useSelector(
    (state) => state.subscribeConnection.isLoading
  );
  const dispatch = useDispatch();

  const subscribe = () => {
    dispatch(subscribeConnectionActions.subscribeRequest(profileId));
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 p-6 sm:p-8 rounded-2xl bg-purple-700">
      <div className="flex flex-col gap-4">
        <h2 className="text-white text-2xl md:text-3xl font-medium tracking-md">
          Get an email whenever <br /> <span className="font-bold">{name}</span>{' '}
          publishes.
        </h2>
        <span className="text-purple-200 text-base md:text-lg tracking-sm">
          Emails will be sent to
          <br />
          <a
            href={`mailto:${mailAddress}`}
            className="text-purple-50 hover:underline hover:underline-offset-2"
          >
            {mailAddress}
          </a>
        </span>
      </div>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 py-2.5 md:py-[18px] px-7 text-lg font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        disabled={isLoadingSubscribe}
        onClick={subscribe}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g clipPath="url(#clip0_736_24616)">
            <path
              d="M11.5293 3.33333H5.66675C4.26662 3.33333 3.56655 3.33333 3.03177 3.60581C2.56137 3.8455 2.17892 4.22795 1.93923 4.69835C1.66675 5.23313 1.66675 5.9332 1.66675 7.33333V12.6667C1.66675 14.0668 1.66675 14.7669 1.93923 15.3016C2.17892 15.772 2.56137 16.1545 3.03177 16.3942C3.56655 16.6667 4.26662 16.6667 5.66675 16.6667H14.3334C15.7335 16.6667 16.4336 16.6667 16.9684 16.3942C17.4388 16.1545 17.8212 15.772 18.0609 15.3016C18.3334 14.7669 18.3334 14.0668 18.3334 12.6667V8.33333M1.66675 5.83333L8.47085 10.5962C9.02182 10.9819 9.29731 11.1747 9.59697 11.2494C9.86166 11.3154 10.1385 11.3154 10.4032 11.2494C10.7029 11.1747 10.9783 10.9819 11.5293 10.5962L14.3334 8.33333"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.6667 5.83333C15.6667 6.38561 16.1145 6.83333 16.6667 6.83333C17.219 6.83333 17.6667 6.38561 17.6667 5.83333H15.6667ZM17.6667 0.833328C17.6667 0.281043 17.219 -0.166672 16.6667 -0.166672C16.1145 -0.166672 15.6667 0.281043 15.6667 0.833328H17.6667ZM14.1667 2.33333C13.6145 2.33333 13.1667 2.78104 13.1667 3.33333C13.1667 3.88561 13.6145 4.33333 14.1667 4.33333V2.33333ZM19.1667 4.33333C19.719 4.33333 20.1667 3.88561 20.1667 3.33333C20.1667 2.78104 19.719 2.33333 19.1667 2.33333V4.33333ZM17.6667 5.83333V0.833328H15.6667V5.83333H17.6667ZM14.1667 4.33333H19.1667V2.33333H14.1667V4.33333Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_736_24616">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Subscribe
      </button>
    </div>
  );
}
