/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	devIndicators: false,
	/* config options here */
	images: {
	  remotePatterns: [
		{
		  protocol: "https",
		  hostname: "**",
		},
	  ],
	},
		async redirects() {
	  return [
		{
		  source: "/dashboard",
		  destination: "/home",
		  permanent: true,
		},
	  ];
	},
	async rewrites() {
	  return [
		{
		  source: "/ingest/static/:path*",
		  destination: "https://us-assets.i.posthog.com/static/:path*",
		},
		{
		  source: "/ingest/:path*",
		  destination: "https://us.i.posthog.com/:path*",
		},
		{
		  source: "/ingest/decide",
		  destination: "https://us.i.posthog.com/decide",
		},
		{
		  source: "/oembed",
		  destination: "/api/oembed",
		},
		{
		  source: "/sitemap-static.xml",
		  destination: "/sitemap-static",
		},
		{
		  source: "/sitemap-blog.xml",
		  destination: "/sitemap-blog",
		},
		{
		  source: "/sitemap-practice.xml",
		  destination: "/sitemap-practice/1",
		},
		{
		  source: "/sitemap-practice/:id.xml",
		  destination: "/sitemap-practice/:id",
		},
		{
		  source: "/sitemap-insights.xml",
		  destination: "/sitemap-insights/1",
		},
		{
		  source: "/sitemap-insights/:id.xml",
		  destination: "/sitemap-insights/:id",
		},
		{
		  source: "/sitemap-questions.xml",
		  destination: "/sitemap-questions/1",
		},
		{
		  source: "/sitemap-questions/:id.xml",
		  destination: "/sitemap-questions/:id",
		},
		{
		  source: "/sitemap-quizzes.xml",
		  destination: "/sitemap-quizzes/1",
		},
		{
		  source: "/sitemap-quizzes/:id.xml",
		  destination: "/sitemap-quizzes/:id",
		},
	  ];
	},
  };
  
  export default nextConfig;