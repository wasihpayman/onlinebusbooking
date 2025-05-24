// تابع برای فرمت قیمت به سبک افغانی
export const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString('fa-AF')} افغانی`;
  };
  
  // تابع برای فرمت تاریخ به فرمت شمسی (در صورت نیاز می‌تونی moment-jalaali یا dayjs استفاده کنی)
  export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fa-IR');
  };
  
  // تبدیل دقیقه به ساعت و دقیقه (مثلاً: 125 دقیقه → 2 ساعت و 5 دقیقه)
  export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ساعت و ${mins} دقیقه`;
  };
  export const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kabul'
    };
    return date.toLocaleTimeString('fa-IR', options);
  }