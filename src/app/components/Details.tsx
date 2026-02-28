// import { getMovieDetail } from "../detail/[movieDetail]/page";
// import { notFound } from "next/navigation";

// type Props = {
//   params: {
//     id: string;
//   };
// };

// export default async function MovieDetailPage({ params }: Props) {
//   const movie = await getMovieDetail(params.id);

//   if (!movie) {
//     notFound();
//   }

//   return (
//     <div className="px-4 md:px-20 py-10">
//       <div className="flex flex-col md:flex-row gap-10">
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           className="w-full md:w-[320px] rounded-xl object-cover"
//         />

//         <div className="flex-1">
//           <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

//           <p className="text-gray-500 mb-4">
//             {movie.release_date?.slice(0, 4)} • ⭐{" "}
//             {movie.vote_average.toFixed(1)}
//           </p>

//           <p className="max-w-xl text-gray-700 leading-relaxed">
//             {movie.overview}
//           </p>

//           <div className="flex gap-2 mt-6 flex-wrap">
//             {movie.genres.map((genre: any) => (
//               <span
//                 key={genre.id}
//                 className="px-3 py-1 text-sm border rounded-full"
//               >
//                 {genre.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
