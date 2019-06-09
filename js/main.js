'use strict';

var ads = [noticeOne, noticeTwo, noticeThree, noticeFour, noticeFive, noticeSix, noticeSeven, noticeEight];

var noticeOne = {
  "author": {
    "avatar": 'img/avatars/user01.png'
  },

  "offer": {
    "type": 'flat'
   },

  "location": {
    "x": 10,
    "y": 130
   }
};

var noticeTwo = {
  "author": {
    "avatar": 'img/avatars/user02.png'
  },

  "offer": {
    "type": 'house'
   },

  "location": {
    "x": 30
    "y": 200
   }
};

var noticeThree = {
  "author": {
    "avatar": 'img/avatars/user03.png'
  },

  "offer": {
    "type": 'palace'
   },

  "location": {
    "x": 55
    "y": 400
   }
};

var noticeFour = {
  "author": {
    "avatar": 'img/avatars/user04.png'
  },

  "offer": {
    "type": 'bungalo'
   },

  "location": {
    "x": 45
    "y": 610
   }
};

var noticeFive = {
  "author": {
    "avatar": 'img/avatars/user05.png'
  },

  "offer": {
    "type": 'flat'
   },

  "location": {
    "x": 60
    "y": 450
   }
};

var noticeSix = {
  "author": {
    "avatar": 'img/avatars/user06.png'
  },

  "offer": {
    "type": 'house'
   },

  "location": {
    "x": 15
    "y": 160
   }
};

var noticeSeven = {
  "author": {
    "avatar": 'img/avatars/user07.png'
  },

  "offer": {
    "type": 'palace'
   },

  "location": {
    "x": 24
    "y": 135
   }
};

var noticeEight = {
  "author": {
    "avatar": 'img/avatars/user08.png'
  },

  "offer": {
    "type": 'bungalo'
   },

  "location": {
    "x": 75
    "y": 370
   }
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
