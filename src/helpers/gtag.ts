export const GA_TRACKING_ID = "G-3M4G879PC8";

export const pageview = (url: string) => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, params }: { action: string; params: any }) => {
  (window as any).gtag("event", action, params);
};
