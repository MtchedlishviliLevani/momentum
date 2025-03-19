export const formatGeorgianDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const georgianMonths = [
    "იანვარი",
    "თებერვალი",
    "მარტი",
    "აპრილი",
    "მაისი",
    "ივნისი",
    "ივლისი",
    "აგვისტო",
    "სექტემბერი",
    "ოქტომბერი",
    "ნოემბერი",
    "დეკემბერი",
  ];

  const day = date.getDate();
  const month = georgianMonths[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month.slice(0, 4)}, ${year}`;
};

export const formatGeorgianFullDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  const georgianDays = [
    "კვირა",
    "ორშაბათი",
    "სამშაბათი",
    "ოთხშაბათი",
    "ხუთშაბათი",
    "პარასკევი",
    "შაბათი",
  ];

  const dayOfWeek = georgianDays[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${dayOfWeek} - ${day}/${month}/${year}`;
};
