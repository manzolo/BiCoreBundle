(self.webpackChunk=self.webpackChunk||[]).push([[401],{3627:(e,n,i)=>{"use strict";i(5881),i(3210);var t=i(1369),a=i.n(t),o=(i(9070),i(2046)),r=i(6547),l=i(9755);function c(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}const s=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,i,t;return n=e,t=[{key:"eseguicomando",value:function(e,n,i){i=i||{},a().confirm({message:e,buttons:{cancel:{className:"btn-secondary biconfirmno",label:'<i class="fas fa-times"></i> Annulla'},confirm:{className:"btn-primary biconfirmyes",label:'<i class="fas fa-check"></i> Si'}},callback:function(e){e&&(o.Z.show(),l.ajax({url:n,data:i}).done((function(e){var n=l("<div>").attr("role","alert").attr("class","alert alert-success alert-dismissible fade show");n.html("<strong>Operazione conclusa</strong>"),a().alert({size:"large",message:l.merge(n,r.Z.showMessaggi(e)),buttons:{ok:{className:"btn btn-primary biconfirmok",label:'<i class="fas fa-check"></i> Ok'}}}),o.Z.hide()})).fail((function(e,n){var i=l("<div>").attr("role","alert").attr("class","alert alert-warning alert-dismissible fade show");i.html("<strong>Si è verificato un errore</strong>"),a().alert({size:"large",closeButton:!1,message:l.merge(i,r.Z.showErrori(e.responseText))}),o.Z.hide()})))}})}}],(i=null)&&c(n.prototype,i),t&&c(n,t),e}();var u=i(9755);u(document).ready((function(){u("#adminpanelcc").click((function(){s.eseguicomando("Vuoi pulire tutte le cache?",Routing.generate("fi_pannello_amministrazione_clearcache"))})),u("#adminpanelvcs").click((function(){var e="Vuoi prendere l'ultima versione dei sorgenti dal server "+this.dataset.vcs+"?";s.eseguicomando(e,Routing.generate("fi_pannello_amministrazione_getVcs"))})),u("#adminpanelphpunittest").click((function(){s.eseguicomando("Vuoi eseguire tutti i test unitari?",Routing.generate("fi_pannello_amministrazione_phpunittest"))})),u("#adminpanelunixcommand").click((function(){var e=u("#unixcommand").val();if(e.trim().length<=0)return a().alert({size:"medium",closeButton:!1,title:'<div class="alert alert-warning" role="alert">Attenzione</div>',message:"Specificare un comando valido"}),!1;var n="Vuoi eseguire il comando unix: "+e;s.eseguicomando(n,Routing.generate("fi_pannello_amministrazione_unixcommand"),{unixcommand:e})})),u("#adminpanelgenerateentity").click((function(){var e=u("#entityfile").val();if(!e)return a().alert({size:"medium",closeButton:!1,title:'<div class="alert alert-warning" role="alert">Attenzione</div>',message:"Specificare un modello mysqlworkbench"}),!1;var n="Vuoi creare i fle di configurazione per le entità partendo dal file: "+e;s.eseguicomando(n,Routing.generate("fi_pannello_amministrazione_generateentity"),{file:e})})),u("#adminpanelgenerateformcrud").click((function(){var e=u("#entityform").val();if(!e)return a().alert({size:"medium",closeButton:!1,title:'<div class="alert alert-warning" role="alert">Attenzione</div>',message:"Specificare una entity"}),!1;var n=u("#generatemplate").prop("checked"),i="Vuoi creare il crud per il form "+e;s.eseguicomando(i,Routing.generate("fi_pannello_amministrazione_generateformcrud"),{entityform:e,generatemplate:n})})),u("#adminpanelaggiornadatabase").click((function(){s.eseguicomando("Vuoi aggiornare il database partendo dalla definizione dalle entità esistenti",Routing.generate("fi_pannello_amministrazione_aggiornaschemadatabase"))})),u("#adminpanelsymfonycommand").click((function(){var e=u("#symfonycommand").val();if(e.trim().length<=0)return a().alert({size:"medium",closeButton:!1,title:'<div class="alert alert-warning" role="alert">Attenzione</div>',message:"Specificare un comando valido"}),!1;var n="Vuoi eseguire il comando "+e;s.eseguicomando(n,Routing.generate("fi_pannello_amministrazione_symfonycommand"),{symfonycommand:e})}))}))},5881:(e,n,i)=>{"use strict";var t=i(9755);i(2772),i(3210),i(7042),i(9826),t(document).unbind("keyup").keyup((function(e){13==e.which&&window.currentfunction&&(e.preventDefault(),t("#adminpanel"+window.currentfunction).click(),window.currentfunction="")})),t(document).ready((function(){t("#symfonycommand").focusin((function(){window.currentfunction="symfonycommand"})),t("#unixcommand").focusin((function(){window.currentfunction="unixcommand"})),t("#entityform").focusin((function(){window.currentfunction=""})),t("#entityfile").focusin((function(){window.currentfunction=""})),t((function(){t('[data-toggle="tooltip"]').tooltip()}))})),t(document).on("click",".autocomplete-list-text",(function(e){e.preventDefault();var n="";n=t(this).text().indexOf("Label")?t(this).text().slice(0,-5).trim():t(this).text().trim(),t(this).closest("div").find(":input").val(n),t(this).closest("ul").removeClass("autocomplete-list-show"),t(this).closest("div").find(":input").focus()}))},6547:(e,n,i)=>{"use strict";i.d(n,{Z:()=>o});i(9070);var t=i(9755);function a(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}const o=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,i,o;return n=e,o=[{key:"showErrori",value:function(e){return t("<div>",{id:"corebundlemodalerror"}).css("height","300px").css("overflow-y","scroll").css("overflow-x","hidden").html(e)}},{key:"showMessaggi",value:function(e){return t("<div>",{id:"corebundlemodalinfo"}).css("height","300px").css("overflow-y","scroll").css("overflow-x","hidden").html(e)}}],(i=null)&&a(n.prototype,i),o&&a(n,o),e}()},2046:(e,n,i)=>{"use strict";i.d(n,{Z:()=>o});i(9070);var t=i(9755);function a(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}const o=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,i,o;return n=e,o=[{key:"show",value:function(){var e=document.createElement("div");e.setAttribute("class","loader loader-default is-active"),e.setAttribute("id","bispinnerloader"),document.body.appendChild(e)}},{key:"hide",value:function(){t("#bispinnerloader").remove()}}],(i=null)&&a(n.prototype,i),o&&a(n,o),e}()}},0,[[3627,666,755,994]]]);