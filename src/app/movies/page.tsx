import { MovieCard } from "@/components/movie-card";

const movies = [
  {
    title: "Attack on Titan",
    description: "In a world where humanity lives inside cities surrounded by walls due to giant humanoid Titans.",
    imageUrl: "https://via.placeholder.com/300x200?text=Attack+on+Titan"
  },
  {
    title: "Death Note",
    description: "A high school student discovers a supernatural notebook that allows him to kill anyone.",
    imageUrl: "https://via.placeholder.com/300x200?text=Death+Note"
  },
  {
    title: "One Piece",
    description: "Follows the adventures of Monkey D. Luffy and his pirate crew in search of the ultimate treasure.",
    imageUrl: "https://via.placeholder.com/300x200?text=One+Piece"
  },
  {
    title: "Naruto",
    description: "A young ninja dreams of becoming the strongest ninja and leader of his village.",
    imageUrl: "https://via.placeholder.com/300x200?text=Naruto"
  },
  {
    title: "My Hero Academia",
    description: "In a world where most of the population has superpowers, a boy without powers aims to become a hero.",
    imageUrl: "https://via.placeholder.com/300x200?text=My+Hero+Academia"
  },
  {
    title: "Demon Slayer",
    description: "A young boy becomes a demon slayer to avenge his family and cure his sister.",
    imageUrl: "https://via.placeholder.com/300x200?text=Demon+Slayer"
  },
  {
    title: "Fullmetal Alchemist",
    description: "Two brothers use alchemy to restore their bodies after a failed attempt to bring their mother back.",
    imageUrl: "https://via.placeholder.com/300x200?text=Fullmetal+Alchemist"
  },
  {
    title: "Sword Art Online",
    description: "Players are trapped in a virtual reality MMORPG where death in the game means death in real life.",
    imageUrl: "https://via.placeholder.com/300x200?text=Sword+Art+Online"
  },
  {
    title: "Tokyo Ghoul",
    description: "A college student becomes a half-ghoul after a surgery and must hide his new abilities.",
    imageUrl: "https://via.placeholder.com/300x200?text=Tokyo+Ghoul"
  },
  {
    title: "Bleach",
    description: "A teenager gains the powers of a Soul Reaper and must protect the living world from evil spirits.",
    imageUrl: "https://via.placeholder.com/300x200?text=Bleach"
  },
  {
    title: "Dragon Ball Z",
    description: "Goku and his friends defend Earth from powerful villains and otherworldly threats.",
    imageUrl: "https://via.placeholder.com/300x200?text=Dragon+Ball+Z"
  },
  {
    title: "Hunter x Hunter",
    description: "A young boy takes the Hunter Exam to find his father, a legendary Hunter.",
    imageUrl: "https://via.placeholder.com/300x200?text=Hunter+x+Hunter"
  },
  {
    title: "Steins;Gate",
    description: "A group of friends accidentally invent a time machine and must deal with the consequences.",
    imageUrl: "https://via.placeholder.com/300x200?text=Steins+Gate"
  },
  {
    title: "Neon Genesis Evangelion",
    description: "Teenage pilots fight against mysterious beings called Angels using giant mechas.",
    imageUrl: "https://via.placeholder.com/300x200?text=Neon+Genesis+Evangelion"
  },
  {
    title: "Code Geass",
    description: "A prince with the power to command anyone fights against an empire that conquered his country.",
    imageUrl: "https://via.placeholder.com/300x200?text=Code+Geass"
  },
  {
    title: "Fairy Tail",
    description: "A young wizard joins a guild of wizards and goes on adventures with his friends.",
    imageUrl: "https://via.placeholder.com/300x200?text=Fairy+Tail"
  },
  {
    title: "One Punch Man",
    description: "A superhero who can defeat any opponent with a single punch searches for a worthy challenge.",
    imageUrl: "https://via.placeholder.com/300x200?text=One+Punch+Man"
  },
  {
    title: "Black Clover",
    description: "In a world of magic, a boy born without magical powers strives to become the Wizard King.",
    imageUrl: "https://via.placeholder.com/300x200?text=Black+Clover"
  }
];

export default function MoviesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Anime Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            description={movie.description}
            imageUrl={movie.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
