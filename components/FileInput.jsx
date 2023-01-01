/* eslint-disable no-nested-ternary */
import _ from 'lodash';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';

export default function FileInput({
  link,
  onChange,
  onDelete,
  label,
  subLabel,
  loading,
  error,
}) {
  return (
    <div className="grid md:grid-cols-2 items-center gap-8">
      <div>
        <label
          htmlFor="description"
          className="block text-slate-700 mb-3 text-lg"
        >
          {label}
        </label>
        <p
          className="text-slate-500 text-sm"
          dangerouslySetInnerHTML={{ __html: subLabel }}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <ClipLoader color="#9333ea" size={30} />
          </div>
        ) : _.isNil(link) ? (
          <div className="w-16 h-16 rounded-full object-contain border border-purple-700 " />
        ) : (
          <Image
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-contain"
            src={link}
            alt=""
          />
        )}
        <div className="space-x-4">
          <button
            type="button"
            className="text-slate-600 text-sm font-medium tracking-sm"
            disabled={_.isNil(link)}
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="text-purple-700 text-sm font-medium tracking-sm"
            onClick={onChange}
          >
            Change
          </button>
        </div>
      </div>
      {error && (
        <span className="inline-block text-sm text-red-600">{error}</span>
      )}
    </div>
  );
}
