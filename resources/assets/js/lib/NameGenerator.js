const firstNames = ['Ranger','Annoyed','Sandwich','Real Estate','Bilderberg','Slim','Tree Hugger','Mad','Sarcastic','Cactus','Deadeye','Pale Face','Texas','Horseface','Crazy','Cotton Mouth','Whiskey','Fat','3 Fingers','Ace','Amarillo','Apache','Arapaho','Arkansas','Bearcat','Big','Big Foot','Big Time','Bitter Creek','Black','Black Rock','Blackie','Blackjack','Blameless','Bloody','Blue','Blueridge','Boston','Brawney','Bronco','Brushy','Buck','Buckskin','Buffalo','Bull','Bushwack','Cajun','Captain','Cheerful','Cherokee','Cheyenne','Colonel','Coonskin','Country','Curly','Dakota','Dead Eye','Deadwood','Digger','Dirty','Doc','Dude','Durango','Dusty','El Paso','England','Frontier','Gabby','Gentleman','Goliad','Gravedigger','Gunner','Hole Card','Hondo','Hoodoo','Hoss','Joker','Kid','King','Lawless','Lefty','Lightning','Little','Loco','Loco Weed','Lonesome','Lucky','Major','Waterfall','Muddy','Mule train','Mustang','Natchez','Navajo','Nevada','Nightrider','One-Eyed','Pecos','Preacher','Rattlesnake','Rawhide','Red','Reno','Reverend','Riverboat','Rocky','Seedy','Chin','English','Insane','Shawnee','Shorty','Shotgun','Sweaty','Sideways','Sidewinder','Six Gun','Skull','Slaughter','Slick','Slippery','Smiley','Smokey','Snake-bite','Snake-eyes','Snuffy','Steamboat','Stone River','Stumpy','Sundance','Sundown','Sunset','Sweetwater','Texas','Three Rivers','Tiny','Tombstone','Trapper','Tulsa','Turkey Creek','Two Gun','Ugly','Utah','Waco','Whip','Whiskey','Whitey','Wichitaw','Wild','Trigger Finger']
const lastNames = ['Rick','Steve','Andy','Mike','Jim','Connor','Justin','Josh','Nick','Sanchez','Rob','John']

export default function() {
    return _.sample(firstNames) + ' ' + _.sample(lastNames)
}
