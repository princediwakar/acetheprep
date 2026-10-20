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
		  source: "/oembed",
		  destination: "/api/oembed",
		},
	  ];
	},
  };
  
  export default nextConfig;