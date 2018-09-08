export const getAllowedExtensions = (type) => {
  let extensions = '';
  switch (type) {
    case 'VIDEO':
      extensions = VIDEO_EXTENSIONS;
      break;
    case 'AUDIO':
      extensions = AUDIO_EXTENSIONS;
      break;
    case 'IMAGE':
      extensions = IMAGE_EXTENSIONS;
      break;
    case 'XML':
      extensions = XML_EXTENSIONS;
      break;
    case 'TXT':
      extensions = TEXT_EXTENSIONS;
      break;
    case 'CSV':
      extensions = CSV_EXTENSIONS;
      break;
    case 'XLS':
      extensions = XLS_EXTENSIONS;
      break;
    case 'ZIP':
      extensions = ZIP_EXTENSIONS;
      break;
    case 'JSON':
      extensions = JSON_EXTENSIONS;
      break;
  }
  return extensions;
};

export const mediaIsImage = (type) => {
  return IMAGE_EXTENSIONS.includes(type);
};

export const mediaIsSWF = (type) => {
  return SWF_EXTENSIONS.includes(type);
};

export const mediaIsPDF = (type) => {
  return PDF_EXTENSIONS.includes(type);
};

export const mediaIsVideo = (type) => {
  return VIDEO_EXTENSIONS.includes(type);
};

export const getImageTypeFromName = (name) => {
  const is_desktop = name.indexOf('desktop') !== -1;
  const is_smartphone = name.indexOf('smartphone') !== -1;
  const is_olm = name.indexOf('olm') !== -1;
  const returnType = is_desktop
    ? IMAGE_DESKTOP
    : is_smartphone
      ? IMAGE_SMARTPHONE
      : is_olm
        ? IMAGE_OLM
        : IMAGE_DESKTOP;
  return returnType;
};

export const getMediaType = (type) => {
  let returnType = MEDIA_NONE;
  if (VIDEO_EXTENSIONS.includes(type)) {
    returnType = MEDIA_VIDEO;
  }
  if (AUDIO_EXTENSIONS.includes(type)) {
    returnType = MEDIA_AUDIO;
  }
  if (IMAGE_EXTENSIONS.includes(type)) {
    returnType = MEDIA_IMAGE;
  }
  if (PDF_EXTENSIONS.includes(type)) {
    returnType = MEDIA_PDF;
  }
  if (SWF_EXTENSIONS.includes(type)) {
    returnType = MEDIA_SWF;
  }
  return returnType;
};

export const isMediaCroppable = (type) => {
  return CROP_EXTENSIONS.includes(type);
};

export const bytesToMegaBytes = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2);
  // return bytes / (1024 * 1024);
};

export const megaBytesToBytes = (mb) => {
  return mb * (1024 * 1024);
};

export const base64fileSize = (data) => {
  /**
   * Calculate base64 image size
   */
  const base64Length = data.length - (data.indexOf(',') + 1);
  const padding =
    data.charAt(data.length - 2) === '=' ? 2 : data.charAt(data.length - 1) === '=' ? 1 : 0;
  const fileSize = base64Length * 0.75 - padding;
  return fileSize;
  // return (fileSize / 1024).toFixed(2);
};

export const MEDIA_NONE = 'media.NONE';
export const MEDIA_VIDEO = 'MEDIA.VIDEO';
export const MEDIA_AUDIO = 'MEDIA.AUDIO';
export const MEDIA_IMAGE = 'MEDIA.IMAGE';
export const MEDIA_PDF = 'MEDIA.PDF';
export const MEDIA_SWF = 'MEDIA.SWF';
export const MEDIA_OTHER = 'MEDIA.OTHER';

export const IMAGE_DESKTOP = 'IMAGE.DESKTOP';
export const IMAGE_SMARTPHONE = 'IMAGE.SMARTPHONE';
export const IMAGE_OLM = 'IMAGE.OLM';
export const IMAGE_NONE = 'IMAGE.NONE';

const VIDEO_EXTENSIONS = '.mp4,video/mp4,.MOV,video/quicktime';
const AUDIO_EXTENSIONS = '.mp3,audio/mpeg,audio/mp3';
const IMAGE_EXTENSIONS = '.gif,.jpg,.jpeg,.png,.svg,image/gif,image/jpeg,image/png,image/svg+xml';
const SWF_EXTENSIONS = '.swf';
const PDF_EXTENSIONS = '.pdf';
const XML_EXTENSIONS = '.xml,text/xml';
const TEXT_EXTENSIONS = '.txt,text/plain';
const CSV_EXTENSIONS = '.csv,text/csv';
const XLS_EXTENSIONS = '.xls,application/vnd.ms-excel';
const ZIP_EXTENSIONS = '.zip,application/zip';
const JSON_EXTENSIONS = '.json,application/json';
const CROP_EXTENSIONS = '.jpg,.jpeg,.png,image/jpeg,image/png';
