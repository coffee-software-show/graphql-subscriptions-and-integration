(()=>{"use strict";function e(e){return null===e?"null":Array.isArray(e)?"array":typeof e}function o(o){return"object"===e(o)}function t(e,o){return e.length<124?e:o}const r="graphql-transport-ws";var n,i;function a(t){if(!o(t))throw new Error(`Message is expected to be an object, but got ${e(t)}`);if(!t.type)throw new Error("Message is missing the 'type' property");if("string"!=typeof t.type)throw new Error(`Message is expects the 'type' property to be a string, but got ${e(t.type)}`);switch(t.type){case i.ConnectionInit:case i.ConnectionAck:case i.Ping:case i.Pong:if("payload"in t&&!o(t.payload))throw new Error(`"${t.type}" message expects the 'payload' property to be an object or missing, but got "${t.payload}"`);break;case i.Subscribe:if("string"!=typeof t.id)throw new Error(`"${t.type}" message expects the 'id' property to be a string, but got ${e(t.id)}`);if(!t.id)throw new Error(`"${t.type}" message requires a non-empty 'id' property`);if(!o(t.payload))throw new Error(`"${t.type}" message expects the 'payload' property to be an object, but got ${e(t.payload)}`);if("string"!=typeof t.payload.query)throw new Error(`"${t.type}" message payload expects the 'query' property to be a string, but got ${e(t.payload.query)}`);if(null!=t.payload.variables&&!o(t.payload.variables))throw new Error(`"${t.type}" message payload expects the 'variables' property to be a an object or nullish or missing, but got ${e(t.payload.variables)}`);if(null!=t.payload.operationName&&"string"!==e(t.payload.operationName))throw new Error(`"${t.type}" message payload expects the 'operationName' property to be a string or nullish or missing, but got ${e(t.payload.operationName)}`);if(null!=t.payload.extensions&&!o(t.payload.extensions))throw new Error(`"${t.type}" message payload expects the 'extensions' property to be a an object or nullish or missing, but got ${e(t.payload.extensions)}`);break;case i.Next:if("string"!=typeof t.id)throw new Error(`"${t.type}" message expects the 'id' property to be a string, but got ${e(t.id)}`);if(!t.id)throw new Error(`"${t.type}" message requires a non-empty 'id' property`);if(!o(t.payload))throw new Error(`"${t.type}" message expects the 'payload' property to be an object, but got ${e(t.payload)}`);break;case i.Error:if("string"!=typeof t.id)throw new Error(`"${t.type}" message expects the 'id' property to be a string, but got ${e(t.id)}`);if(!t.id)throw new Error(`"${t.type}" message requires a non-empty 'id' property`);if(r=t.payload,!(Array.isArray(r)&&r.length>0&&r.every((e=>"message"in e))))throw new Error(`"${t.type}" message expects the 'payload' property to be an array of GraphQL errors, but got ${JSON.stringify(t.payload)}`);break;case i.Complete:if("string"!=typeof t.id)throw new Error(`"${t.type}" message expects the 'id' property to be a string, but got ${e(t.id)}`);if(!t.id)throw new Error(`"${t.type}" message requires a non-empty 'id' property`);break;default:throw new Error(`Invalid message 'type' property "${t.type}"`)}var r;return t}function s(e,o){return a(e),JSON.stringify(e,o)}function c(e){return o(e)&&"code"in e&&"reason"in e}!function(e){e[e.InternalServerError=4500]="InternalServerError",e[e.InternalClientError=4005]="InternalClientError",e[e.BadRequest=4400]="BadRequest",e[e.BadResponse=4004]="BadResponse",e[e.Unauthorized=4401]="Unauthorized",e[e.Forbidden=4403]="Forbidden",e[e.SubprotocolNotAcceptable=4406]="SubprotocolNotAcceptable",e[e.ConnectionInitialisationTimeout=4408]="ConnectionInitialisationTimeout",e[e.ConnectionAcknowledgementTimeout=4504]="ConnectionAcknowledgementTimeout",e[e.SubscriberAlreadyExists=4409]="SubscriberAlreadyExists",e[e.TooManyInitialisationRequests=4429]="TooManyInitialisationRequests"}(n||(n={})),function(e){e.ConnectionInit="connection_init",e.ConnectionAck="connection_ack",e.Ping="ping",e.Pong="pong",e.Subscribe="subscribe",e.Next="next",e.Error="error",e.Complete="complete"}(i||(i={})),window.addEventListener("load",(function(){const e=function(e){const{url:o,connectionParams:l,lazy:p=!0,onNonLazyError:d=console.error,lazyCloseTimeout:y=0,keepAlive:u=0,disablePong:g,connectionAckWaitTimeout:m=0,retryAttempts:f=5,retryWait:b=async function(e){let o=1e3;for(let t=0;t<e;t++)o*=2;await new Promise((e=>setTimeout(e,o+Math.floor(2700*Math.random()+300))))},shouldRetry:w=c,isFatalConnectionProblem:h,on:x,webSocketImpl:E,generateID:v=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(e=>{const o=16*Math.random()|0;return("x"==e?o:3&o|8).toString(16)}))},jsonMessageReplacer:S,jsonMessageReviver:C}=e;let $;if(E){if(!("function"==typeof(k=E)&&"constructor"in k&&"CLOSED"in k&&"CLOSING"in k&&"CONNECTING"in k&&"OPEN"in k))throw new Error("Invalid WebSocket implementation provided");$=E}else"undefined"!=typeof WebSocket?$=WebSocket:"undefined"!=typeof global?$=global.WebSocket||global.MozWebSocket:"undefined"!=typeof window&&($=window.WebSocket||window.MozWebSocket);var k;if(!$)throw new Error("WebSocket implementation missing; on Node you can `import WebSocket from 'ws';` and pass `webSocketImpl: WebSocket` to `createClient`");const N=$,I=(()=>{const e=(()=>{const e={};return{on:(o,t)=>(e[o]=t,()=>{delete e[o]}),emit(o){var t;"id"in o&&(null===(t=e[o.id])||void 0===t||t.call(e,o))}}})(),o={connecting:(null==x?void 0:x.connecting)?[x.connecting]:[],opened:(null==x?void 0:x.opened)?[x.opened]:[],connected:(null==x?void 0:x.connected)?[x.connected]:[],ping:(null==x?void 0:x.ping)?[x.ping]:[],pong:(null==x?void 0:x.pong)?[x.pong]:[],message:(null==x?void 0:x.message)?[e.emit,x.message]:[e.emit],closed:(null==x?void 0:x.closed)?[x.closed]:[],error:(null==x?void 0:x.error)?[x.error]:[]};return{onMessage:e.on,on(e,t){const r=o[e];return r.push(t),()=>{r.splice(r.indexOf(t),1)}},emit(e,...t){for(const r of[...o[e]])r(...t)}}})();function T(e){const o=[I.on("error",(t=>{o.forEach((e=>e())),e(t)})),I.on("closed",(t=>{o.forEach((e=>e())),e(t)}))]}let q,A,P=0,M=!1,O=0,R=!1;async function W(){clearTimeout(A);const[e,p]=await(null!=q?q:q=new Promise(((e,p)=>(async()=>{if(M){if(await b(O),!P)return q=void 0,p({code:1e3,reason:"All Subscriptions Gone"});O++}I.emit("connecting");const d=new N("function"==typeof o?await o():o,r);let y,f;function w(){isFinite(u)&&u>0&&(clearTimeout(f),f=setTimeout((()=>{d.readyState===N.OPEN&&(d.send(s({type:i.Ping})),I.emit("ping",!1,void 0))}),u))}T((e=>{q=void 0,clearTimeout(y),clearTimeout(f),p(e),c(e)&&4499===e.code&&(d.close(4499,"Terminated"),d.onerror=null,d.onclose=null)})),d.onerror=e=>I.emit("error",e),d.onclose=e=>I.emit("closed",e),d.onopen=async()=>{try{I.emit("opened",d);const e="function"==typeof l?await l():l;if(d.readyState!==N.OPEN)return;d.send(s(e?{type:i.ConnectionInit,payload:e}:{type:i.ConnectionInit},S)),isFinite(m)&&m>0&&(y=setTimeout((()=>{d.close(n.ConnectionAcknowledgementTimeout,"Connection acknowledgement timeout")}),m)),w()}catch(e){I.emit("error",e),d.close(n.InternalClientError,t(e instanceof Error?e.message:new Error(e).message,"Internal client error"))}};let h=!1;d.onmessage=({data:o})=>{try{const t=function(e,o){return a("string"==typeof e?JSON.parse(e,o):e)}(o,C);if(I.emit("message",t),"ping"===t.type||"pong"===t.type)return I.emit(t.type,!0,t.payload),void("pong"===t.type?w():g||(d.send(s(t.payload?{type:i.Pong,payload:t.payload}:{type:i.Pong})),I.emit("pong",!1,t.payload)));if(h)return;if(t.type!==i.ConnectionAck)throw new Error(`First message cannot be of type ${t.type}`);clearTimeout(y),h=!0,I.emit("connected",d,t.payload),M=!1,O=0,e([d,new Promise(((e,o)=>T(o)))])}catch(e){d.onmessage=null,I.emit("error",e),d.close(n.BadResponse,t(e instanceof Error?e.message:new Error(e).message,"Bad response"))}}})())));e.readyState===N.CLOSING&&await p;let d=()=>{};const f=new Promise((e=>d=e));return[e,d,Promise.race([f.then((()=>{if(!P){const o=()=>e.close(1e3,"Normal Closure");isFinite(y)&&y>0?A=setTimeout((()=>{e.readyState===N.OPEN&&o()}),y):o()}})),p])]}function j(e){if(c(e)&&(o=e.code,![1e3,1001,1006,1005,1012,1013,1013].includes(o)&&o>=1e3&&o<=1999||[n.InternalServerError,n.InternalClientError,n.BadRequest,n.BadResponse,n.Unauthorized,n.SubprotocolNotAcceptable,n.SubscriberAlreadyExists,n.TooManyInitialisationRequests].includes(e.code)))throw e;var o;if(R)return!1;if(c(e)&&1e3===e.code)return P>0;if(!f||O>=f)throw e;if(!w(e))throw e;if(null==h?void 0:h(e))throw e;return M=!0}return p||(async()=>{for(P++;;)try{const[,,e]=await W();await e}catch(e){try{if(!j(e))return}catch(e){return null==d?void 0:d(e)}}})(),{on:I.on,subscribe(e,o){const t=v(e);let r=!1,n=!1,a=()=>{P--,r=!0};return(async()=>{for(P++;;)try{const[c,l,p]=await W();if(r)return l();const d=I.onMessage(t,(e=>{switch(e.type){case i.Next:return void o.next(e.payload);case i.Error:return n=!0,r=!0,o.error(e.payload),void a();case i.Complete:return r=!0,void a()}}));return c.send(s({id:t,type:i.Subscribe,payload:e},S)),a=()=>{r||c.readyState!==N.OPEN||c.send(s({id:t,type:i.Complete},S)),P--,r=!0,l()},void await p.finally(d)}catch(e){if(!j(e))return}})().then((()=>{n||o.complete()})).catch((e=>{o.error(e)})),()=>{r||a()}},async dispose(){if(R=!0,q){const[e]=await q;e.close(1e3,"Normal Closure")}},terminate(){q&&I.emit("closed",{code:4499,reason:"Terminated",wasClean:!1})}}}({url:"ws://localhost:8080/graphql"});e.subscribe({query:'query { hello( name: "World") { message } }'},{next:e=>console.log("query result: ",e.data.hello),error:e=>console.error(e),complete:()=>console.log("done with query!")}),e.subscribe({query:"subscription { files { path } }"},{next:e=>{console.log(e.data.files)},error:e=>{console.log("oops! we got an error!")},complete:e=>{console.log("we're done!")}})}))})();