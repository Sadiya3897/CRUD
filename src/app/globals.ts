export const REGX_EMAIL = /^[a-zA-Z0-9._]{1,}(?:!^\*-?|}{`~<>+()\[\]\\,;:\s@"-#$%&=][A-Za-z0-9]+([^<>()\[\]\\,;:\s@"]+))*@((\[])|(([a-zA-Z\-]+\.)+[a-zA-Z]{2,4}))$/;
export const REGX_ADDRESS: any = /^[A-Za-z0-9\/\.\-\,]+([A-Za-z0-9\/\.\-\, ]+)*$/;
export const REGX_SINGLE_SPACE_STRING: any = /^([A-Za-z\.]+ )+[A-Za-z]+$|^[A-Za-z]+$/;
export const REGX_FREE_TEXT: any = /^(?![0-9]*$)[A-Za-z0-9'\.\-\,\_]+([A-Za-z0-9'\.\-\, ]+)*$/;
export const REGX_ALPHANUM_NOSPACE: any = /^[a-zA-Z0-9]*$/;
export const REGX_ZIPCODE: any = /^\d{5}(?:[-\s]\d{4})?$/;
