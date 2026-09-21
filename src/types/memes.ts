export type MemeFieldType =
    | "text"
    | "number"
    | "image"
    | "select"
    | "toggle";

export type MemeRenderer = "membership-card" | "poster";

export interface MemeFieldOption {
    label: string;
    value: string;
}

export interface MemeField {
    id: string;
    label: string;
    type: MemeFieldType;
    required?: boolean;
    optional?: boolean;
    placeholder?: string;
    options?: MemeFieldOption[];
}

export interface MemeCollection {
    id: string;
    slug: string;
    name: string;
    description: string;
    coverImage?: string;
    seoTitle?: string;
    seoDescription?: string;
}

export interface MemeTemplate {
    id: string;
    slug: string;
    collectionId: string;
    name: string;
    description: string;
    thumbnail: string;
    backgroundImage?: string;
    renderer: MemeRenderer;
    fields: MemeField[];
    featured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
}

export interface MemeDraft {
    templateId: string;
    values: Record<string, string | number | boolean>;
}