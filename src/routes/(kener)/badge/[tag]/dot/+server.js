// @ts-nocheck
import { GetMonitors } from "$lib/server/controllers/controller.js";
import StatusColor from "$lib/color.js";
import { makeBadge } from "badge-maker";
import db from "$lib/server/db/db.js";

export async function GET({ params, setHeaders, url }) {
  // @ts-ignore
  let monitors = await GetMonitors({ status: "ACTIVE" });
  const { tag } = monitors.find((monitor) => monitor.tag === params.tag);
  const lastObj = await db.getLatestMonitoringData(tag);
  //read query params
  const query = url.searchParams;
  const animate = query.get("animate") || "";
  let myColors = await StatusColor();
  let svg = `
	<svg width="32" height="32"  xmlns="http://www.w3.org/2000/svg">
		<circle cx="16" cy="16" r="8" fill="${myColors[lastObj.status]}" />
	</svg>
	`;
  if (animate == "ping") {
    svg = `
	<svg width="32" height="32"  xmlns="http://www.w3.org/2000/svg">
		<circle cx="16" cy="16" r="8" fill="${myColors[lastObj.status]}" opacity="0.5">
			<animate 
				attributeName="r" 
				from="8" 
				to="16" 
				dur="1s" 
				repeatCount="indefinite" />
			<animate 
				attributeName="opacity" 
				from="0.5" 
				to="0" 
				dur="1s" 
				repeatCount="indefinite" />
		</circle>
		<circle cx="16" cy="16" r="8" fill="${myColors[lastObj.status]}" />
</svg>
	`;
  }

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
