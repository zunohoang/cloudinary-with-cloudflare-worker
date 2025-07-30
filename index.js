export default {
  async fetch(request) {
    const url = new URL(request.url);
    const imagePath = url.pathname.replace(/^\/+/, ''); 

    const cloudName = "dnzs0acua";  
    const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${imagePath}`;

    // Gửi request tới Cloudinary
    const res = await fetch(cloudinaryUrl, {
      headers: {
        'User-Agent': request.headers.get('User-Agent') || '',
      }
    });

    // Cache trong 10 ngày (86400 * 10 = 864000 giây)
    const headers = new Headers(res.headers);
    headers.set("Cache-Control", "public, max-age=864000");

    return new Response(res.body, {
      status: res.status,
      headers
    });
  }
}
