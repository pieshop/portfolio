export const MEDIA_NONE = 'media.NONE';
export const MEDIA_VIDEO = 'MEDIA.VIDEO';
export const MEDIA_AUDIO = 'MEDIA.AUDIO';
export const MEDIA_IMAGE = 'MEDIA.IMAGE';
export const MEDIA_PDF = 'MEDIA.PDF';
export const MEDIA_OTHER = 'MEDIA.OTHER';

export const IMAGE_DESKTOP = 'IMAGE.DESKTOP';
export const IMAGE_SMARTPHONE = 'IMAGE.SMARTPHONE';
export const IMAGE_OLM = 'IMAGE.OLM';
export const IMAGE_NONE = 'IMAGE.NONE';

const VIDEO_EXTENSIONS = '.mp4,video/mp4,.MOV,video/quicktime';
const AUDIO_EXTENSIONS = '.mp3,audio/mpeg,audio/mp3';
const IMAGE_EXTENSIONS = '.gif,.jpg,.jpeg,.png,.svg,image/gif,image/jpeg,image/png,image/svg+xml';
const PDF_EXTENSIONS = '.pdf';

export const mediaIsImage = (type: string): boolean => IMAGE_EXTENSIONS.includes(type);

export const mediaIsPDF = (type: string): boolean => PDF_EXTENSIONS.includes(type);

export const mediaIsVideo = (type: string): boolean => VIDEO_EXTENSIONS.includes(type);

export const getImageTypeFromName = (name: string): string => {
  const is_desktop = name.indexOf('desktop') !== -1;
  const is_smartphone = name.indexOf('smartphone') !== -1;
  const is_olm = name.indexOf('olm') !== -1;
  return is_desktop
    ? IMAGE_DESKTOP
    : is_smartphone
    ? IMAGE_SMARTPHONE
    : is_olm
    ? IMAGE_OLM
    : IMAGE_DESKTOP;
};

export const getMediaType = (type: string): string => {
  let returnType = MEDIA_NONE;
  if (VIDEO_EXTENSIONS.includes(type)) returnType = MEDIA_VIDEO;
  if (AUDIO_EXTENSIONS.includes(type)) returnType = MEDIA_AUDIO;
  if (IMAGE_EXTENSIONS.includes(type)) returnType = MEDIA_IMAGE;
  if (PDF_EXTENSIONS.includes(type)) returnType = MEDIA_PDF;
  return returnType;
};

export const bytesToMegaBytes = (bytes: number): string => (bytes / (1024 * 1024)).toFixed(2);

export const megaBytesToBytes = (mb: number): number => mb * (1024 * 1024);
