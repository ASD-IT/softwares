import { Lobster_Two, Lusitana } from "next/font/google";

export const lobsterTwo = Lobster_Two({
  subsets: ["latin"], // You can choose the character sets you need
  weight: ["400", "700"], // Specify the weights you need
  style: ["normal", "italic"], // Optionally include italic style if needed
});

export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
