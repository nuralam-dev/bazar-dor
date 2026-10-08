// বাংলা সংখ্যাকে ইংরেজি Numerics এ রূপান্তর
export const parseBanglaNumber = (str: string | number): number => {
  if (typeof str === 'number') return str;
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const engStr = str.replace(/[০-৯]/g, (d) => banglaDigits.indexOf(d).toString());
  return parseFloat(engStr.replace(/[^0-9.-]/g, '')) || 0;
};

// ইংরেজি সংখ্যাকে বাংলা ডট/স্ট্রিং এ রূপান্তর
export const toBanglaNumber = (num: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
};