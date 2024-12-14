export type State = "good" | "mediocre" | "bad";

type Kind = "heartRate" | "sleepTime" | "pressure";

export function DetermineColor(value: number, kind: Kind): State {
  switch (kind) {
    case "heartRate":
      if (value < 50 || value > 110) return "bad";
      if (value < 60 || value > 100) return "mediocre";
      return "good";
    case "sleepTime":
      if (value < 60) return "bad";
      if (value < 80) return "mediocre";
      return "good";
    case "pressure":
      if (value > 155 || value < 105) return "bad";
      if (value > 150 || value < 120) return "mediocre";
      return "good";
  }
}
