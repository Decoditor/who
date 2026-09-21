import { toPng } from "html-to-image";

const DEFAULT_FILE_NAME = "who-ng-my-pick.png";

async function createEndorsementImage(
    element: HTMLElement,
) {
    return toPng(element, {
        pixelRatio: 2,
        cacheBust: true,
    });
}

export async function downloadEndorsementCard(
    element: HTMLElement,
    fileName = DEFAULT_FILE_NAME,
) {
    const dataUrl = await createEndorsementImage(element);

    const link = document.createElement("a");

    link.download = fileName;
    link.href = dataUrl;
    link.click();
}

export async function shareEndorsementCard(
    element: HTMLElement,
    shareText: string,
    fileName = DEFAULT_FILE_NAME,
) {
    if (!navigator.share) {
        return false;
    }

    const dataUrl = await createEndorsementImage(element);

    const response = await fetch(dataUrl);
    const blob = await response.blob();

    const file = new File([blob], fileName, {
        type: "image/png",
    });

    if (!navigator.canShare?.({ files: [file] })) {
        return false;
    }

    await navigator.share({
        text: shareText,
        files: [file],
    });

    return true;
}

export async function copyShareLink(url: string) {
    await navigator.clipboard.writeText(url);
}