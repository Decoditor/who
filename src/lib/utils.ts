const DEVICE_KEY = "who-ng-device-id";

function createDeviceId() {
    const values = [
        navigator.userAgent,
        navigator.language,
        screen.width,
        screen.height,
        screen.colorDepth,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    ];

    const value = values.join("|");

    let hash = 0;

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash << 5) - hash + value.charCodeAt(index);
        hash |= 0;
    }

    return `device-${Math.abs(hash)}`;
}

export function getDeviceId() {
    const existing = localStorage.getItem(DEVICE_KEY);

    if (existing) {
        return existing;
    }

    const deviceId = createDeviceId();

    localStorage.setItem(DEVICE_KEY, deviceId);

    return deviceId;
}