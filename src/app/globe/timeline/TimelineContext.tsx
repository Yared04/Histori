import React, {
  createContext,
  useState,
  ReactNode,
  FunctionComponent,
  use,
  useEffect,
} from "react";

interface TimelineContextType {
  selectedYear: string;
  sliderPosition: number;
  updateYearAndSlider: (newPosition: number) => void;
}

const TimelineContext = createContext<TimelineContextType | undefined>(
  undefined
);

interface TimelineProviderProps {
  children: ReactNode;
}

export const TimelineProvider: FunctionComponent<TimelineProviderProps> = ({
  children,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>("2024 AD");
  const [sliderPosition, setSliderPosition] = useState<number>(0);

  useEffect(() => {
    updateYear("2024 AD");
  }, []);
  const updateYear = (year: string): void => {
    const yearValue = Number(year.split(" ")[0]);

    // Determine the direction of the change based on the button's direction prop
    const directionMultiplier = year.split(" ")[1] === "AD" ? 3000 : 0;

    // Calculate the new position and call the update function
    const newPosition = (yearValue + directionMultiplier) * 0.0181818181818182;

    if (newPosition < 0 || newPosition > 99.9818181818182) {
      return;
    }
    updateYearAndSlider(newPosition);
  };

  const updateYearAndSlider = (newPosition: number): void => {
    setSliderPosition(newPosition);

    let currentYear: string;
    const newCurrentYear = 54.99999999999995 * newPosition;
    if (newCurrentYear < 3000) {
      currentYear = Math.round(3000 - newCurrentYear) + " BC";
    } else {
      currentYear = Math.round(newCurrentYear - 3000) + " AD";
    }
    setSelectedYear(currentYear);
  };

  const contextValue: TimelineContextType = {
    selectedYear,
    sliderPosition,
    updateYearAndSlider,
  };

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  );
};

export default TimelineContext;
