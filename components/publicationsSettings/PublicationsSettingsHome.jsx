import { fileActions } from '@/redux/file/fileSlice';
import { publicationActions } from '@/redux/publication/publicationSlice';
import { RGBAToHexA } from '@/utils/utils';
import { Popover } from '@headlessui/react';
import _ from 'lodash';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AligmentPublicationLayout from '../AligmentPublicationLayout';
import ColorPicker from '../ColorPicker';
import AddFeatureSection from '../publication/AddFeatureSection';

export default function PublicationsSettingsHome({
  doSave,
  setDoSave,
  doClear,
  setDoClear,
  layout,
  setLayout,
  isCentered,
  setIsCentered,
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  selectedTabIndex,
  setSelectedTabIndex,
  isMounted,
  setIsMounted,
  bottomColor,
  setBottomColor,
}) {
  const dispatch = useDispatch();
  const publication = useSelector(
    (state) => state.publication.selectedPublication
  );
  const homeLayout = useSelector((state) => state.publication.homeLayout);
  const uploadedFileLink = useSelector((state) => state.file.fileLink);
  const navigations = useSelector(
    (state) => state.publication.publicationNavigation
  );
  const featurePage = useSelector((state) => state.publication.featurePage);
  const sections = featurePage?.sections;

  const handleSave = () => {
    dispatch(
      publicationActions.updatePublicationHomeLayoutRequest({
        ...homeLayout,
        layout,
        isCentered,
        textColor: RGBAToHexA(textColor),
        backgroundColor: RGBAToHexA(bgColor),
        backgroundImage: _.isNil(uploadedFileLink) ? null : uploadedFileLink,
        bottomColor: RGBAToHexA(bottomColor),
      })
    );
    dispatch(fileActions.updateFileState());
  };

  const fillFields = () => {
    if (homeLayout) {
      setLayout(homeLayout.layout);
      setIsCentered(homeLayout.isCentered);
      setTextColor(homeLayout.textColor);
      setBgColor(homeLayout.backgroundColor);
      setBottomColor(homeLayout.bottomColor);
      if (homeLayout.backgroundImage) {
        dispatch(fileActions.uploadFileSuccess(homeLayout.backgroundImage));
      } else {
        dispatch(fileActions.clearFileLink());
      }
    }
    setIsMounted(true);
  };

  useEffect(() => {
    if (publication?._id) {
      console.log(publication?._id);
      dispatch(
        publicationActions.getPublicationHomeLayoutRequest(publication._id)
      );
      dispatch(
        publicationActions.getPublicationNavigationRequest(publication._id)
      );
    }
  }, [publication?._id]);

  useEffect(() => {
    dispatch(fileActions.clearFileLink());
  }, [bgColor]);

  useEffect(() => {
    if (_.isEmpty(navigations)) {
      dispatch(
        publicationActions.getPublicationNavigationRequest(publication._id)
      );
    } else {
      const tab = navigations[selectedTabIndex];
      if (_.get(tab, 'tabType') === 'feature') {
        dispatch(publicationActions.getFeaturePageRequest(tab._id));
      }
    }
  }, [selectedTabIndex]);

  useEffect(() => {
    if (!isMounted && homeLayout) {
      fillFields();
    }
  }, [homeLayout]);

  useEffect(() => {
    if (doSave === true) {
      handleSave();
      setDoSave(false);
    }
  }, [doSave]);

  useEffect(() => {
    if (doClear === true) {
      fillFields();
      setDoClear(false);
    }
  }, [doClear]);

  const handleUploadPhoto = (name, existingFile) => {
    const fileInput = document.createElement('input');

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      dispatch(
        fileActions.uploadFileRequest({
          file,
          name: `${publication?.name}-${name}`,
          existingFile,
        })
      );
    };
  };

  return (
    <>
      <div className="mt-12">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center pb-6 mb-6 border-b border-gray-200 divide-x divide-gray-200">
            <div className="flex items-center gap-5 px-5">
              <span className="inline-flex items-center text-slate-400 py-1 text-sm tracking-sm">
                Layout
              </span>
              <button
                type="button"
                className={`inline-flex items-center gap-2 py-1 text-sm tracking-sm transition hover:text-purple-700 text-purple-700 ${
                  layout === 'title' ? 'text-purple-700' : 'text-slate-400'
                }`}
                onClick={() => setLayout('title')}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 14H3M20 10H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Title
              </button>
              <button
                type="button"
                className={`inline-flex items-center gap-2 py-1 text-sm tracking-sm transition hover:text-purple-700 text-purple-700 ${
                  layout === 'logo' ? 'text-purple-700' : 'text-slate-400'
                }`}
                onClick={() => setLayout('logo')}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Logo
              </button>
              <button
                type="button"
                className={`inline-flex items-center gap-2 py-1 text-sm tracking-sm transition hover:text-purple-700 text-purple-700 ${
                  layout === 'both' ? 'text-purple-700' : 'text-slate-400'
                }`}
                onClick={() => setLayout('both')}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 9.25H15M21 4H3M21 14.75H15M21 20H3M4.6 16H9.4C9.96005 16 10.2401 16 10.454 15.891C10.6422 15.7951 10.7951 15.6422 10.891 15.454C11 15.2401 11 14.9601 11 14.4V9.6C11 9.03995 11 8.75992 10.891 8.54601C10.7951 8.35785 10.6422 8.20487 10.454 8.10899C10.2401 8 9.96005 8 9.4 8H4.6C4.03995 8 3.75992 8 3.54601 8.10899C3.35785 8.20487 3.20487 8.35785 3.10899 8.54601C3 8.75992 3 9.03995 3 9.6V14.4C3 14.9601 3 15.2401 3.10899 15.454C3.20487 15.6422 3.35785 15.7951 3.54601 15.891C3.75992 16 4.03995 16 4.6 16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Both
              </button>
            </div>
            <div className="flex items-center gap-5 px-5">
              <span className="inline-flex items-center text-slate-400 py-1 text-sm tracking-sm">
                Alignment
              </span>
              <button
                type="button"
                className={`inline-flex items-center gap-2 py-1 text-sm tracking-sm transition hover:text-purple-700 text-purple-700 ${
                  !isCentered ? 'text-purple-700' : 'text-slate-400'
                }`}
                onClick={() => setIsCentered(false)}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 10H3M20 6H3M20 14H3M16 18H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={`inline-flex items-center gap-2 py-1 text-sm tracking-sm transition hover:text-purple-700 text-purple-700 ${
                  isCentered ? 'text-purple-700' : 'text-slate-400'
                }`}
                onClick={() => setIsCentered(true)}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 10H6M21 6H3M21 14H3M18 18H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-5 px-5">
              <span className="inline-flex items-center text-slate-400 py-1 text-sm tracking-sm">
                Color
              </span>
              <Popover>
                <Popover.Button
                  type="button"
                  className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 4C7 3.44772 6.55228 3 6 3C5.44772 3 5 3.44772 5 4H7ZM5 20C5 20.5523 5.44772 21 6 21C6.55228 21 7 20.5523 7 20H5ZM9.5 11C8.94772 11 8.5 11.4477 8.5 12C8.5 12.5523 8.94772 13 9.5 13V11ZM4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5V3ZM4 19C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21V19ZM5 4V20H7V4H5ZM9.5 5H15.5V3H9.5V5ZM15.5 11H9.5V13H15.5V11ZM18.5 8C18.5 9.65685 17.1569 11 15.5 11V13C18.2614 13 20.5 10.7614 20.5 8H18.5ZM15.5 5C17.1569 5 18.5 6.34315 18.5 8H20.5C20.5 5.23858 18.2614 3 15.5 3V5ZM9.5 13H16.5V11H9.5V13ZM16.5 19H9.5V21H16.5V19ZM19.5 16C19.5 17.6569 18.1569 19 16.5 19V21C19.2614 21 21.5 18.7614 21.5 16H19.5ZM16.5 13C18.1569 13 19.5 14.3431 19.5 16H21.5C21.5 13.2386 19.2614 11 16.5 11V13ZM8.5 4V20H10.5V4H8.5ZM9.5 3H4V5H9.5V3ZM9.5 19H4V21H9.5V19Z"
                      fill="currentColor"
                    />
                  </svg>
                  Text
                </Popover.Button>
                <ColorPicker
                  color={textColor}
                  onChangeComplete={({ rgb }) => setTextColor(rgb)}
                />
              </Popover>
              <Popover>
                <Popover.Button
                  type="button"
                  className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 17.5228 6.47715 22 12 22C13.6569 22 15 20.6569 15 19V18.5C15 18.0356 15 17.8034 15.0257 17.6084C15.2029 16.2622 16.2622 15.2029 17.6084 15.0257C17.8034 15 18.0356 15 18.5 15H19C20.6569 15 22 13.6569 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7C15.4477 7 15 7.44772 15 8C15 8.55228 15.4477 9 16 9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7C9 7.55228 9.44772 8 10 8Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Background
                </Popover.Button>
                <ColorPicker
                  color={bgColor}
                  onChangeComplete={({ rgb }) => setBgColor(rgb)}
                />
              </Popover>
            </div>
            <div className="flex items-center gap-5 px-5">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
                onClick={() =>
                  handleUploadPhoto('backgroundImage', layout?.backgroundImage)
                }
              >
                Add background image
              </button>
            </div>
            <Popover>
              <Popover.Button
                type="button"
                className="inline-flex items-center gap-2 ml-5 text-slate-400 py-1 text-sm tracking-sm transition hover:text-purple-700"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12C2 17.5228 6.47715 22 12 22C13.6569 22 15 20.6569 15 19V18.5C15 18.0356 15 17.8034 15.0257 17.6084C15.2029 16.2622 16.2622 15.2029 17.6084 15.0257C17.8034 15 18.0356 15 18.5 15H19C20.6569 15 22 13.6569 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7C15.4477 7 15 7.44772 15 8C15 8.55228 15.4477 9 16 9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6C9.44772 6 9 6.44772 9 7C9 7.55228 9.44772 8 10 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Bottom background color
              </Popover.Button>
              <ColorPicker
                color={bottomColor}
                onChangeComplete={({ rgb }) => setBottomColor(rgb)}
              />
            </Popover>
          </div>
        </div>
        <AligmentPublicationLayout
          bottomColor={bottomColor}
          bgColor={bgColor}
          layout={layout}
          color={RGBAToHexA(textColor)}
          logo={publication?.logo}
          isCentered={isCentered}
          title={publication?.name}
          content={publication?.description}
          bgImage={uploadedFileLink}
          navigations={navigations}
          twitter={publication?.twitter}
          facebook={publication?.facebook}
          linkedin={publication?.linkedin}
          setSelectedTabIndex={setSelectedTabIndex}
          preview
        />
      </div>
      {featurePage && <AddFeatureSection sections={sections} />}
    </>
  );
}
