


export default function parseUserAgent(ua) {
    const isMobile = /Mobi|Android/i.test(ua);
    const isTablet = /Tablet|iPad/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    const isWindows = /Windows NT/i.test(ua);
    const isMac = /Macintosh/i.test(ua);
    const isLinux = /Linux/i.test(ua);
    const isBot = /bot|crawl|spider/i.test(ua);
  
    return {
      raw: ua,
      device: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      os: isIOS ? 'iOS' :
          isAndroid ? 'Android' :
          isWindows ? 'Windows' :
          isMac ? 'Mac' :
          isLinux ? 'Linux' :
          'Unknown',
      isBot,
    };
}




  