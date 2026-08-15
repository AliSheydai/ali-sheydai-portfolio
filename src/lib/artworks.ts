import imgPerfume from "@/assets/projects/perfume.png";
import imgLeganes from "@/assets/projects/leganes.png";
import imgCoffeeShop from "@/assets/projects/coffee-shop.png";
import imgPortfolio from "@/assets/projects/portfolio.png";
import imgTodoApp2 from "@/assets/projects/todo-app-2.png";
import imgTodoApp1 from "@/assets/projects/todo-app-1.png";
import imgSpotifyClone from "@/assets/projects/spotify-clone.png";
import imgWeatherDashboard from "@/assets/projects/weather-dashboard.png";
import imgPostman from "@/assets/projects/postman.png";
import imgDadegard from "@/assets/projects/dadegard.png";
import imgMikrosazeh from "@/assets/projects/mikrosazeh.png";

export interface Artwork {
  id: number;
  slug: string;
  title: string;
  description: string;
  medium: string;
  dimensions: string;
  year: string;
  w: number;
  h: number;
  image: string;
  link?: string;
}

export const artworks: Artwork[] = [
  { id: 10, slug: "dadegard", title: "Dadegard", description: "A brand identity and web project for Dadegard.", medium: "Digital design", dimensions: "1536 × 1024", year: "2024", w: 1536, h: 1024, image: imgDadegard, link: "https://dadegard.vercel.app/" },
  { id: 9, slug: "postman", title: "Postman", description: "API testing and development tool interface.", medium: "Web application", dimensions: "1536 × 1024", year: "2023", w: 1536, h: 1024, image: imgPostman, link: "https://postman-clone-virid.vercel.app/" },
  { id: 11, slug: "mikrosazeh", title: "Mikrosazeh", description: "React UI library.", medium: "Digital design", dimensions: "1536 × 1024", year: "2024", w: 1536, h: 1024, image: imgMikrosazeh, link: "https://mikrosazeh.vercel.app/" },
  { id: 8, slug: "weather-dashboard", title: "Weather Dashboard", description: "A real-time weather dashboard with clean data visualization.", medium: "Web application", dimensions: "1536 × 1024", year: "2023", w: 1536, h: 1024, image: imgWeatherDashboard, link: "https://weather-dashboard-psi-amber.vercel.app/" },
  { id: 7, slug: "spotify-clone", title: "Spotify Clone", description: "A Spotify-inspired music streaming interface.", medium: "Web application", dimensions: "1536 × 1024", year: "2023", w: 1536, h: 1024, image: imgSpotifyClone, link: "https://music-spotify-h.vercel.app/" },
  { id: 3, slug: "coffee-shop", title: "Coffee Shop", description: "A cozy coffee shop brand identity and web presence.", medium: "Digital design", dimensions: "1536 × 1024", year: "2024", w: 1536, h: 1024, image: imgCoffeeShop, link: "https://coffee-shop-delta-sage.vercel.app/" },
  { id: 6, slug: "todo-app-1", title: "Todo App v1", description: "A minimalist task management application.", medium: "Web application", dimensions: "1536 × 1024", year: "2023", w: 1536, h: 1024, image: imgTodoApp1, link: "https://shadcn-todo-app-tau.vercel.app/" },
  { id: 5, slug: "todo-app-2", title: "Todo App v2", description: "An improved task management application.", medium: "Web application", dimensions: "1536 × 1024", year: "2024", w: 1536, h: 1024, image: imgTodoApp2, link: "https://todo-app-sigma-two-63.vercel.app/" },
  { id: 2, slug: "leganes", title: "Leganes", description: "Branding and visual system for Leganes.", medium: "Digital design", dimensions: "1536 × 1024", year: "2024", w: 1536, h: 1024, image: imgLeganes, link: "https://leganes.vercel.app/" },
  { id: 1, slug: "perfume", title: "Perfume", description: "A refined visual identity for a perfume brand.", medium: "Digital design", dimensions: "1536 × 1024", year: "2024", w: 1536, h: 1024, image: imgPerfume, link: "https://perfume-online-store-liard.vercel.app/" },
  { id: 4, slug: "portfolio", title: "Portfolio", description: "A personal portfolio website design.", medium: "Digital design", dimensions: "1536 × 1024", year: "2024", w: 1536, h: 1024, image: imgPortfolio, link: "https://portfolio-ruddy-tau-23.vercel.app/" },
];

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getAdjacentArtworks(slug: string): { prev: Artwork | null; next: Artwork | null } {
  const index = artworks.findIndex((a) => a.slug === slug);
  return {
    prev: index > 0 ? artworks[index - 1] : null,
    next: index < artworks.length - 1 ? artworks[index + 1] : null,
  };
}
