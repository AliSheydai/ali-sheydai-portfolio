// ---------------------------------------------------------------------------
// Image manifest — single source of truth for all images that need preloading
// ---------------------------------------------------------------------------

// Hero section images
import imgDadegard_1 from "@/assets/hero-images/hero-dadegard-1.png";
import imgDadegard_2 from "@/assets/hero-images/hero-dadegard-2.png";
import imgDadegard_3 from "@/assets/hero-images/hero-dadegard-3.png";
import imgPostman_1 from "@/assets/hero-images/hero-postman-1.png";
import imgSpotify_1 from "@/assets/hero-images/hero-spotify-1.png";
import imgMikrosazeh_1 from "@/assets/hero-images/hero-mikrosazeh-1.png";
import imgMikrosazeh_2 from "@/assets/hero-images/hero-mikrosazeh-2.png";
import imgMikrosazeh_3 from "@/assets/hero-images/hero-mikrosazeh-3.png";
import imgWeather_1 from "@/assets/hero-images/hero-weather-1.png";
import imgWeather_2 from "@/assets/hero-images/hero-weather-2.png";
import imgWeather_3 from "@/assets/hero-images/hero-weather-3.png";

// Gallery/project images
import imgDadegard from "@/assets/projects/dadegard.png";
import imgPostman from "@/assets/projects/postman.png";
import imgMikrosazeh from "@/assets/projects/mikrosazeh.png";
import imgWeatherDashboard from "@/assets/projects/weather-dashboard.png";
import imgSpotifyClone from "@/assets/projects/spotify-clone.png";
import imgCoffeeShop from "@/assets/projects/coffee-shop.png";
import imgTodoApp1 from "@/assets/projects/todo-app-1.png";
import imgTodoApp2 from "@/assets/projects/todo-app-2.png";
import imgLeganes from "@/assets/projects/leganes.png";
import imgPerfume from "@/assets/projects/perfume.png";
import imgPortfolio from "@/assets/projects/portfolio.png";

/**
 * High-priority images — loaded first.
 * These are the first visible images in both the hero grid and the gallery.
 */
export const PRIORITY_IMAGES: string[] = [
  // First 3 gallery items (visible immediately)
  imgDadegard,
  imgPostman,
  imgMikrosazeh,
  // First 3 hero grid images
  imgDadegard_1,
  imgDadegard_3,
  imgMikrosazeh_2,
];

/**
 * Deferred images — loaded in the background after the preloader exits.
 */
export const DEFERRED_IMAGES: string[] = [
  imgWeatherDashboard,
  imgSpotifyClone,
  imgCoffeeShop,
  imgTodoApp1,
  imgTodoApp2,
  imgLeganes,
  imgPerfume,
  imgPortfolio,
  imgDadegard_2,
  imgPostman_1,
  imgSpotify_1,
  imgMikrosazeh_1,
  imgMikrosazeh_3,
  imgWeather_1,
  imgWeather_2,
  imgWeather_3,
];

export const ALL_IMAGES: string[] = [...PRIORITY_IMAGES, ...DEFERRED_IMAGES];
