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
      <main className="">
        <Movies />
      </main>

      {/* <div className="flex flex-col mt-[51px]">
        <Footer />
      </div> */}
    </div>
  );
}
