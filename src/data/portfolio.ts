export interface BirthdayData {
  friend: {
    fullName: string;
    firstName: string;
    age?: number | string;
    title: string;
  };
  sender: {
    name: string;
  };
  stats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  memoriesIntro: {
    title: string;
    lines: string[];
    pills: string[];
    closingLine: string;
  };
  constellations: {
    group1: {
      label: string;
      words: { text: string; size: string; depth: number }[];
    };
    group2: {
      label: string;
      words: { text: string; size: string; depth: number }[];
    };
    group3: {
      label: string;
      words: { text: string; size: string; depth: number }[];
    };
  };
  moments: {
    id: string;
    number: string;
    kicker: string;
    title: string;
    story: string;
    tags: string[];
    link?: { label: string; url: string };
    placement: 'right-middle' | 'top-right' | 'bottom-right';
  }[];
  wishes: {
    title: string;
    ageNumber?: string;
    lines: string[];
  };
  promises: {
    title: string;
    lines: string[];
  };
  epilogue: {
    heading: string;
    invitation: string;
    personalMessage: string;
    links: { label: string; url: string }[];
    creditsAI: string;
  };
}

export const BIRTHDAY_DATA: BirthdayData = {
  friend: {
    fullName: "Iman",
    firstName: "Iman",
    title: "A Celebration of Kindness, Sweetness & Pure Grace",
  },
  sender: {
    name: "Durekhan",
  },
  stats: [
    {
      label: "Bond of Friendship",
      value: "3 Months",
      sublabel: "Feels like a cherished, lifelong bond",
    },
    {
      label: "Heart & Spirit",
      value: "Pure Sweetness",
      sublabel: "Very friendly, lovely and comforting",
    },
    {
      label: "Sacred Destination",
      value: "Saudi Arabia",
      sublabel: "To always keep meeting in the blessed lands",
    },
  ],
  memoriesIntro: {
    title: "A Truly Blessed Friendship",
    lines: [
      "Three months, and it already feels like a long friendship.",
      "You are kind, friendly and sweet, and you make people feel comfortable.",
      "Some people are a blessing to meet. You are one of them.",
    ],
    pills: ["3 Months Together", "Sweet & Lovely", "Saudi Arabia Dreams", "Always Friends"],
    closingLine: "May Allah keep you happy, safe and blessed this year and always.",
  },
  constellations: {
    group1: {
      label: "Her Core Qualities",
      words: [
        { text: "Kind & Sweet", size: "text-2xl md:text-3xl", depth: 1 },
        { text: "Very Friendly", size: "text-lg md:text-xl", depth: 2 },
        { text: "Comforting Presence", size: "text-xl md:text-2xl", depth: 1.5 },
        { text: "Truly Lovely", size: "text-sm md:text-base", depth: 2.2 },
        { text: "A Real Blessing", size: "text-xl md:text-2xl", depth: 1.2 },
        { text: "Pure Heart", size: "text-lg md:text-xl", depth: 1.8 },
      ],
    },
    group2: {
      label: "Heartfelt Bonds & Duas",
      words: [
        { text: "Always Friends", size: "text-xl md:text-2xl", depth: 1 },
        { text: "Meetings in Saudi Arabia", size: "text-lg md:text-xl", depth: 2 },
        { text: "Shared Laughter", size: "text-xl md:text-2xl", depth: 1.3 },
        { text: "Gentle Conversations", size: "text-sm md:text-base", depth: 2.1 },
        { text: "Forever Friendship", size: "text-lg md:text-xl", depth: 1.6 },
        { text: "Unbreakable Bond", size: "text-xl md:text-2xl", depth: 1.1 },
      ],
    },
    group3: {
      label: "Sacred Wishes & Wonders",
      words: [
        { text: "Umrah in Ramadan", size: "text-xl md:text-2xl", depth: 1.4 },
        { text: "Umrah in Rabi al-Awwal", size: "text-2xl md:text-3xl", depth: 1 },
        { text: "All Difficulties Solved", size: "text-lg md:text-xl", depth: 2 },
        { text: "Every Wish Fulfilled", size: "text-xl md:text-2xl", depth: 1.6 },
        { text: "Success in Everything", size: "text-sm md:text-base", depth: 2.3 },
        { text: "Always Protected & Blessed", size: "text-lg md:text-xl", depth: 1.2 },
      ],
    },
  },
  moments: [
    {
      id: "moment-1",
      number: "01",
      kicker: "A Beautiful Meeting",
      title: "Three Months, A Lifelong Feeling",
      story:
        "Three months, and it already feels like a long friendship. You are very good, very friendly, sweet and lovely, and you have this rare gift of making people feel completely comfortable and at peace around you. Some people are a blessing to meet — you are truly one of them.",
      tags: ["3Months", "KindSoul", "Comforting", "TrueBlessing"],
      placement: "right-middle",
    },
    {
      id: "moment-2",
      number: "02",
      kicker: "The Sacred Dua",
      title: "Umrah in Ramadan & Rabi al-Awwal",
      story:
        "My heartfelt prayer for you: May Allah call you for Umrah every single year, in the holy month of Ramadan and in Rabi al-Awwal. May our friendship stay forever, and may we always keep meeting in the blessed lands of Saudi Arabia.",
      tags: ["UmrahEveryYear", "Ramadan", "RabiAlAwwal", "SaudiArabia"],
      placement: "top-right",
    },
    {
      id: "moment-3",
      number: "03",
      kicker: "A Lifelong Bond",
      title: "Always Friends",
      story:
        "May our friendship stay forever, and may we always keep meeting in Saudi Arabia. May all your wishes be fulfilled, all your difficulties be solved, and may you find great success and happiness in everything you do.",
      tags: ["AlwaysFriends", "SaudiArabia", "LifelongBond", "Blessings"],
      placement: "bottom-right",
    },
  ],
  wishes: {
    title: "Birthday Wishes for Iman",
    lines: [
      "May Allah call you for Umrah every year, in Ramadan and in Rabi al-Awwal.",
      "May all your heartfelt wishes be fulfilled and every difficulty in your path be easily solved.",
      "May you be brilliantly successful in everything you pursue in this life and the next.",
      "May our friendship stay forever, and may we always keep meeting in Saudi Arabia.",
      "May Allah keep you happy, safe, smiling and blessed this year and always.",
    ],
  },
  promises: {
    title: "My Promises to You",
    lines: [
      "I promise to always keep you in my sincere prayers and duas for Umrah and happiness.",
      "I promise to always appreciate how kind, sweet, and comforting you are as a friend.",
      "I promise our friendship will stay strong across every mile and every passing year.",
      "I promise to celebrate your success and support your dreams always.",
      "I promise our friendship will stay forever and we will always keep meeting in Saudi Arabia.",
    ],
  },
  epilogue: {
    heading: "Happy Birthday, Iman",
    invitation: "Make a heartfelt wish as you step into this blessed new year...",
    personalMessage:
      "Three months, and it already feels like a long friendship. Some people are a blessing to meet — you are one of them. May Allah keep you happy, safe and blessed this year and always.",
    links: [],
    creditsAI: "Visuals created with AI (Google Gemini)",
  },
};
