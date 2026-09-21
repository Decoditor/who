import { toPng } from "html-to-image";

const DEFAULT_FILE_NAME = "who-ng-card.png";

async function waitForImages(element: HTMLElement) {
    const images = Array.from(
        element.querySelectorAll("img"),
    );

    await Promise.all(
        images.map(async (image) => {
            if (!image.complete) {
                await new Promise<void>((resolve) => {
                    image.addEventListener("load", () => resolve(), {
                        once: true,
                    });

                    image.addEventListener("error", () => resolve(), {
                        once: true,
                    });
                });
            }

            try {
                await image.decode();
            } catch {
                // The image may already be decoded or unavailable.
            }
        }),
    );
}

async function createCardImage(element: HTMLElement) {
    await waitForImages(element);

    return toPng(element, {
        pixelRatio: 2,
        cacheBust: true,
    });
}

export async function downloadMemeCard(
    element: HTMLElement,
    fileName = DEFAULT_FILE_NAME,
) {
    const dataUrl = await createCardImage(element);

    const link = document.createElement("a");

    link.download = fileName;
    link.href = dataUrl;

    document.body.appendChild(link);
    link.click();
    link.remove();
}

export async function shareMemeCard(
    element: HTMLElement,
    shareText: string,
    fileName = DEFAULT_FILE_NAME,
) {
    if (!navigator.share) {
        return false;
    }

    const dataUrl = await createCardImage(element);
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    const file = new File(
        [blob],
        fileName,
        { type: "image/png" },
    );

    if (
        navigator.canShare &&
        !navigator.canShare({ files: [file] })
    ) {
        return false;
    }

    await navigator.share({
        text: shareText,
        files: [file],
    });

    return true;
}