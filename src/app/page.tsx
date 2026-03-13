import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Movies } from "./components/Movies";
export type Movie = {
  title: string;
  poster: string;
  rating: number;
};

export default function Home() {
  return (
    <div className="flex flex-col ">
   
  
   
<main className="w-full max-w-[1440px] mx-auto px-0 md:px-10 overflow-x-hidden">
  <Movies />
</main>

    </div>
  );
}
