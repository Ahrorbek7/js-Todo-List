(()=>{"use strict";let t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{let e;t.g.importScripts&&(e=t.g.location+"");let n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){let i=n.getElementsByTagName("script");i.length&&(e=i[i.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.p;const e={type:"text",name:"name",class:"task-form-input task-name",placeholder:"Task Name"},n={type:"text",onfocus:"(this.type='date')",onmousedown:"(this.type='date')",onblur:"(this.type='text')",name:"due",class:"task-form-input task-due",placeholder:"Due Date"},i={type:"text",name:"description",class:"task-form-input task-description",placeholder:"Task Description"},s={name:"priority",class:"task-form-input task-priority",selected:"Task Priority",options:["High","Medium","Low"]},r={type:"submit",class:"task-form-submit button",value:"Create Task"},o={type:"button",class:"task-form-cancel button",value:"Cancel"};class a{constructor(t,e){this.name=t.name,this.due=t.due,this.description=t.description,this.priority=t.priority,this.id=e,this.completed=!1}}class c{constructor(t,e=[],n=c.assignId()){this.name=t,this.tasks=e,this.id=n}addTask(t){let e=this.tasks.length+1,n=new a(t,e);this.tasks.push(n)}removeTask(t){let e=this.tasks.indexOf(this.findTaskInProject(t));this.tasks.splice(e,1)}updateTaskStatus(t,e){this.findTaskInProject(t).completed=e}findTaskInProject(t){return this.tasks.find((e=>e.id==t))}static assignId(){return d++}}let l=[],d=1;function u(t,e){let n=p(f(t)),i=m(t);n.updateTaskStatus(i,e),localStorage.setItem("projectsListLocal",JSON.stringify(l))}function p(t){return l.find((e=>e.id==t.getAttribute("data-id")))}function f(t){return t.closest(".project")}function m(t){return t.getAttribute("data-id")}const h={divClass:"add-new-task",buttonClass:"new-task-button",buttonText:"+ add task"},k={divClass:"delete-project",buttonClass:"delete-project-button",buttonText:"- remove project"},g={divClass:"details-complete",buttonText:"Mark as finished"},b={divClass:"details-delete",buttonText:"Delete task"};function j(t,e){let n=A("div",t.divClass),i=A("div",t.buttonClass);return i.innerText=t.buttonText,i.addEventListener("click",(()=>{e(i.closest(".project"))})),n.append(i),n}function y(t){confirm("Really delete?")&&(document.querySelector(".projects-list").removeChild(t),function(t){let e=p(t),n=l.indexOf(e);l.splice(n,1),localStorage.setItem("projectsListLocal",JSON.stringify(l))}(t))}function v(t,e){let n=A("li",t.divClass);return n.classList.add("button"),n.innerText=t.buttonText,e(n),n}function T(t){t.addEventListener("click",L)}function L(){let t=this.closest(".project-task");if(t.classList.toggle("checkedoff"),t.classList.contains("checkedoff")){this.innerText="Finished!",u(t,!0);let e=function(t){let e=f(t);if(!p(e).tasks.find((t=>!1===t.completed)))return e}(t);e&&confirm("All tasks complete!  Remove project?")&&y(e)}else this.innerText="Mark as finished",u(t,!1)}function S(t){t.addEventListener("click",x)}function x(){let t=this.closest(".project-task"),e=t.closest(".project-items");confirm("Delete this task?")&&(function(t){let e=p(f(t)),n=m(t);e.removeTask(n),localStorage.setItem("projectsListLocal",JSON.stringify(l))}(t),e.removeChild(t))}function E(t){let a=t.querySelector(".project-items"),c=function(){let t=A("form","task-form"),a=[C(e),C(n),C(i),function(t){let e=document.createElement("select");for(let n in t)if("selected"===n){let i=document.createElement("option");i.setAttribute("selected","selected"),i.setAttribute("value"," "),i.innerText=t[n],e.append(i)}else"options"!==n?e.setAttribute(n,t[n]):t[n].forEach((t=>{let n=document.createElement("option");n.setAttribute("name",t),n.innerText=t,e.append(n)}));return e}(s),C(r),C(o)];for(let e of a)t.append(e);return t}();a.append(c),c.querySelector(".task-form-cancel").addEventListener("click",(()=>{a.removeChild(c)})),c.addEventListener("submit",(e=>{e.preventDefault(),console.log(e);let n=Object.fromEntries(new FormData(e.target).entries());w(t,n),a.removeChild(c)}))}function w(t,e){I(t.querySelector(".project-items"),function(t,e){let n=p(t);return n.addTask(e),localStorage.setItem("projectsListLocal",JSON.stringify(l)),n.tasks.slice(-1)[0]}(t,e))}function I(t,e){let n=function(t){let e=A("li","project-task");e.setAttribute("data-id",t.id),e.innerText=t.name;let n=function(t){let e=A("ul","project-task-details");e.classList.add("hidden");let n=v(g,T),i=v(b,S);e.append(n),e.append(i);const s=["name","id","completed"];for(let n in t)if(!s.includes(n)){let i=A("li","details"),s=n[0].toUpperCase().concat(n.slice(1));if("due"===n){let e=t[n].slice(4,5)+t[n].slice(0,4),r=t[n].slice(6);i.innerText=`${s}: ${r}${e}`}else i.innerText=`${s}: ${t[n]}`;e.append(i)}return e}(t);return e.append(n),e.addEventListener("click",(function(t){t.stopPropagation(),function(t){let e=t.querySelector(".project-task-details");null!=e&&e.classList.toggle("hidden")}(t.target)})),!0===t.completed&&e.classList.add("checkedoff"),e}(e);t.append(n)}function C(t){let e=document.createElement("input");for(let n in t)e.setAttribute(n,t[n]);return e}function A(t,e){let n=document.createElement(t);return n.classList.add(e),n}function O(t){let e=new c(t.name||t,t.tasks,t.id);return function(t){document.querySelector(".projects-list").append(function(t){let e=A("div","project");e.setAttribute("data-id",t.id);let n=function(t){let e=A("div","project-heading"),n=A("h2","project-title");n.innerText=t;let i=A("div","divider");return e.append(n),e.append(i),e}(t.name),i=A("ul","project-items"),s=j(h,E),r=j(k,y);return e.append(n),e.append(i),e.append(s),e.append(r),e}(t))}(e),function(t){l.push(t),localStorage.setItem("projectsListLocal",JSON.stringify(l)),localStorage.setItem("projectIdLocal",d)}(e),e}function D(){O("Make My First Project");let t=document.querySelector(".project");w(t,{name:"Try making a project with a task",due:"2072-01-28",description:"\n    To make a new project, write your project's name in the box in the upper-right corner of the page and then hit the green '+' button.  \n    To add a task to the project, click the '+ add task' button inside the project's box.\n    ",priority:"Medium"}),w(t,{name:"Mark off tasks when they're finished",due:"2072-01-29",description:"\n    Once you've completed a task (like the one above!), check it off by selecting the task to reveal its details, \n    then clicking the 'Mark as finished' button.",priority:"Low"})}document.getElementById("create-project-form").addEventListener("submit",(t=>{t.preventDefault();let e=Object.fromEntries(new FormData(t.target).entries());e.name?O(e.name):O("Unnamed Project"),t.target.reset()})),(()=>{if(function(t){let e;try{e=window.localStorage;let n="__storage_test__";return e.setItem(n,n),e.removeItem(n),!0}catch(t){return t instanceof DOMException&&(22===t.code||1014===t.code||"QuotaExceededError"===t.name||"NS_ERROR_DOM_QUOTA_REACHED"===t.name)&&e&&0!==e.length}}()){let t=localStorage.getItem("projectsListLocal");t?function(t){d=Number(localStorage.getItem("projectIdLocal")),l=JSON.parse(t).map((function(t){return O(t)}));let e=document.querySelectorAll(".project");l.forEach((t=>{let n=Array.from(e).find((e=>e.getAttribute("data-id")==t.id)).querySelector(".project-items");t.tasks.forEach((t=>I(n,t)))}))}(t):D()}else D()})()})();