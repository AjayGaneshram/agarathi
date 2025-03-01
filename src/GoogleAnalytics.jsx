import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleAnalytics = (trackingId) => {
  const location = useLocation(); // Track route changes

  useEffect(() => {
    if (!window.gtag) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", trackingId, { anonymize_ip: true });
    }

    // Track page views when location changes
    window.gtag("config", trackingId, {
      page_path: location.pathname + location.search,
    });

  }, [trackingId, location]);

};

export default GoogleAnalytics;
