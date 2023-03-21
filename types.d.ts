type Location = {
  name: string;
  url: string;
};
type Info = {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
};
type Result = {
  id: number;
  name: string;
  status: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
};
type Data = {
  info: Info;
  results: Result[];
};
