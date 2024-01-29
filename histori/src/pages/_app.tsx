import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

interface YearContextType {
  selectedYear: any;
  setSelectedYear: React.Dispatch<React.SetStateAction<any>>;
}

interface EventsContextType {
  events: any;
  setEvents: React.Dispatch<React.SetStateAction<any>>;
}

export const YearContext = createContext<YearContextType>({
  selectedYear: null,
  setSelectedYear: () => {},
});
export const EventsContext = createContext<Partial<EventsContextType>>({
  events: [],
  setEvents: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
  const [selectedYear, setSelectedYear] = useState("3000 BC");
  const [events, setEvents] = useState([
    {
      title: "Adwa",
      description:
        "This is the battle of Adwa where Ethiopia defeated the Italian invaders and sent them back to their country with great shame.",
      image: "/adwa.jpeg",
    },
  ]);

  return (
    <YearContext.Provider value={{ selectedYear, setSelectedYear } as any}>
      <EventsContext.Provider value={{ events, setEvents } as any}>
        <Component {...pageProps} />
      </EventsContext.Provider>
    </YearContext.Provider>
  );
}
