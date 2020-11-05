export type ListUser = {
  login: string;
  avatar_url: string;
};

export type UserGithub = {
  login: string;
  avatar_url: string;
  name: string;
  email: string;
  location: string;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
};

export type Repository = {
  name: string;
  full_name: string;
  language: string;
};
