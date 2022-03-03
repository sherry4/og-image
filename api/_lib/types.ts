export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    userName?: string;
    userPhotoURL?: string;
    description?: string;
    country?: number;
    region?: number;
    checkin?: number;
    story?: number;
    thumbnailURL?: string;
    travelMapPhotoURL?: string;
}
