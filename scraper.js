// Node-Scraper for CustomMade.com
// by Mike Deane
//
// Largely based off of David Trejos "Scraping Made Easy with jQuery and SelectorGadget"
// (http://blog.dtrejo.com/scraping-made-easy-with-jquery-and-selectorga)

var util = require('util');
var httpAgent = require('http-agent');
var jsdom = require('jsdom').jsdom;

function makerText(agent) {
  var window = jsdom(agent.body).createWindow();
  var $ = require('jQuery').create(window);
  
  var title = $('#container h1');
  var pageLink = agent.current['uri'];
  
  var makerData = $.map(title, function(el) {
    var makerPic = $('#slideshow a').html().replace('\n      ', '').replace('\n      ', '');
    var cleanTitle = $(el).clone().children('span').remove().end().text().trim().substring(0, 15) + '...';
    var maker = $('#profile p a').text().trim().substring(0, 15).slice(0, -1) + '...';
    var budget = $('p.price strong').text().replace('\n ', '');
    
    return '<li class="ppc_item">' + '\n' + '\t' + '<a href="' + pageLink + '">' + makerPic + '<\/a>' + '\n' + '\t' + '<a href="' + pageLink + '" class="item_name">' + cleanTitle + '<\/a>' + '\n' + '\t' + '<p>' + 'by ' + maker + '<\/p>' + '\n' + '\t' + '<p>' + budget + '<\/p>' + '\n' + '<\/li>';
  });
  util.puts( makerData );
};

var options = [
  { method: 'GET', uri: 'coffee-table/by/ClarkWoodCreations' },
  { method: 'GET', uri: 'farm-table-with-custom-flower-motif/by/ECustomFinishes' },
  { method: 'GET', uri: 'ming-walnut-coffee-table/by/belakwoodworking' },
  { method: 'GET', uri: 'cross-style-trestle-dining-table/by/ECustomFinishes' },
  { method: 'GET', uri: 'live-edge-coffee-table/by/wheelersstudio' },
  { method: 'GET', uri: 'farm-table-dining-table/by/ECustomFinishes' },
  { method: 'GET', uri: 'dining-cabinet/by/wheelersstudio' },
  { method: 'GET', uri: 'modern-kitchen-ross/by/belakwoodworking' },
  { method: 'GET', uri: 'tv-stand/by/benwhitbeck' },
  { method: 'GET', uri: 'maple-office-desk/by/ClarkWoodCreations' },
  { method: 'GET', uri: 'custom-floating-bathroom-vanities/by/ClarkWoodCreations' },
  { method: 'GET', uri: 'tv-cabinet-credenza/by/wheelersstudio' },
  { method: 'GET', uri: 'nehalem-bed/by/thejoinery' },
  { method: 'GET', uri: 'stacie-leather-platform-bed/by/roncorldesign' },
  { method: 'GET', uri: 'oak-dresser/by/ClarkWoodCreations' },
  { method: 'GET', uri: 'meander-bed/by/probstfurnituremakers' },
  { method: 'GET', uri: 'white-oak-dresser/by/benwhitbeck' },
  { method: 'GET', uri: 'platform-storage-bed/by/gothiccabinetcraft' }
];

var agent = httpAgent.create('localhost:8000', options);

agent.addListener('next', function (err, agent) {
  makerText(agent);
  agent.next();
});

agent.addListener('stop', function (err, agent) {
  if (err) console.log(err);
  util.puts( 'Furniture' );
});

// Start the agent
agent.start();