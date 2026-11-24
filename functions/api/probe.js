const TARGETS = {
  cloudflare: "https://www.cloudflare.com/cdn-cgi/trace",
  google: "https://www.google.com/generate_204",
  ipify: "https://api.ipify.org?format=json",
  ipapi: "https://ipapi.co/json/",
  doh_cloudflare: "https://cloudflare-dns.com/dns-query?name=example.com&type=A",
  doh_google: "https://dns.google/resolve?name=example.com&type=A",
  speed: "https://speed.cloudflare.com/__down?bytes=100000"
};
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store, max-age=0","x-content-type-options":"nosniff"}})}
export async function onRequest({request}){
  if(request.method!=="GET")return json({ok:false,error:"Method not allowed"},405);
  const url=new URL(request.url),target=url.searchParams.get("target")||"cloudflare",destination=TARGETS[target];
  if(!destination)return json({ok:false,error:"Unsupported target",allowedTargets:Object.keys(TARGETS)},400);
  const started=Date.now(),controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);
  try{
    const upstream=await fetch(destination,{method:"GET",redirect:"follow",signal:controller.signal,headers:target.startsWith("doh_")?{accept:"application/dns-json"}:{"user-agent":"VPN-Super-Assistant-Probe/1.1"}});
    let dnsStatus=null,dnsAnswers=null;
    if(target.startsWith("doh_")&&upstream.ok){const dnsResult=await upstream.json();dnsStatus=Number.isInteger(dnsResult.Status)?dnsResult.Status:null;dnsAnswers=Array.isArray(dnsResult.Answer)?dnsResult.Answer.length:0}
    else if(upstream.body){await upstream.body.cancel()}
    const successful=upstream.ok&&(!target.startsWith("doh_")||dnsStatus===0);
    return json({ok:successful,target,upstreamStatus:upstream.status,dnsStatus,dnsAnswers,error:successful?null:(dnsStatus!==null?"DNS query returned a non-zero status":"Upstream returned HTTP "+upstream.status),latencyMs:Date.now()-started,edgeColo:request.cf?.colo||null,country:request.cf?.country||null,checkedAt:new Date().toISOString()},successful?200:502);
  }catch(error){return json({ok:false,target,error:error?.name==="AbortError"?"Upstream timeout":"Upstream request failed",latencyMs:Date.now()-started,edgeColo:request.cf?.colo||null,country:request.cf?.country||null,checkedAt:new Date().toISOString()},502)}
  finally{clearTimeout(timeout)}
}