module.exports.songTab = function(req , res){
  res.render('tab1' , {
    title: 'Song Tabs',
    nav:{
      home: 'HOME',
      about: 'ABOUT',
      login: 'Login'
    },
    songInfo: {
      title: 'My heart will go on',
      artist: 'Celine Dion',
      album: "let's talk about love",
      year: '1997',
      genre: 'Pop'
    },
    songTab: '| e|----------------------------|-------5-------------0--------------7------| \n B|-------5---7----7---9-------|-----------9----------------7--------------| \n D|----------------------------|----------------------------7--------------| \n G|----------------------------|----------------9-----------6--------------| \n A|----------------------------|----------------------------0--------------| \n E|-----------------0----------|-------------------------------------------| \n \n e|-------5----4----0-------------|----------------------| \n B|-------------------------------|----------------------| \n G|------------------------4------|------------2---------| \n D|-------------------------------|----------------------| \n A|-------------------------------|------------0---------| \n E|-----------------5-------------|----------------------| \n \n',
    songLyrics: "[Verse 1]\nEvery night in my dreams\nI see you, I feel you\nThat is how I know you go on\nFar across the distance\nAnd spaces between us\nYou have come to show you go on\n\n[Chorus]\nNear, far, wherever you are\nI believe that the heart does go on\nOnce more you open the door\nAnd you're here in my heart\nAnd my heart will go on and on\n\n",
    youtube:''
  }) ;
};

module.exports.extendedSongTab = function(req , res){
  res.render('tab2' , {
    title: 'Song Tabs',
    nav:{
      home: 'HOME',
      about: 'ABOUT',
      login: 'Login'
    },
    songInfo: {
      title: 'My heart will go on',
      artist: 'Celine Dion',
      album: "let's talk about love",
      year: '1997',
      genre: 'Pop',
      youtubeID: ''
    },
    songTab: '| e|----------------------------|-------5-------------0--------------7------| \n B|-------5---7----7---9-------|-----------9----------------7--------------| \n D|----------------------------|----------------------------7--------------| \n G|----------------------------|----------------9-----------6--------------| \n A|----------------------------|----------------------------0--------------| \n E|-----------------0----------|-------------------------------------------| \n \n e|-------5----4----0-------------|----------------------| \n B|-------------------------------|----------------------| \n G|------------------------4------|------------2---------| \n D|-------------------------------|----------------------| \n A|-------------------------------|------------0---------| \n E|-----------------5-------------|----------------------| \n \n',
    songLyrics: "[Verse 1]\nEvery night in my dreams\nI see you, I feel you\nThat is how I know you go on\nFar across the distance\nAnd spaces between us\nYou have come to show you go on\n\n[Chorus]\nNear, far, wherever you are\nI believe that the heart does go on\nOnce more you open the door\nAnd you're here in my heart\nAnd my heart will go on and on\n\n",
    youtube: ''
  }) ;
};

module.exports.editSong = function(req , res){
  res.render('edit' , {
    title: 'Edit Song',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    metadata: {
      title: 'My heart will go on',
      artist: 'Celine Dion',
      album: "Let's talk about love",
      year: '1997',
      genre: 'Pop',
      youtubeID: ''
    },
    structure: {
      songLyrics: "[Verse 1]\nEvery night in my dreams\nI see you, I feel you\nThat is how I know you go on\nFar across the distance\nAnd spaces between us\nYou have come to show you go on\n\n[Chorus]\nNear, far, wherever you are\nI believe that the heart does go on\nOnce more you open the door\nAnd you're here in my heart\nAnd my heart will go on and on\n\n",
      songTab: '| e|----------------------------|-------5-------------0--------------7------| \n B|-------5---7----7---9-------|-----------9----------------7--------------| \n D|----------------------------|----------------------------7--------------| \n G|----------------------------|----------------9-----------6--------------| \n A|----------------------------|----------------------------0--------------| \n E|-----------------0----------|-------------------------------------------| \n \n e|-------5----4----0-------------|----------------------| \n B|-------------------------------|----------------------| \n G|------------------------4------|------------2---------| \n D|-------------------------------|----------------------| \n A|-------------------------------|------------0---------| \n E|-----------------5-------------|----------------------| \n \n'
    }
  }) ;
};
