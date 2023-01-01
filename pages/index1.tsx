import { Box, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
type Month = { month: number; year: number };
type SelectedDate = {
  from: {
    month: number | null;
    year: number | null;
    day: number | null;
  };
  to: {
    month: number | null;
    year: number | null;
    day: number | null;
  };
};
type HoverPosition = {
  from: number | null;
  to: number | null;
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const weekdaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const LeftArowIcon = (): JSX.Element => {
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.97774 0.347695C9.18865 0.558664 9.30713 0.844761 9.30713 1.14307C9.30713 1.44138 9.18865 1.72748 8.97774 1.93845L3.40899 7.5072L8.97774 13.0759C9.18267 13.2881 9.29607 13.5723 9.2935 13.8673C9.29094 14.1622 9.17262 14.4444 8.96404 14.653C8.75546 14.8616 8.47329 14.9799 8.17832 14.9825C7.88335 14.985 7.59917 14.8716 7.38699 14.6667L1.02287 8.30257C0.811963 8.0916 0.693483 7.8055 0.693483 7.5072C0.693483 7.20889 0.811963 6.92279 1.02287 6.71182L7.38699 0.347695C7.59796 0.13679 7.88406 0.0183105 8.18237 0.0183105C8.48068 0.0183105 8.76678 0.13679 8.97774 0.347695Z"
        fill="#999999"
      />
    </svg>
  );
};
const RightArrowIcon = (): JSX.Element => {
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.02226 14.6523C0.811351 14.4413 0.692871 14.1552 0.692871 13.8569C0.692871 13.5586 0.811351 13.2725 1.02226 13.0616L6.59101 7.4928L1.02226 1.92405C0.817328 1.71188 0.703934 1.4277 0.706497 1.13273C0.70906 0.837756 0.827376 0.555592 1.03596 0.347008C1.24454 0.138424 1.52671 0.0201101 1.82168 0.0175467C2.11665 0.0149832 2.40083 0.128377 2.61301 0.333305L8.97713 6.69743C9.18804 6.9084 9.30652 7.1945 9.30652 7.4928C9.30652 7.79111 9.18804 8.07721 8.97713 8.28818L2.61301 14.6523C2.40204 14.8632 2.11594 14.9817 1.81763 14.9817C1.51932 14.9817 1.23322 14.8632 1.02226 14.6523Z"
        fill="#999999"
      />
    </svg>
  );
};
const getDays = (currentMonth: Month): number => {
  return new Date(currentMonth.year, currentMonth.month + 1, 0).getDate();
};
function getFirstDayOfMonth(currentMonth: Month): number {
  const day = new Date(currentMonth.year, currentMonth.month, 1).getDay();
  return day;
}
const getMonthData = (currentMonth: Month): number[] => {
  const noOfDaysPerMonth = getDays(currentMonth);

  const arr = new Array(42).fill(0);
  const startDay = getFirstDayOfMonth(currentMonth);
  let day = 0;
  const monthDays = arr.map((ele, index) => {
    if (day < noOfDaysPerMonth && index >= startDay) {
      day++;
      return day;
    }
    return ele;
  });
  return monthDays;
};
const getNextMonth = (currentMonth: Month): Month => {
  let month = currentMonth.month === 11 ? 0 : currentMonth.month + 1;
  let year =
    currentMonth.month === 11 ? currentMonth.year + 1 : currentMonth.year;
  return {
    month: month,
    year: year,
  };
};
const getPreviousMonth = (currentMonth: Month): Month => {
  let month = currentMonth.month === 0 ? 11 : currentMonth.month - 1;
  let year =
    currentMonth.month === 0 ? currentMonth.year - 1 : currentMonth.year;
  return {
    month: month,
    year: year,
  };
};

