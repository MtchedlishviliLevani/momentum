import { useState, useEffect, useRef } from 'react';
import CalendarIcon from '../UI/CalendarIcon';
interface DateTimePickerProps {
    value?: string;
    onChange?: (value: string) => void;

}
const DateTimePicker = ({ value = '', onChange }: DateTimePickerProps) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [inputValue, setInputValue] = useState(value);
    const [validationStates, setValidationStates] = useState("Initial");

    const inputRef = useRef(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);


    const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const monthNames = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'];

    const formatDate = (date: Date | null | undefined) => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
    };

    const handleCancel = () => {
        setShowCalendar(false);
    };
    const handleConfirm = () => {
        if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            setInputValue(formattedDate);
            onChange?.(formattedDate);
        }
        setShowCalendar(false);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!newValue || newValue.length === 0) {
            setValidationStates("Initial");
            return;
        }

        if (!pattern.test(newValue)) {
            setValidationStates("Invalidated");
            return;
        }

        const [day, month, year] = newValue.split("/").map(Number);

        const inputDate = new Date(year, month - 1, day);

        // Strict date validation: ensure the date components match what was input
        const isValidDate =
            inputDate.getFullYear() === year &&
            inputDate.getMonth() + 1 === month &&
            inputDate.getDate() === day;

        if (!isValidDate) {
            setValidationStates("Invalidated");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (inputDate < today) {
            setValidationStates("Invalidated");
        } else {
            setValidationStates("Validated");
        }

        onChange?.(newValue);
    };

    /// this code is needed because validation must be updated when select date with calendar and not only typping
    useEffect(() => {
        const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!inputValue || inputValue.length === 0) {
            setValidationStates("Initial");
            return;
        }

        if (!pattern.test(inputValue)) {
            setValidationStates("Invalidated");
            return;
        }

        const [day, month, year] = inputValue.split("/").map(Number);

        const inputDate = new Date(year, month - 1, day);
        const isValidDate =
            inputDate.getFullYear() === year &&
            inputDate.getMonth() + 1 === month &&
            inputDate.getDate() === day;

        if (!isValidDate) {
            setValidationStates("Invalidated");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (inputDate < today) {
            setValidationStates("Invalidated");
        } else {
            setValidationStates("Validated");
        }
    }, [inputValue]);


    const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        toggleCalendar();
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const container = document.querySelector('.date-picker-container') as HTMLElement;
            if (container && !container.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };
        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCalendar]);

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const firstDayOfWeek = firstDay.getDay() || 7;
        const prevMonthDays = firstDayOfWeek - 1;

        const prevMonth = new Date(year, month, 0);
        const prevMonthDates = [];
        for (let i = prevMonthDays; i > 0; i--) {
            const day = prevMonth.getDate() - i + 1;
            prevMonthDates.push({
                day,
                date: new Date(year, month - 1, day),
                className: 'other-month'
            });
        }
        const currentMonthDates = [];
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(year, month, i);
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            currentMonthDates.push({
                day: i,
                date,
                className: isSelected ? 'selected' : ''
            });
        }
        const daysAdded = prevMonthDays + lastDay.getDate();
        const nextMonthDays = 7 - (daysAdded % 7);
        const nextMonthDates = [];
        if (nextMonthDays < 7) {
            for (let i = 1; i <= nextMonthDays; i++) {
                nextMonthDates.push({
                    day: i,
                    date: new Date(year, month + 1, i),
                    className: 'other-month'
                });
            }
        }

        return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
    };

    return (
        <div className="date-picker-container relative w-full">
            <label htmlFor="date-input" className="text-[14px]  mb-[2px] text-[#343a40]">დედლაინი*</label>
            <div className="relative flex items-center">
                <div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#0D0F10]"
                    onClick={handleIconClick}
                >
                    <CalendarIcon currentFill={validationStates === "Initial" ? "#4D596A" : validationStates === "Validated" ? "#08A508" : "#FA4D4D"} />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    id="date-input"
                    className={`w-full py-3 pl-[45px]  ${validationStates === "Initial" ? "text-[#4D596A]" : validationStates === "Validated" ? "border-[#08A508]" : "border-[#FA4D4D]"}   border rounded-[5px] text-[14px] outline-none`}
                    placeholder="DD/MM/YYYY"
                    value={inputValue}
                    onChange={handleInputChange}
                />

            </div>



            {showCalendar && (
                <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                    <div className="flex justify-between items-center p-3">
                        <div className="font-bold text-[#000]">
                            {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrevMonth}
                                className="bg-transparent border-none cursor-pointer text-lg text-[#000]"
                            >
                                ↑
                            </button>
                            <button
                                onClick={handleNextMonth}
                                className="bg-transparent border-none cursor-pointer text-lg text-[#000]"
                            >
                                ↓
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 text-center pl-[40px]">
                        {dayLabels.map((label, index) => (
                            <div key={`label-${index}`} className="py-2 font-bold text-gray-600 text-sm">
                                {label}
                            </div>
                        ))}

                        {generateCalendarDays().map((item, index) => (
                            <div
                                key={`day-${index}`}
                                className={`py-2 cursor-pointer text-sm transition-color
                  ${item.className === 'other-month' ? 'text-gray-400' : 'text-gray-800'}
                  ${item.className === 'selected' ? 'bg-[#8338EC] text-white  rounded-[2px] font-bold' : ''}
                `}
                                onClick={() => handleDayClick(item.date)}
                            >
                                {item.day}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between p-3">
                        <button
                            onClick={handleCancel}
                            className="text-[#8338EC] bg-transparent border-none cursor-pointer "
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="text-[#8338EC] bg-transparent border-none cursor-pointer"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateTimePicker;