type Genre = {
    id: number;
    name: string;
}
type ProductionCompanies = {
    id: number;
    name: string;
    logo_path: string|null;
    origin_country: string;
}
type ProductionCountries = {
    iso_3166_1: string;
    name:string;
}
type SpokenLanguages = {
    english_name: string;
    iso_639_1: string;
    name: string;
}
type MediaProps = {
        adult: boolean;
        backdrop_path: string;
        belongs_to_collection: [] | null;
        biography?: string;
        birthday?: string;
        budget: number;
        genres: Genre[] | null;
        homepage: string;
        id: number;
        imdb_id: string;
        original_language:string;
        name?: string;
        original_title?: string; 
        overview: string;
        popularity: number;
        poster_path: string;
        profile_path?: string;
        production_companies: ProductionCompanies[] | null;
        production_countries: ProductionCountries[] | null;
        release_date?: string;
        first_air_date?: string;
        revenue: number;
        runtime?: number;
        episode_run_time?: number[];
        spoken_languages: SpokenLanguages[] | null;
        status: string;
        tagline: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
}
type results = {
    adult: boolean;
    gender?: number;
    known_for?: fetchedDataProps[];
    known_for_department?:string;
    backdrop_path: string;
    genre_ids:number[];
    first_air_date?: string;
    media_type?: string;
    id: number
    original_language: string
    original_title?: string
    original_name?: string
    name?:string
    overview: string
    popularity: number
    poster_path:string | null;
    release_date:string;
    title:string;
    video: boolean;
    vote_average: number;
    vote_count:number;
    profile_path:string | null;
}
type fetchedDataProps = {
    page: number;
    results: results[];
    total_pages: number;
    total_results: number;
}