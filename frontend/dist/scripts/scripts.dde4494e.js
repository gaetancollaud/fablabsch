"use strict";angular.module("frontendApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngMaterial","uiGmapgoogle-maps"]).config(["$routeProvider",function(a){a.when("/news",{templateUrl:"views/news.html",controller:"NewsCtrl",controllerAs:"news"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/space/:slug",{templateUrl:"views/space.html",controller:"SpaceCtrl",controllerAs:"space",resolve:{space:["api","$route",function(a,b){return a.getSpacePromiseBySlug(b.current.params.slug)}]}}).when("/map",{templateUrl:"views/map.html",controller:"MapCtrl",controllerAs:"map"}).when("/machine",{templateUrl:"views/machine.html",controller:"MachineCtrl",controllerAs:"machine"}).otherwise({redirectTo:"/news"})}]).config(["uiGmapGoogleMapApiProvider",function(a){a.configure({})}]),angular.module("frontendApp").controller("NewsCtrl",["$http",function(a){var b=this;b.posts=[],b.next="/api/posts?limit=10&offset=0",b.disabled=!0,b.loadMore=function(){console.log(b.next),b.disabled=!0,b.next&&a.get(b.next).then(function(a){b.posts=b.posts.concat(a.data.results),b.next=a.data.next,b.disabled=!1})},b.loadMore(),this.format=function(a){var b=a.split("\n\n");return 1===b.length?a:b.slice(1).join("<br/>")},$(".main").scroll(function(){console.log($(".main").scrollTop()+$(".main").height(),$(".news").height()-400),!b.disabled&&$(".main").scrollTop()+$(".main").height()>$(".news").height()-200&&b.loadMore()})}]),angular.module("frontendApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("frontendApp").controller("SpaceCtrl",["space",function(a){angular.extend(this,a),this.map={center:{latitude:a.latitude,longitude:a.longitude},zoom:9,options:{disableDefaultUI:!0}},this.marker={id:a.id,coords:{latitude:a.latitude,longitude:a.longitude},options:{icon:{url:a.logo,scaledSize:{width:64,height:64}},title:a.name}}}]),angular.module("frontendApp").controller("MapCtrl",["$http","$location","api",function(a,b,c){var d=this;a.get("styles/gmap.style.json").then(function(a){d.map={center:{latitude:46.84257184670688,longitude:7.5476379394531445},zoom:9,options:{styles:a.data,disableDefaultUI:!0}}}),c.ready.then(function(){d.spaces=c.spaces,d.markers=c.spaces.map(function(a){return{id:a.id,coords:{latitude:a.latitude,longitude:a.longitude},options:{icon:{url:a.logo,scaledSize:{width:64,height:64}},title:a.name},events:{click:function(){b.path("/space/"+a.slug)}}}})})}]),angular.module("frontendApp").controller("AppCtrl",["$mdSidenav","$location",function(a,b){this.toggleSidenav=function(){a("left").toggle()},this.isPath=function(a){return b.path().indexOf(a)>-1}}]),angular.module("frontendApp").controller("MachineCtrl",["api",function(a){function b(a){e.hasOwnProperty(a.type)||(e[a.type]=[]);for(var b=0;b<e[a.type].length;b++)if(e[a.type].id===a.id)return a;return a.spaces=[],e[a.type].push(a),a}function c(a,b){for(var c=0;c<a.spaces.length;c++)if(a.spaces[c]===b.id)return;a.spaces.push(b)}var d=this;d.categories=[{name:"3D Printing",type:"3d_printing"},{name:"Laser",type:"laser"},{name:"Vinyl Cutting",type:"vinyl_cutting"},{name:"CNC Miling",type:"cnc_miling"}];var e={};a.ready.then(function(){d.spaces=a.spaces.map(function(a){return a.machines={},a.resources.forEach(function(d){a.machines.hasOwnProperty(d.resource.type)||(a.machines[d.resource.type]=[]);var e=b(d.resource);c(e,a),a.machines[d.resource.type].push(d)}),a}),d.machines=e})}]),angular.module("frontendApp").service("api",["$http","$q",function(a,b){var c=this,d="/",e=b.defer();c.ready=e.promise,a.get(d+"api/spaces").then(function(a){c.spaces=a.data,e.resolve()}),c.getSpacePromiseBySlug=function(a){var d=b.defer();return c.ready.then(function(){for(var b=0;b<c.spaces.length;b++)if(c.spaces[b].slug===a)return void d.resolve(c.spaces[b]);d.reject("NOT_FOUND")}),d.promise}}]),angular.module("frontendApp").filter("nl2br",["$sanitize",function(a){var b=/xhtml/i.test(document.doctype)?"<br />":"<br>";return function(c){return c=(c+"").replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g,b+"$1"),a(c)}}]),angular.module("frontendApp").run(["$templateCache",function(a){a.put("views/about.html",'<section layout-padding class="margin-bottom"> <h2>About</h2> <div class="md-whiteframe-1dp margin-bottom" layout-padding> <p>Fablabs.ch is promoting the MIT concept of Fab Labs in the geographical territory of Switzerland.</p> <p>It provides a central location to see activities of swiss fab labs by aggregating their public social network feeds.</p> <md-button href="https://docs.google.com/forms/d/1tPK7CAc_udVFaZOikjJVoXztbVOJ_-vZfB-Ymq2u8qw/viewform" target="_blank">Contact Swiss Fablabs.ch</md-button> <p>The concept is described in the <a href="http://fab.cba.mit.edu/about/charter/">Fab Charter</a>, copied below:</p> </div> <h2>The Fab Charter</h2> <div class="md-whiteframe-1dp" layout-padding> <dl> <dt>What is a fab lab?</dt> <dd>Fab labs are a global network of local labs, enabling invention by providing access to tools for digital fabrication</dd> <dt>What’s in a fab lab?</dt> <dd>Fab labs share an evolving inventory of core capabilities to make (almost) anything, allowing people and projects to be shared</dd> <dt>What does the fab lab network provide?</dt> <dd>Operational, educational, technical, financial, and logistical assistance beyond what’s available within one lab <dt>Who can use a fab lab?</dt> </dd><dd>Fab labs are available as a community resource, offering open access for individuals as well as scheduled access for programs</dd> <dt>What are your responsibilities?</dt> <dd>safety: not hurting people or machines<br> operations: assisting with cleaning, maintaining, and improving the lab<br> knowledge: contributing to documentation and instruction</dd> <dt>Who owns fab lab inventions?</dt> <dd>Designs and processes developed in fab labs can be protected and sold however an inventor chooses, but should remain available for individuals to use and learn from</dd> <dt>How can businesses use a fab lab?</dt> <dd>Commercial activities can be prototyped and incubated in a fab lab, but they must not conflict with other uses, they should grow beyond rather than within the lab, and they are expected to benefit the inventors, labs, and networks that contribute to their success</dd></dl> </div> </section>'),a.put("views/machine.html",'<div layout-padding> <section> <h2>Capabilities</h2> <div class="md-whiteframe-2dp" layout-padding> <table class="md-table"> <thead> <tr> <th>FabLab</th> <th ng-repeat="cat in machine.categories">{{cat.name}}</th> </tr> </thead> <tbody> <tr ng-repeat="space in machine.spaces"> <td> <a ng-href="#/space/{{space.slug}}"><img alt="logo" ng-src="{{space.logo}}" width="60" height="60"> {{space.name}}</a> </td> <td ng-repeat="cat in machine.categories">{{space.machines[cat.type].length && \'Yes\' || \'No\'}}</td> </tr> </tbody> </table> <small>* Based on machines listed on this page</small> </div> </section> <section ng-repeat="cat in machine.categories"> <h2>{{cat.name}}</h2> <md-card class="machine-card" ng-repeat="r in machine.machines[cat.type]"> <md-card-header> <md-card-header-text> <span class="md-title">{{r.model}}</span> <span class="md-subhead">{{r.vendor.name}}</span> </md-card-header-text> </md-card-header> <img ng-src="{{r.image}}" class="md-card-image" alt="{{r.model}}"> <md-card-title> <md-card-title-text> <span class="md-headline">Available at</span> </md-card-title-text> </md-card-title> <md-card-content> <a ng-repeat="space in r.spaces" ng-href="#/space/{{space.slug}}"><img alt="logo" ng-src="{{space.logo}}" width="60" height="60" title="{{space.name}}"></a> </md-card-content> </md-card> </section> </div>'),a.put("views/map.html",'<ui-gmap-google-map center="map.map.center" zoom="map.map.zoom" options="map.map.options"> <ui-gmap-markers models="map.markers" coords="\'coords\'" options="\'options\'">  </ui-gmap-markers></ui-gmap-google-map> <md-content class="map-legend md-whiteframe-z2" layout-padding> <p ng-repeat="space in map.spaces"><a ng-href="#/space/{{space.slug}}"><img ng-src="{{space.logo}}"> {{space.name}}</a></p> </md-content>'),a.put("views/news.html",'<div layout-padding> <section layout="row" class="news" layout-align="center start" layout-wrap> <!-- photo, video, status, link--> <md-card class="news-card" ng-repeat="p in news.posts track by p.id"> <md-card-header> <md-card-avatar> <img class="md-user-avatar" ng-src="{{p.space.logo}}"> </md-card-avatar> <md-card-header-text> <span class="md-title">{{p.space.name}} {{p.type}}</span> <span class="md-subhead">{{p.created_at|date}}</span> <div class="source"> <a ng-show="p.source_type == \'FACEBOOK\'" href="https://www.facebook.com/{{p.source_id.split(\'_\')[0]}}/posts/{{p.source_id.split(\'_\')[1]}}"><md-icon md-svg-src="images/facebook.df9e860e.svg"></md-icon></a> <a ng-show="p.source_type == \'TWITTER\'" href="https://www.twitter.com/{{p.space.twitter}}/status/{{p.source_id}}"><md-icon md-svg-src="images/twitter.a59e6b76.svg"></md-icon></a> </div> </md-card-header-text> </md-card-header> <a ng-href="{{p.link}}"> <img ng-src="{{p.images[0].src}}" class="md-card-image" alt=""> </a> <md-card-title ng-if="p.message.split(\'\\n\\n\').length > 1"> <md-card-title-text> <span class="md-headline"><a ng-href="{{p.link}}">{{p.message.split(\'\\n\\n\')[0]}}</a></span> </md-card-title-text> </md-card-title> <md-card-content> <p ng-bind-html="news.format(p.message)"></p> <div layout="row" class="thumbs"> <a ng-repeat="i in p.images.slice(1)" href="{{i.link}}" title="{{i.title}}"><img ng-src="{{i.src}}"></a> </div> </md-card-content> </md-card> </section> </div> <md-progress-linear md-mode="indeterminate"></md-progress-linear>'),a.put("views/space.html",'<div class="space-background" style="background-image: url(\'{{space.background}}\')"> <div class="space-background-fill"></div> <section class="space margin-bottom"> <div id="logo" style="position:relative"> <img class="md-whiteframe-3dp" alt="logo" ng-src="{{space.logo}}"> </div> <md-content layout-padding class="md-whiteframe-2dp"> <h1>{{space.name}}</h1> <div layout-gt-sm="row" layout="column"> <div flex-gt-sm="40" layout="column" class="space-info"> <p ng-show="space.website"> <md-icon md-svg-src="images/web.819273d7.svg"></md-icon> <a ng-href="{{space.website}}">{{space.website}}</a> </p> <p ng-show="space.facebook"> <md-icon md-svg-src="images/facebook.df9e860e.svg"></md-icon> <a href="https://facebook.com/{{space.facebook}}">{{space.facebook}}</a> </p> <p ng-show="space.twitter"> <md-icon md-svg-src="images/twitter.a59e6b76.svg"></md-icon> <a href="https://twitter.com/{{space.twitter}}">@{{space.twitter}}</a> </p> <p ng-show="space.email"> <md-icon md-svg-src="images/email.b7d1a1f0.svg"></md-icon> <a href="mailto:{{space.email}}">{{space.email}}</a> </p> <p><b>Founded:</b> {{space.founded|date:\'longDate\' || \'?\'}}</p> <p><b>Members:</b> ~{{space.custom_data.members || \'?\'}}</p> <p> <b>Seen on Fablabs.io:</b> <a href="http://fablabs.io/{{space.custom_data.fablabsio}}">{{space.custom_data.fablabsio && \'yes\' || \'no\'}}</a> </p> <p> <b>Seen on Fablab.is:</b> <a href="http://wiki.fablab.is/wiki/Portal:Labs">{{space.custom_data.fablabis && \'yes\' || \'no\'}}</a> </p> <p><b>Data last confirmed:</b> {{space.last_confirmed|date:\'longDate\' || \'n/a\'}}</p> <md-button href="https://docs.google.com/forms/d/1tPK7CAc_udVFaZOikjJVoXztbVOJ_-vZfB-Ymq2u8qw/viewform" target="_blank">Report/claim</md-button> </div> <div flex></div> <div flex-gt-sm="50"> <p ng-bind-html="space.description|nl2br"></p> <h3>Adresse</h3> <ui-gmap-google-map class="space-map" center="space.map.center" zoom="space.map.zoom" options="space.map.options"> <ui-gmap-marker coords="space.marker.coords" options="space.marker.options" idkey="space.marker.id"> </ui-gmap-marker> </ui-gmap-google-map> <p><small>{{space.street}}<br> {{space.zip}} {{space.city}}</small></p> </div> </div> <h3>Machines</h3> <div layout="row" layout-align="start center" layout-wrap> <md-card class="machine-card" ng-repeat="rs in space.resources"> <md-card-header> <md-card-header-text> <span class="md-title">{{rs.resource.model}}</span> <span class="md-subhead">{{rs.resource.vendor.name}}</span> </md-card-header-text> </md-card-header> <img ng-src="{{rs.resource.picture}}" class="md-card-image" alt="{{rs.resource.model}}"> <md-card-content> <small> <ul class="custom_data"> <li ng-repeat="(k, v) in rs.custom_data"><b>{{k}}:</b> {{v}}</li> </ul> </small> </md-card-content> </md-card> </div> </md-content> </section> </div>')}]);