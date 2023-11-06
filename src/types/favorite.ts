import { Repository } from "./github";

export type Favorite = Repository & {
  rating?: number;
};
