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
		{
		  source: "/practice/:exam(jee-main|neet|cat|gate|upsc-cse|clat|ca-foundation|jee-advanced|upsc-civil-services)",
		  destination: "/practice",
		  permanent: true,
		},
		{
		  source: "/practice/:exam(jee-main|neet|cat|gate|upsc-cse|clat|ca-foundation|jee-advanced|upsc-civil-services)/:path*",
		  destination: "/practice",
		  permanent: true,
		},
		{
		  source: "/insights/:exam(jee-main|neet|cat|gate|upsc-cse|clat|ca-foundation|jee-advanced|upsc-civil-services)",
		  destination: "/insights",
		  permanent: true,
		},
		{
		  source: "/insights/:exam(jee-main|neet|cat|gate|upsc-cse|clat|ca-foundation|jee-advanced|upsc-civil-services)/:path*",
		  destination: "/insights",
		  permanent: true,
		},
		{
		  source: "/blog/:slug(jee-main-physics-formula-traps-revision-guide|physics-of-forgetting-jee-neet|neet-biology-memory-decay-active-recall|upsc-csat-reasoning-speed-drills|cat-quantitative-aptitude-speed-and-remainder-traps)",
		  destination: "/blog",
		  permanent: true,
		},
	  ];
	},
	async rewrites() {
	  return [
		{
		  source: "/oembed",
		  destination: "/api/oembed",
		},
	  ];
	},
  };
  
  export default nextConfig;