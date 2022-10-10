import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';
import Button from './basic/button';

function ShareButtons() {
  const router = useRouter();

  const [basePath, setBasePath] = useState();
  const shareUrl = basePath + router.asPath;

  useEffect(() => {
    setBasePath(window.location.origin);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <ul className="flex items-center">
      <li>
        <TwitterShareButton url={`${shareUrl}?twitter=true`}>
          <a className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.8513 7.47974C20.8592 7.67764 20.8618 7.87546 20.8618 8.07336C20.8618 14.0734 16.5286 21 8.60453 21C6.1704 21 3.90702 20.2444 2 18.958C2.3371 18.994 2.67946 19.021 3.02706 19.021C5.04528 19.021 6.90415 18.2922 8.37863 17.0689C6.4935 17.0419 4.90169 15.7195 4.3527 13.9204C4.61625 13.9744 4.88767 14.0015 5.16523 14.0015C5.55661 14.0015 5.93661 13.9476 6.30085 13.8396C4.32817 13.4258 2.84232 11.5908 2.84232 9.38689C2.84232 9.3599 2.84232 9.35086 2.84232 9.33287C3.4237 9.6657 4.08914 9.87249 4.79573 9.89948C3.63821 9.08089 2.87732 7.68662 2.87732 6.11241C2.87732 5.28482 3.08921 4.50218 3.46221 3.82752C5.58637 6.58014 8.76214 8.38826 12.3424 8.57716C12.2689 8.24433 12.2312 7.89359 12.2312 7.54277C12.2312 5.03303 14.1601 3 16.5399 3C17.7789 3 18.8979 3.5488 19.6833 4.43036C20.6665 4.23246 21.5877 3.85468 22.4212 3.33294C22.0981 4.39441 21.416 5.28478 20.5247 5.8425C21.3968 5.73455 22.2286 5.49186 23 5.13204C22.4212 6.04058 21.6927 6.84106 20.8513 7.47974Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </TwitterShareButton>
      </li>
      <li>
        <FacebookShareButton url={`${shareUrl}?facebook=true`}>
          <a className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.888672 12.0118C0.888672 17.5059 4.90124 22.074 10.1484 23L10.2104 22.9505C10.1897 22.9465 10.1691 22.9424 10.1485 22.9383V15.0984H7.37054V12.0118H10.1485V9.5425C10.1485 6.76457 11.9387 5.22127 14.4697 5.22127C15.2722 5.22127 16.1365 5.34474 16.939 5.4682V8.30786H15.5191C14.161 8.30786 13.8524 8.98691 13.8524 9.85116V12.0118H16.8155L16.3217 15.0984H13.8524V22.9383C13.8317 22.9424 13.8111 22.9465 13.7904 22.9505L13.8524 23C19.0996 22.074 23.1121 17.5059 23.1121 12.0118C23.1121 5.9003 18.1119 0.900024 12.0004 0.900024C5.88895 0.900024 0.888672 5.9003 0.888672 12.0118Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </FacebookShareButton>
      </li>
      <li>
        <LinkedinShareButton url={`${shareUrl}?linkedin=true`}>
          <a className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.41961 2C2.63558 2 2 2.63558 2 3.41961V20.5804C2 21.3644 2.63558 22 3.41961 22H20.5804C21.3644 22 22 21.3644 22 20.5804V3.41961C22 2.63558 21.3644 2 20.5804 2H3.41961ZM6.48908 8.21103C7.44729 8.21103 8.22408 7.43424 8.22408 6.47603C8.22408 5.51781 7.44729 4.74102 6.48908 4.74102C5.53087 4.74102 4.75409 5.51781 4.75409 6.47603C4.75409 7.43424 5.53087 8.21103 6.48908 8.21103ZM9.81304 9.49324H12.6885V10.8105C12.6885 10.8105 13.4688 9.24991 15.5918 9.24991C17.4857 9.24991 19.0546 10.1829 19.0546 13.0266V19.0233H16.0748V13.7533C16.0748 12.0757 15.1792 11.8912 14.4967 11.8912C13.0804 11.8912 12.8379 13.1129 12.8379 13.9721V19.0233H9.81304V9.49324ZM8.00152 9.49325H4.97664V19.0233H8.00152V9.49325Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </LinkedinShareButton>
      </li>
      <li>
        <Button
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center p-3 rounded-lg transition ease-in-out duration-200 hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.801 12.401C10.4702 11.9588 9.84347 11.8685 9.40122 12.1993C8.95897 12.5301 8.86863 13.1568 9.19943 13.599L10.801 12.401ZM17.5402 13.54L16.8331 12.8329L16.833 12.833L17.5402 13.54ZM20.5402 10.54L21.2473 11.2471C21.2514 11.243 21.2555 11.2389 21.2595 11.2347L20.5402 10.54ZM13.4702 3.47003L12.7755 2.75074C12.772 2.75409 12.7686 2.75746 12.7652 2.76086L13.4702 3.47003ZM11.0452 4.47086C10.6535 4.86024 10.6516 5.49341 11.041 5.88507C11.4304 6.27673 12.0636 6.27858 12.4552 5.88919L11.0452 4.47086ZM13.1994 11.599C13.5302 12.0413 14.1569 12.1316 14.5992 11.8008C15.0414 11.47 15.1318 10.8433 14.801 10.401L13.1994 11.599ZM6.4602 10.46L7.16731 11.1671L7.16743 11.167L6.4602 10.46ZM3.4602 13.46L2.75309 12.7529C2.749 12.757 2.74494 12.7611 2.74091 12.7653L3.4602 13.46ZM10.5302 20.53L11.2249 21.2493C11.2291 21.2453 11.2332 21.2412 11.2373 21.2371L10.5302 20.53ZM12.9473 19.5271C13.3378 19.1366 13.3378 18.5034 12.9473 18.1129C12.5568 17.7224 11.9236 17.7224 11.5331 18.1129L12.9473 19.5271ZM9.19943 13.599C9.71478 14.288 10.3723 14.858 11.1273 15.2705L12.0862 13.5154C11.5829 13.2404 11.1445 12.8604 10.801 12.401L9.19943 13.599ZM11.1273 15.2705C11.8823 15.683 12.7172 15.9283 13.5754 15.9898L13.7183 13.9949C13.1462 13.9539 12.5896 13.7904 12.0862 13.5154L11.1273 15.2705ZM13.5754 15.9898C14.4336 16.0513 15.2949 15.9274 16.101 15.6267L15.402 13.7529C14.8646 13.9533 14.2904 14.0359 13.7183 13.9949L13.5754 15.9898ZM16.101 15.6267C16.9072 15.326 17.6392 14.8555 18.2474 14.247L16.833 12.833C16.4275 13.2387 15.9394 13.5524 15.402 13.7529L16.101 15.6267ZM18.2473 14.2471L21.2473 11.2471L19.8331 9.83292L16.8331 12.8329L18.2473 14.2471ZM21.2595 11.2347C22.3524 10.1031 22.9572 8.58751 22.9435 7.01433L20.9436 7.03171C20.9527 8.0805 20.5495 9.09091 19.8209 9.84531L21.2595 11.2347ZM22.9435 7.01433C22.9299 5.44115 22.2988 3.93628 21.1864 2.82383L19.7722 4.23804C20.5138 4.97967 20.9345 5.98292 20.9436 7.03171L22.9435 7.01433ZM21.1864 2.82383C20.074 1.71138 18.5691 1.08036 16.9959 1.06669L16.9785 3.06662C18.0273 3.07573 19.0306 3.49641 19.7722 4.23804L21.1864 2.82383ZM16.9959 1.06669C15.4227 1.05302 13.9071 1.65779 12.7755 2.75074L14.1649 4.18931C14.9193 3.46068 15.9297 3.0575 16.9785 3.06662L16.9959 1.06669ZM12.7652 2.76086L11.0452 4.47086L12.4552 5.88919L14.1752 4.17919L12.7652 2.76086ZM14.801 10.401C14.2856 9.71209 13.6281 9.14203 12.8731 8.72952L11.9142 10.4847C12.4175 10.7597 12.8559 11.1397 13.1994 11.599L14.801 10.401ZM12.8731 8.72952C12.1181 8.31701 11.2832 8.07171 10.425 8.01025L10.2821 10.0051C10.8542 10.0461 11.4108 10.2096 11.9142 10.4847L12.8731 8.72952ZM10.425 8.01025C9.56681 7.94879 8.70546 8.07261 7.89935 8.37331L8.59836 10.2472C9.13577 10.0467 9.71 9.96416 10.2821 10.0051L10.425 8.01025ZM7.89935 8.37331C7.09324 8.67401 6.36123 9.14456 5.75296 9.75305L7.16743 11.167C7.57294 10.7613 8.06095 10.4476 8.59836 10.2472L7.89935 8.37331ZM5.75309 9.75292L2.75309 12.7529L4.16731 14.1671L7.16731 11.1671L5.75309 9.75292ZM2.74091 12.7653C1.64796 13.8969 1.0432 15.4125 1.05687 16.9857L3.05679 16.9683C3.04768 15.9196 3.45086 14.9091 4.17949 14.1547L2.74091 12.7653ZM1.05687 16.9857C1.07054 18.5589 1.70155 20.0638 2.814 21.1762L4.22821 19.762C3.48658 19.0204 3.06591 18.0171 3.05679 16.9683L1.05687 16.9857ZM2.814 21.1762C3.92645 22.2887 5.43132 22.9197 7.0045 22.9334L7.02188 20.9334C5.9731 20.9243 4.96985 20.5036 4.22821 19.762L2.814 21.1762ZM7.0045 22.9334C8.57768 22.947 10.0933 22.3423 11.2249 21.2493L9.83549 19.8107C9.08108 20.5394 8.07067 20.9425 7.02188 20.9334L7.0045 22.9334ZM11.2373 21.2371L12.9473 19.5271L11.5331 18.1129L9.82309 19.8229L11.2373 21.2371Z"
              fill="currentColor"
            />
          </svg>
        </Button>
      </li>
    </ul>
  );
}

export default ShareButtons;
