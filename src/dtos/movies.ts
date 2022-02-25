export interface CreateMovieDTO {
    title: string;
    poster?: string;
    synopsis?: string;
    releaser_year: string;
}

export interface ResultMovieDTO {
    id: string;
    title: string;
    poster?: string;
    synopsis?: string;
    release_year: string;
}