export default function DatePicker() {
  const date = new Date();
  const [fromMonthAndYear, setFromMonthAndYear] = useState<Month>({
    month: date.getMonth(),
    year: date.getFullYear(),
  });
  const [toMonthAndYear, setToMonthAndYear] = useState<Month>(() => {
    const currentMonth = {
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    return getNextMonth(currentMonth);
  });
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    from: {
      month: null,
      year: null,
      day: null,
    },
    to: {
      month: null,
      year: null,
      day: null,
    },
  });

  const [fromMonthsData, setFromMonthsData] = useState<number[]>(() =>
    getMonthData({
      month: date.getMonth(),
      year: date.getFullYear(),
    })
  );
  const [toMonthsData, setToMonthsData] = useState<number[]>(() => {
    const currentMonth = {
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    const nextMonth = getNextMonth(currentMonth);
    return getMonthData(nextMonth);
  });
  const [hoverPosition, setHoverPosition] = useState<{
    from: number | null;
    to: number | null;
  }>({ from: null, to: null });

  useEffect(() => {
    const nextMonth = getNextMonth(fromMonthAndYear);
    setToMonthAndYear(nextMonth);
    setHoverPosition({
      from: null,
      to: null,
    });
    setSelectedDate({
      to: {
        month: null,
        year: null,
        day: null,
      },
      from: {
        month: null,
        year: null,
        day: null,
      },
    });
    setFromMonthsData([...getMonthData(fromMonthAndYear)]);
  }, [fromMonthAndYear]);
  useEffect(() => {
    setSelectedDate((selected) => {
      return {
        ...selected,
        to: {
          month: null,
          year: null,
          day: null,
        },
      };
    });
    setHoverPosition((hoverPosition) => {
      return {
        ...hoverPosition,
        to: null,
      };
    });
    setToMonthsData([...getMonthData(toMonthAndYear)]);
  }, [toMonthAndYear]);
  return (
    <>
      DatePicker
      <Box display="flex">
        {/* from calender starts here */}
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="50%"
          >
            <Box
              fontFamily="Poppins"
              fontStyle="normal"
              fontWeight={300}
              fontSize="16px"
              lineHeight="18px"
              color="#333333"
            >
              From:
            </Box>
            <Box
              visibility={selectedDate.from.day ? "visible" : "hidden"}
              fontFamily="Poppins"
              fontStyle="normal"
              fontWeight={520}
              fontSize="15px"
              lineHeight="25px"
              color="#333333"
            >
              {`${selectedDate.from.day} ${
                selectedDate.from.month !== null
                  ? monthsShort[selectedDate.from.month]
                  : null
              } ${selectedDate.from.year} `}
            </Box>
          </Box>
          <Box display={"flex"} flexDirection="column" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box
                onClick={() => {
                  setFromMonthAndYear((currentMonth) => ({
                    ...getPreviousMonth(currentMonth),
                  }));
                }}
              >
                <LeftArowIcon />
              </Box>
              <Box
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight={600}
                fontSize="17px"
                lineHeight="21px"
                textAlign="center"
                color="#333333"
              >{`${
                monthsShort[fromMonthAndYear.month]
              } ${fromMonthAndYear.year.toString()}`}</Box>
              <Box
                onClick={() => {
                  setFromMonthAndYear((currentMonth) => ({
                    ...getNextMonth(currentMonth),
                  }));
                }}
              >
                <RightArrowIcon />
              </Box>
            </Box>
            <Divider width="100%" marginTop="15px" />
            <Box>
              <Box className={"grid-container"} marginTop="10px">
                {weekdaysShort?.map((ele) => {
                  return (
                    <Box
                      className="grid-item"
                      fontFamily="Poppins"
                      fontStyle="normal"
                      fontWeight={500}
                      fontSize="16px"
                      lineHeight="18px"
                      textAlign="center"
                      color="#666666"
                    >
                      {ele}
                    </Box>
                  );
                })}
                {fromMonthsData?.map((ele) => {
                  return (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      style={{
                        backgroundColor:
                          ele === selectedDate.from.day ||
                          (!hoverPosition.to && ele === selectedDate.to.day)
                            ? "#5C20CF"
                            : selectedDate.from.day &&
                              ele > selectedDate.from.day &&
                              hoverPosition.from &&
                              ele <= hoverPosition.from
                            ? "#EFE9FA"
                            : "white",
                        color:
                          ele === selectedDate.from.day ||
                          (!hoverPosition.to && ele === selectedDate.to.day)
                            ? "#FFFFFF"
                            : selectedDate.from.day &&
                              ele > selectedDate.from.day &&
                              hoverPosition.from &&
                              ele <= hoverPosition.from
                            ? "#5C20CF"
                            : "#999999",
                        borderRadius: "6px",
                        height: "28px",
                        textAlign: "center",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "18px",
                      }}
                      className="grid-item"
                      onClick={() => {
                        if (!selectedDate?.from.day) {
                          setSelectedDate({
                            from: {
                              month: fromMonthAndYear.month,
                              year: fromMonthAndYear.year,
                              day: ele,
                            },
                            to: {
                              month: null,
                              year: null,
                              day: null,
                            },
                          });
                        } else {
                          if (ele > selectedDate?.from?.day) {
                            setHoverPosition({
                              from: ele,
                              to: null,
                            });
                            setSelectedDate((selected) => {
                              return {
                                ...selected,
                                to: {
                                  month: fromMonthAndYear.month,
                                  year: fromMonthAndYear.year,
                                  day: ele,
                                },
                              };
                            });
                          }
                        }
                      }}
                      onMouseOver={() => {
                        if (!selectedDate.to.day)
                          setHoverPosition({
                            from: ele,
                            to: null,
                          });
                      }}
                      visibility={ele === 0 ? "hidden" : "visible"}
                    >
                      {ele}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* from calender ends here */}
        <Box marginTop="30px" marginLeft="20px" marginRight="20px">
          <Divider height="90%" borderWidth="1px" orientation="vertical" />
        </Box>

        {/* To claender starts here */}
        <Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="50%"
            >
              <Box
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight={300}
                fontSize="16px"
                lineHeight="18px"
                color="#333333"
              >
                To:
              </Box>

              <Box
                visibility={selectedDate.to.day ? "visible" : "hidden"}
                fontFamily="Poppins"
                fontStyle="normal"
                fontWeight={520}
                fontSize="15px"
                lineHeight="25px"
                color="#333333"
              >
                {`${selectedDate.to.day} ${
                  selectedDate.to.month !== null
                    ? monthsShort[selectedDate.to.month]
                    : null
                } ${selectedDate.to.year} `}
              </Box>
            </Box>
            <Box display={"flex"} flexDirection="column" alignItems="center">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Box
                  onClick={() => {
                    setToMonthAndYear((currentMonth) => {
                      const prevMonth = getPreviousMonth(currentMonth);
                      if (
                        prevMonth.month > fromMonthAndYear.month ||
                        prevMonth.year > fromMonthAndYear.year
                      )
                        return prevMonth;
                      return currentMonth;
                    });
                  }}
                >
                  <LeftArowIcon />
                </Box>
                <Box
                  fontFamily="Poppins"
                  fontStyle="normal"
                  fontWeight={600}
                  fontSize="17px"
                  lineHeight="21px"
                  textAlign="center"
                  color="#333333"
                >{`${
                  monthsShort[toMonthAndYear.month]
                } ${toMonthAndYear.year.toString()}`}</Box>
                <Box
                  onClick={() => {
                    setToMonthAndYear((currentMonth) => ({
                      ...getNextMonth(currentMonth),
                    }));
                  }}
                >
                  <RightArrowIcon />
                </Box>
              </Box>
              <Divider width="100%" marginTop="15px" />
              <Box>
                <Box className={"grid-container"} marginTop="10px">
                  {weekdaysShort?.map((ele) => {
                    return (
                      <Box
                        className="grid-item"
                        fontFamily="Poppins"
                        fontStyle="normal"
                        fontWeight={500}
                        fontSize="16px"
                        lineHeight="18px"
                        textAlign="center"
                        color="#666666"
                      >
                        {ele}
                      </Box>
                    );
                  })}
                  {toMonthsData?.map((ele) => {
                    return (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                          backgroundColor:
                            selectedDate.from.day &&
                            hoverPosition.to &&
                            ele === selectedDate.to.day
                              ? "#5C20CF"
                              : selectedDate.from.day &&
                                hoverPosition.to &&
                                ele <= hoverPosition.to
                              ? "#EFE9FA"
                              : "white",
                          color:
                            selectedDate.from.day &&
                            hoverPosition.to &&
                            ele === selectedDate.to.day
                              ? "#FFFFFF"
                              : selectedDate.from.day &&
                                hoverPosition.to &&
                                ele <= hoverPosition.to
                              ? "#5C20CF"
                              : "#999999",

                          borderRadius: "6px",
                          height: "28px",
                          textAlign: "center",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "18px",
                        }}
                        className="grid-item"
                        onClick={() => {
                          if (selectedDate.from.day) {
                            setSelectedDate((selected) => {
                              return {
                                ...selected,
                                to: {
                                  month: toMonthAndYear.month,
                                  year: toMonthAndYear.year,
                                  day: ele,
                                },
                              };
                            });
                            setHoverPosition({
                              from: getDays(fromMonthAndYear),
                              to: ele,
                            });
                          }
                        }}
                        onMouseOver={() => {
                          if (selectedDate.from.day && !selectedDate.to.day)
                            setHoverPosition({
                              from: getDays(fromMonthAndYear),
                              to: ele,
                            });
                        }}
                        visibility={ele === 0 ? "hidden" : "visible"}
                      >
                        {ele}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* To calender ends here */}
      </Box>
      <style jsx>
        {`
          :global(.grid-container) {
            display: grid;
            grid-template-columns: 36px 36px 36px 36px 36px 36px 36px;
            grid-column-gap: 2px;
            grid-row-gap: 2px;
          }
          global(.grid-item) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 5px 12px;
            background: purple;
            border-color: yellow;
            border-radius: 6px;
            border: none;
            font-size: 30px;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
