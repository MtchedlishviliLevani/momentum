import React from "react";

const SelectedFilters: React.FC<SelectedFiltersProps> = ({
    selectedFilters,
    departments,
    priorities,
    employees,
    removeSelectedFilter,
    clearSelectedFilter,
}) => {
    const getLabel = (type: FilterType, id: number): string => {
        if (type === "departments") {
            const dep = departments.find((d) => d.id === id);
            return dep ? dep.name : "";
        }

        if (type === "priorities") {
            const prio = priorities.find((p) => p.id === id);
            return prio ? prio.name : "";
        }

        if (type === "employees") {
            const emp = employees.find((e) => e.id === id);
            return emp ? `${emp.name}`.trim() : "";
        }

        return "";
    };

    const hasSelectedFilters =
        selectedFilters.departments.length > 0 ||
        selectedFilters.priorities.length > 0 ||
        selectedFilters.employees.length > 0;
    return (
        <div className="mt-[25px] flex flex-wrap gap-[8px]">
            {Object.entries(selectedFilters).flatMap(([type, ids]) =>
                ids.map((id) => {
                    const label = getLabel(type as FilterType, id);

                    return (
                        <div
                            key={`${type}-${id}`}
                            className="flex  items-center px-[10px] py-[6px] gap-[4px] text-[#343a40] rounded-[43px] text-[14px] border border-[#ced4da] border-solid"
                        >
                            <span>{label}</span>
                            <button className="cursor-pointer" onClick={() => removeSelectedFilter(type as FilterType, id)}>
                                <img src="/svg/closeIcon.svg" alt="close icon" />
                            </button>
                        </div>
                    );
                })
            )}
            {hasSelectedFilters && <button className="flex items-center px-[10px] py-[6px] gap-[4px] text-[#343a40]  text-[14px] cursor-pointer" onClick={clearSelectedFilter}>გასუფთავება</button>}
        </div>
    );
};

export default SelectedFilters;
