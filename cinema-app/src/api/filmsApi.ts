import axios from 'axios';
import qs from 'qs';

const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
const STRAPI_URL = `${STRAPI_BASE_URL}/api`;

const POPULATE_CONFIG = { populate: ['category', 'poster', 'gallery'] };

const apiClient = axios.create({
  baseURL: STRAPI_URL,
  paramsSerializer: params => qs.stringify(params, { encode: false }),
});

export interface Category {
  id: number;
  documentId: string;
  title: string;
  slug: string;
}

export interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
  formats?: {
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

export interface Film {
  id: number;
  documentId: string;
  title: string;
  description: string;
  shortDescription: string;
  releaseYear: number;
  duration: number;
  rating: number;
  ageLimit: number;
  category: Category;
  poster: Image;
  gallery: Image[];
  trailerUrl: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {};
}

export type FilmResponse = StrapiResponse<Film>;
export type FilmsResponse = StrapiResponse<Film[]>;

export const getFilmById = async (documentId: string): Promise<FilmResponse> => {
  try {
    const response = await apiClient.get(`/films/${documentId}`, { 
      params: POPULATE_CONFIG 
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching film ${documentId}:`, error);
    throw error;
  }
};

export const getFilms = async (params = {}): Promise<FilmsResponse> => {
  try {
    const queryParams = {
      ...POPULATE_CONFIG,
      ...params,
    };
    
    const response = await apiClient.get('/films', { params: queryParams });
    return response.data;
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error;
  }
};
