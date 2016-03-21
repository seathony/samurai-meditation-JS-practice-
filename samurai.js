var inquirer = require('inquirer');
var clear = require('clear');

const MEDITATION_LOCATIONS = ['waterfall', 'mountain', 'spring'];

var schedule = [];
var area = [];
var weekCounter = 1;
var xCounts = 0;

var myPeeps = [
  {name: 'Toshiro', meditates: ''},
  {name: 'Takashi', meditates: ''},
  {name: 'Daisuke', meditates: ''},
];

Array.prototype.contains = function(location) {
  var i = this.length;
  while (i--) {
    if (this[i] === location) {
      return true;
    }
  }

  return false;
};

function addLocations() {
  var location = myPeeps.map(function(samurai) {
    schedule.push(samurai.name + ' meditates at the ' + samurai.meditates + ' week ' + weekCounter);
  });

  weekCounter++;
}

var samurai = function(who) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'location',
      message: 'Where would you like to Meditate ' + who.name,
      choices: MEDITATION_LOCATIONS,
      filter: function(val) {
        return val.toLowerCase();
      },
    },
  ], function(answers) {
    if (who.meditates != answers.location && area.contains(answers.location) === false) {
      who.meditates = answers.location;
      area.push(answers.location);
      xCounts++;

      if (xCounts === 3) {
        area = [];
        addLocations();
        clear();
        console.log(schedule);
        xCounts = 0;

        return samurai(myPeeps[xCounts]);
      }

      return samurai(myPeeps[xCounts]);
    }

    if (area.contains(answers.location)) {
      console.log('someone pickted that!!');
      return samurai(myPeeps[xCounts]);
    }

    console.log('You were there last week!! Pick another place');
    samurai(myPeeps[xCounts]);
  });
};

samurai(myPeeps[xCounts]);
