import { useSelector } from 'react-redux';
import SocialIcons from '../publication/SocialIcons';

export default function PublicationProfile() {
  const { publication } = useSelector((state) => state.publication);

  return (
    <div className="space-y-6">
      <img className="w-[200px]" src={publication?.logo} alt="HiThemes" />
      <p className="text-slate-500 text-sm tracking-sm">
        Faucibus consequat, massa risus, dignissim interdum feugiat sollicitudin
        tortor. Volutpat, elementum diam id nunc pellentesque suspendisse
        sagittis. Pharetra, pulvinar augue nunc ut.
      </p>
      <button
        type="button"
        className="inline-flex items-center gap-2 mt-3 text-sm tracking-sm text-purple-700"
      >
        More information
        <svg
          className="w-5 h-5 text-purple-700"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16676M15.8333 10.0001L9.99996 15.8334"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div>
        <h2 className="text-slate-600 mb-2 text-base tracking-sm">Followers</h2>
        <span className="text-slate-500 text-sm tracking-sm">
          {publication?.followerCount}
        </span>
      </div>
      <div>
        <h2 className="text-slate-600 mb-2 text-base tracking-sm">Elsewhere</h2>
        <SocialIcons />
      </div>
    </div>
  );
}
