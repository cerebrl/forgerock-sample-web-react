declare const expectedJsdom: {
    identifier: string;
    metadata: {
        hardware: {
            display: {
                width: number;
                height: number;
                pixelDepth: number;
                angle: string;
            };
            cpuClass: any;
            deviceMemory: any;
            hardwareConcurrency: number;
            maxTouchPoints: any;
            oscpu: any;
        };
        browser: {
            appName: string;
            userAgent: string;
            appCodeName: string;
            appVersion: string;
            appMinorVersion: any;
            buildID: any;
            product: string;
            productSub: string;
            vendor: string;
            vendorSub: string;
            browserLanguage: any;
            plugins: string;
        };
        platform: {
            deviceName: string;
            fonts: string;
            language: string;
            platform: string;
            userLanguage: any;
            systemLanguage: any;
            timezone: number;
        };
    };
};
declare const expectedJsdomWithoutDisplay: {
    identifier: string;
    metadata: {
        hardware: {
            display: {};
            cpuClass: any;
            deviceMemory: any;
            hardwareConcurrency: number;
            maxTouchPoints: any;
            oscpu: any;
        };
        browser: {
            appName: string;
            userAgent: string;
            appCodeName: string;
            appVersion: string;
            appMinorVersion: any;
            buildID: any;
            product: string;
            productSub: string;
            vendor: string;
            vendorSub: string;
            browserLanguage: any;
            plugins: string;
        };
        platform: {
            deviceName: string;
            fonts: string;
            language: string;
            platform: string;
            userLanguage: any;
            systemLanguage: any;
            timezone: number;
        };
    };
};
declare const expectedJsdomWithNarrowedBrowserProps: {
    identifier: string;
    metadata: {
        hardware: {
            display: {
                width: number;
                height: number;
                pixelDepth: number;
                angle: string;
            };
            cpuClass: any;
            deviceMemory: any;
            hardwareConcurrency: number;
            maxTouchPoints: any;
            oscpu: any;
        };
        browser: {
            userAgent: string;
            plugins: string;
        };
        platform: {
            deviceName: string;
            fonts: string;
            language: string;
            platform: string;
            userLanguage: any;
            systemLanguage: any;
            timezone: number;
        };
    };
};
export { expectedJsdom, expectedJsdomWithoutDisplay, expectedJsdomWithNarrowedBrowserProps };
