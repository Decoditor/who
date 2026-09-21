import type {
    MemeCollection,
    MemeTemplate,
} from "@/types/memes";

export const dangoteCollection: MemeCollection = {
    id: "dangote",
    slug: "dangote",
    name: "Dangote",
    description:
        "Create custom Dangote-themed cards for sharing online.",
    seoTitle: "Create Dangote Cards | who.ng",
    seoDescription:
        "Create and share custom Dangote-themed cards with your photo, name and selected details.",
};

export const dangoteTemplates: MemeTemplate[] = [
    {
        id: "dangote-partner",
        slug: "partner",
        collectionId: "dangote",
        name: "Partner",
        description:
            "A clean partner-style card for sharing your connection with the brand.",
        thumbnail: "/memes/dangote/partner.webp",
        renderer: "membership-card",
        featured: true,
        fields: [
            {
                id: "photo",
                label: "Photo",
                type: "image",
                required: true,
            },
            {
                id: "name",
                label: "Name",
                type: "text",
                required: true,
                placeholder: "Enter your name",
            },
            {
                id: "role",
                label: "Role",
                type: "text",
                optional: true,
                placeholder: "e.g. Partner",
            },
            {
                id: "company",
                label: "Company",
                type: "select",
                required: true,
                options: [
                    {
                        label: "Dangote Group",
                        value: "Dangote Group",
                    },
                    {
                        label: "Dangote Refinery",
                        value: "Dangote Refinery",
                    },
                    {
                        label: "Dangote Cement",
                        value: "Dangote Cement",
                    },
                    {
                        label: "Dangote Sugar",
                        value: "Dangote Sugar",
                    },
                ],
            },
        ],
    },

    {
        id: "dangote-shareholder",
        slug: "shareholder",
        collectionId: "dangote",
        name: "Partner & Shareholder",
        description:
            "Create the original Dangote-style partner and shareholder card.",
        thumbnail: "/memes/dangote/shareholder.webp",
        renderer: "membership-card",
        featured: true,
        fields: [
            {
                id: "photo",
                label: "Your photo",
                type: "image",
                required: true,
            },
            {
                id: "name",
                label: "Your name",
                type: "text",
                required: true,
                placeholder: "e.g. Ridwan",
            },
            {
                id: "shares",
                label: "Number of shares",
                type: "number",
                required: true,
                placeholder: "e.g. 10",
            },
            {
                id: "confirmed",
                label: "I have applied / bought shares",
                type: "toggle",
                required: true,
            },
        ],
    },

    {
        id: "dangote-custom",
        slug: "custom",
        collectionId: "dangote",
        name: "Custom Card",
        description:
            "Start with a clean card and choose which details you want to show.",
        thumbnail: "/memes/dangote/custom.webp",
        renderer: "membership-card",
        fields: [
            {
                id: "photo",
                label: "Photo",
                type: "image",
                required: true,
            },
            {
                id: "name",
                label: "Name",
                type: "text",
                required: true,
                placeholder: "Enter your name",
            },
            {
                id: "headline",
                label: "Headline",
                type: "text",
                optional: true,
                placeholder: "e.g. Proud Dangote Partner",
            },
            {
                id: "detail",
                label: "Detail",
                type: "text",
                optional: true,
                placeholder: "e.g. Investing in a stronger Nigeria",
            },
        ],
    },
];